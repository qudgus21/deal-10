import { selectLatestElement, setCookie } from '../../utils/helper';
import { slideIn, slideOut, historyBack } from '../../utils/slide';
import WithoutAction from '../../components/Header/WithoutAction';
import Button from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';
import withAction from '../../components/Header/withAction';
import Dropdown from '../../components/Etc/Dropdown';

import api from '../../utils/api';

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
        chattCnt: '10',
        likeCnt: '5',
        viewCnt: '12',
        title: '테스트 제목',
        description: '가짜 설명',
        price: '기갹',
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

  this.render = () => {
    const { product, status } = this.state;
    const saleConstant = { S: '판매중', R: '예약중', C: '종료' };

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
                  <img src='https://photo.coolenjoy.net/bbs/data/26/SN020.JPG'/>
                </div>
                <div class="content">
                    ${
                      product.isSaler > 0
                        ? `
                     <div class="status-box">   
                      <button class="current-status">
                          <div>${saleConstant[product.status]}</div>
                          <img src='../../images/dev/expand_more.svg'/>
                      </button>
                    </div>
                    <div class="status-select">
                    </div>
                    `
                        : ``
                    }
                </div>
            </div>

        `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    document
      .querySelector('.productdetail .back-button')
      .addEventListener('click', () => {
        slideOut('/', false);
      });

    document
      .querySelector('.productdetail .more-button')
      .addEventListener('click', () => {
        new Dropdown({
          parent: document.querySelector('.productdetail .dropdown-button'),
          data: this.makeHeaderDropdownData(),
        });
      });
  };
}
