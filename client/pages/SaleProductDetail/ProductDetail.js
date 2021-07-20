import { slideIn, slideOut } from '../../utils/slide';
import Dropdown from '../../components/Etc/Dropdown';
import { saleConstant } from '../../utils/constant';
import Button from '../../components/Button/Button';
import { isLogin, numberWithCommas } from '../../utils/helper';
import Snackbar from '../../components/Etc/SnackBar';
import api from '../../utils/api';
import Carousel from '../../components/Etc/Carousel';

export default function ProductDetail(props) {
  this.state = {
    product: null,
    saleStatus: '',
  };

  this.setState = (nextState) => {
    // setTimeout(() => {
    //   document.querySelector('.app').lastElementChild.remove();
    // }, 100);
    this.state = nextState;
    this.render();
    // setTimeout(() => {
    //   document.querySelector('.app').lastElementChild.classList.add('slide-in');
    // }, 50);
  };

  this.componentDidMount = () => {
    setTimeout(() => {
      const productIdx = window.location.pathname.split('/').pop();

      api.sendPost('/product/detail', { productIdx }).then((result) => {
        this.setState({
          product: result.data,
          saleStatus: result.data.status,
        });
      });

      api.sendPost('/product/view', { productIdx }).then((result) => {});
    }, 0);
  };

  this.modify = () => {
    this.removeDrops();
    const productIdx = window.location.pathname.split('/').pop();
    slideIn(`newpost/${productIdx}`, false);
  };

  this.delete = () => {
    const productIdx = window.location.pathname.split('/').pop();
    api.sendPost('/product/delete', { productIdx }).then((result) => {
      new Snackbar({ msg: '삭제되었습니다.', duration: 1000 });
      slideIn('/', false);
    });
  };

  this.makeHeaderDropdownData = () => {
    return [
      { text: '수정하기', eventHandler: this.modify },
      { text: '삭제하기', eventHandler: this.delete },
    ];
  };

  this.changeSaleState = (st) => {
    const productIdx = window.location.pathname.split('/').pop();

    api
      .sendPost('/product/changeState', {
        productIdx,
        status: st,
      })
      .then((result) => {
        this.setState({
          ...this.state,
          saleStatus: st,
        });
      });
  };

  this.makeStatusDropdownData = () => {
    let data = [];
    for (let key in saleConstant) {
      if (key !== this.state.saleStatus) {
        data.push({
          text: saleConstant[key],
          eventHandler: () => {
            this.changeSaleState(key);
          },
        });
      }
    }
    return data;
  };

  this.removeDrops = () => {
    const $drops = document.querySelectorAll('.productdetail .dropdown');
    if ($drops.length) {
      $drops.forEach((drop) => {
        drop.remove();
      });
    }
  };

  this.handleFocusout = (e) => {
    const targetClass = Array.from(e.target.classList);

    if (
      !targetClass.includes('drop-btn') &&
      !targetClass.includes('more-button') &&
      !targetClass.includes('current-message') &&
      !targetClass.includes('current-image') &&
      !targetClass.includes('current-status')
    ) {
      this.removeDrops();
    }
  };

  this.statusHandler = (e) => {
    const $dropdown = document.querySelector('.productdetail .status-dropdown');
    if ($dropdown) {
      $dropdown.remove();
    } else {
      this.removeDrops();
      new Dropdown({
        parent: document.querySelector('.productdetail .current-status'),
        data: this.makeStatusDropdownData(),
        cls: 'status-dropdown',
      });
    }
  };

  this.headerHandler = (e) => {
    const $dropdown = document.querySelector('.productdetail .header-dropdown');
    if ($dropdown) {
      $dropdown.remove();
    } else {
      this.removeDrops();
      new Dropdown({
        parent: document.querySelector('.productdetail .dropdown-button'),
        data: this.makeHeaderDropdownData(),
        cls: 'header-dropdown',
      });
    }
  };

  this.favoriteButtonClickHandler = (e) => {
    const img = e.currentTarget;
    const productIdx = window.location.pathname.split('/').pop();
    api.sendPost('/product/toggleLike', { productIdx }).then((result) => {
      if (Array.from(img.classList).includes('checked')) {
        img.classList.remove('checked');
        img.src = '../../images/dev/favorite_border.svg';
      } else {
        img.classList.add('checked');
        img.src = '../../images/dev/favorite.svg';
      }
    });
  };

  this.render = () => {
    const { product, saleStatus } = this.state;
    let templateLiteral = `
            <div class="productdetail slide">
                <div class="header-box">
                    <div>
                    <img class='back-button' src='../../images/dev/arrow_back_green.svg'/>
                    </div>
                    ${
                      product.isSaler === 'Y'
                        ? `
                        <div class="dropdown-button">
                          <img class='more-button' src='../../images/dev/more_vert_green.svg'/>
                        </div>`
                        : ``
                    }
                </div>
                <div class="product-img">
                </div>
                <div class="content">
                    ${
                      product.isSaler === 'Y'
                        ? `
                     <div class="status-box">   
                      <button class="current-status">
                          <div class="current-message">${saleConstant[saleStatus]}</div>
                          <img class="current-image" src='../../images/dev/expand_more.svg'/>
                      </button>
                    </div>
                    <div class="status-select">
                    </div>
                    `
                        : ``
                    }
                    <div class="title">
                      ${product.title}
                    </div>
                    <div class="category">
                      ${product.category} · ${product.updateDate}
                    </div>
                    <div class="description">
                      ${product.description}
                    </div>
                    <div class="info">
                    채팅 ${Number(product.chatCnt)} · 관심 ${
      product.likeCnt
    } · 조회 ${product.viewCnt}
                    </div>
                    <div class="saler">
                      <div >판매자 정보</div>
                      <div>
                          <span>${
                            product.userId
                          }</span><span class="location">${
      product.location[0]
    }</span>
                      </div>
                    </div>
                    <div class="footer">
                      <div>
                        ${
                          isLogin()
                            ? `${
                                product.isLike === 'Y'
                                  ? `<img class="favorite-img checked" src='../../images/dev/favorite.svg'>`
                                  : `<img class="favorite-img" src='../../images/dev/favorite_border_mini.svg'>`
                              }`
                            : ``
                        }
                        <span>${numberWithCommas(product.price)}원</span>
                      </div>
                      <div class="btn-box">

                      </div>
                    </div>
                </div>
            </div>
        `;

    if (
      document
        .querySelector('.app')
        .lastElementChild.classList.contains('productdetail')
    ) {
      document.querySelector('.app').lastElementChild.remove();
      props.parent.insertAdjacentHTML('beforeend', templateLiteral);
      document.querySelector('.app').lastElementChild.classList.add('slide-in');
    } else {
      props.parent.insertAdjacentHTML('beforeend', templateLiteral);
    }

    document
      .querySelector('.productdetail .back-button')
      .addEventListener('click', () => {
        window.location.href = '/';
        // slideOut('/', false);
      });

    const $moreButton = document.querySelector('.productdetail .more-button');
    if ($moreButton !== null) {
      document
        .querySelector('.productdetail .more-button')
        .addEventListener('click', this.headerHandler);
    }

    const $currentButton = document.querySelector(
      '.productdetail .current-status'
    );
    ``;
    if ($currentButton !== null) {
      document
        .querySelector('.productdetail .current-status')
        .addEventListener('click', this.statusHandler);
    }

    new Button({
      cls: `medium-button`,
      parent: document.querySelector('.productdetail .footer .btn-box'),
      content: `${
        product.isSaler === 'Y'
          ? `채팅 목록 보기${
              product.chattCnt > 0 ? `(${product.chattCnt})` : ``
            }`
          : `문의하기`
      }`,
      eventHandler: (e) => {},
    });

    document
      .querySelector('.productdetail')
      .addEventListener('click', this.handleFocusout);

    const $favorite = document.querySelector('.productdetail .favorite-img');
    if ($favorite) {
      $favorite.addEventListener('click', this.favoriteButtonClickHandler);
    }

    const $img = document.querySelector('.product-img');
    new Carousel({ parent: $img, imgUrls: product.imgUrls });
  };

  this.componentDidMount();
}
