import { slideIn } from '../../utils/slide';
import { selectLatestElement, isLogin } from '../../utils/helper';
import api from '../../utils/api';
import Dropdown from '../Etc/Dropdown';

export default function ProductListItem(props) {
  this.state = {
    data: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.productClickHandler = (e) => {
    if (
      Array.from(e.target.classList).includes('product-favorite') ||
      Array.from(e.target.classList).includes('product-favorite-img') ||
      Array.from(e.target.classList).includes('menu-controll') ||
      Array.from(e.target.classList).includes('dropdown') ||
      Array.from(e.target.classList).includes('drop-btn')
    ) {
      return;
    }

    const productIdx = e.currentTarget.classList[1].split('-').pop();

    slideIn(`product/${productIdx}`, false);
  };

  this.favoriteButtonClickHandler = (e) => {
    let img = e.currentTarget;

    api
      .sendPost('/product/toggleLike', { productIdx: props.product.idx })
      .then((result) => {
        if (Array.from(img.classList).includes('checked')) {
          img.classList.remove('checked');
          img.src = '../images/dev/favorite_border.svg';
        } else {
          img.classList.add('checked');
          img.src = '../images/dev/favorite.svg';
        }
      });
  };

  this.removeDrops = () => {
    const $drops = document.querySelectorAll('.menu .dropdown');
    if ($drops.length) {
      $drops.forEach((drop) => {
        drop.remove();
      });
    }
  };

  this.menuProductHandler = (e) => {
    this.removeDrops();
    const productIdx = e.target.classList[1].split('-').pop();
    new Dropdown({
      parent: e.target.parentNode,
      data: this.makeHeaderDropdownData(),
      cls: `status-dropdown status-${productIdx}`,
    });
  };

  this.modify = (e) => {
    const productIdx = Array.from(e.target.parentNode.classList)
      .pop()
      .split('-')
      .pop();
    this.removeDrops();
    slideIn(`newpost/${productIdx}`, false);
  };

  this.delete = (e) => {
    const productIdx = Array.from(e.target.parentNode.classList)
      .pop()
      .split('-')
      .pop();
    api.sendPost('/product/delete', { productIdx }).then((result) => {
      alert('삭제되었습니다');
      slideIn('/', false);
    });
  };

  this.makeHeaderDropdownData = () => {
    return [
      { text: '수정하기', eventHandler: this.modify },
      { text: '삭제하기', eventHandler: this.delete },
    ];
  };

  this.render = () => {
    const { product, parent, isMenu, saleListHandler } = props;
    let templateLiteral = `
    <div class='product-list-item p-${product.idx}'>
      <div class='img-box'>
        <img class='border-medium' src='${product.imgUrls[0]}'>
      </div>
      <div class='product-info'>
      <div class='product-top'>
        <div class='product-title-bar'>
          <div class='product-title'>${product.title}</div>
          <div class='product-location'>${product.location[0]}·${
      product.agoTime
    }</div>
              <div class='product-price'>${product.price}원</div>
            </div>
            ${
              isLogin()
                ? `
              ${
                isMenu
                  ? `
                  <div>
                <img class='menu-controll controll-${product.idx}' src='../../images/dev/more_vert.svg'/>
                </div>
              `
                  : `
              <div class='product-favorite'>
              ${
                product.isLike === 'N'
                  ? `<img class='product-favorite-img' src='../images/dev/favorite_border.svg'>`
                  : `<img class='product-favorite-img checked' src="../images/dev/favorite.svg"/>`
              }
                </div>
              `
              }
      `
                : ``
            }

        </div>
        <div class='product-status-bar'>
          <div class='product-chats flex'>
            <img src='../images/dev/chat_bubble_mini.svg'>
            <span>${product.chatCnt}</span>
          </div>
          <div class='product-likes flex'>
          <img src='../images/dev/favorite_border_mini.svg'>
            <span>${product.likeCnt}</span>
          </div>
        </div>
      </div>
    </div>
    `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    // const $product = selectLatestElement(props.parent, '.product-list-item');

    const $product = parent.querySelector(
      `.product-list-item.p-${product.idx}`
    );

    $product.addEventListener('click', this.productClickHandler);

    if (isLogin()) {
      const $favorite = parent.querySelector(
        `.product-list-item.p-${product.idx} .product-favorite img`
      );

      const $menu = parent.querySelector(
        `.product-list-item.p-${product.idx} .menu-controll`
      );
      if ($menu) {
        $menu.addEventListener('click', this.menuProductHandler);
      }

      if ($favorite) {
        $favorite.addEventListener('click', this.favoriteButtonClickHandler);
      }
    }
  };
  this.render();
}
