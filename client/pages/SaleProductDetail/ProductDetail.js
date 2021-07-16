import { selectLatestElement, setCookie } from '../../utils/helper';
import { slideIn, slideOut } from '../../utils/slide';
import WithoutAction from '../../components/Header/WithoutAction';
import Button from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';

import withAction from '../../components/Header/withAction';

import api from '../../utils/api';

export default function ProductDetail(props) {
  this.state = {
    product: null,
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

  this.render = () => {
    const { product } = this.state;
    console.log(product);

    let templateLiteral = `

            <div class="productdetail slide">
                <div class="header-box">
                    <img class='back-button' src='../../images/dev/arrow_back.svg'/>
                    ${
                      product.isSaler > 0
                        ? `<img class='more-button' src='../../images/dev/more_vert.svg'/> `
                        : ``
                    }
                </div>
                <div class="product-img">
                  <img src='https://photo.coolenjoy.net/bbs/data/26/SN020.JPG'/>
                </div>
                <div class="content">
                    상품디테일
                </div>
            </div>
        `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    document
      .querySelector('.productdetail .back-button')
      .addEventListener('click', () => {
        window.history.back();
      });
  };
}
