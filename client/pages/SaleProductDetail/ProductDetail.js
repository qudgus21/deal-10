import { slideIn, slideOut } from '../../utils/slide';
import Dropdown from '../../components/Etc/Dropdown';
import { saleConstant } from '../../utils/constant';
import Button from '../../components/Button/Button';
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

  setTimeout(() => {
    const product = window.location.pathname.split('/').pop();
    this.setState({
      product: {
        isSaler: 5,
        isLike: 'N',
        salerId: 'qudgus21',
        location: '역삼동',
        chattCnt: 10,
        likeCnt: '5',
        viewCnt: '12',
        title: '테스트 제목',
        description:
          '설명 설명 설명설명 설명 설명설명 설명 설명설명 설명 설명설명 설명 설명설명 설명 설명설명 설명 설명설명 설명 설명설명 설명 설명설명 설명 설명설명 설명 설명설명 설명 설명설명 설명 설명설명 설명 설명설명 설명 설명설명 설명 설명설명 설명 설명설명 설명 설명설명 설명 설명설명 설명 설명설명 설명 설명설명 설명 설명설명 설명 설명',
        price: '10,000원',
        category: '기타 중고물품',
        imgUrls: [
          'https://photo.coolenjoy.net/bbs/data/26/SN020.JPG',
          'https://photo.coolenjoy.net/bbs/data/26/SN020.JPG',
          'https://photo.coolenjoy.net/bbs/data/26/SN020.JPG',
          'https://photo.coolenjoy.net/bbs/data/26/SN020.JPG',
          'https://photo.coolenjoy.net/bbs/data/26/SN020.JPG',
        ],
        status: 'S',
        updateDate: '2시간 전',
      },
      saleStatus: 'S',
    });
    // api
    //   .sendPost('/product/categoryProducts', { categoryIdx: category })
    //   .then((result) => {
    //     this.setState({
    //       ...this.state,
    //       products: result.data.products,
    //       category: result.data.category,
    //     });
    //   });
  }, 0);

  this.modify = () => {
    slideIn('newpost', false);
  };

  this.delete = () => {
    //api 보내고
    //이부분도 뒤로가기 생각해 보아야 함
    slideIn('/', false);
  };

  this.makeHeaderDropdownData = () => {
    return [
      { text: '수정하기', eventHandler: this.modify },
      { text: '삭제하기', eventHandler: this.delete },
    ];
  };

  this.changeSaleState = (st) => {
    this.setState({
      ...this.state,
      saleStatus: st,
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

  this.render = () => {
    const { product, saleStatus } = this.state;

    let templateLiteral = `
            <div class="productdetail slide">
                <div class="header-box">
                    <div>
                    <img class='back-button' src='../../images/dev/arrow_back.svg'/>
                    </div>
                    ${
                      product.isSaler > 0
                        ? `
                        <div class="dropdown-button">
                          <img class='more-button' src='../../images/dev/more_vert.svg'/>
                        </div>`
                        : ``
                    }
                </div>
                <div class="product-img">
                </div>
                <div class="content">
                    ${
                      product.isSaler > 0
                        ? `
                     <div class="status-box">   
                      <button class="current-status">
                          <div>${saleConstant[saleStatus]}</div>
                          <img src='../../images/dev/expand_more.svg'/>
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
                    <div>
                      ${product.description}
                    </div>
                    <div class="info">
                    채팅 ${Number(product.chattCnt)} · 관심 ${
      product.likeCnt
    } · 조회 ${product.viewCnt}
                    </div>
                    <div class="saler">
                      <div >판매자 정보</div>
                      <div>
                          <span>${
                            product.salerId
                          }</span><span class="location">${
      product.location
    }</span>
                      </div>
                    </div>
                    <div class="footer">
                      <div>
                        <img src='../images/dev/favorite_border_mini.svg'>
                        <span>${product.price}</span>
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
        slideOut('/', false);
      });

    const $moreButton = document.querySelector('.productdetail .more-button');
    if ($moreButton !== null) {
      document
        .querySelector('.productdetail .more-button')
        .addEventListener('click', () => {
          new Dropdown({
            parent: document.querySelector('.productdetail .dropdown-button'),
            data: this.makeHeaderDropdownData(),
          });
        });
    }

    const $currentButton = document.querySelector(
      '.productdetail .current-status'
    );
    ``;
    if ($currentButton !== null) {
      document
        .querySelector('.productdetail .current-status')
        .addEventListener('click', () => {
          new Dropdown({
            parent: document.querySelector('.productdetail .current-status'),
            data: this.makeStatusDropdownData(),
          });
        });
    }

    new Carousel({
      parent: document.querySelector('.product-img'),
      imgUrls: product.imgUrls,
    });

    new Button({
      cls: `medium-button`,
      parent: document.querySelector('.productdetail .footer .btn-box'),
      content: `${
        product.isSaler > 0
          ? `채팅 목록 보기${
              product.chattCnt > 0 ? `(${product.chattCnt})` : ``
            }`
          : `문의하기`
      }`,
      eventHandler: (e) => {},
    });
  };
}
