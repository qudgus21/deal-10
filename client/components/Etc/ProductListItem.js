import { slideIn } from '../../utils/slide';
import { selectLatestElement, isLogin } from '../../utils/helper';
import api from '../../utils/api';

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
      Array.from(e.target.classList).includes('product-favorite-img')
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

  this.render = () => {
    const { product, parent } = props;
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
          <div class='product-favorite'>
          ${
            product.isLike === 'N'
              ? `<img class='product-favorite-img' src='../images/dev/favorite_border.svg'>
          `
              : `<img class='product-favorite-img checked' src="../images/dev/favorite.svg"/>`
          } 
            </div>
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

      $favorite.addEventListener('click', this.favoriteButtonClickHandler);
    }
  };

  this.render();
}
