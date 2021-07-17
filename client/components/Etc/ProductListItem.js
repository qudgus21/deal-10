import { slideIn } from '../../utils/slide';
import { selectLatestElement } from '../../utils/helper';

export default function ProductListItem(props) {
  this.state = {
    data: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.productClickHandler = (e) => {
    const $favorite = document.querySelector('.product-favorite img');
    if (e.target === $favorite) return;
    const productIdx = e.currentTarget.classList[1].split('-').pop();

    //window.location.pathname 후 slidein의 세번째 인자로 사용하는 방법

    slideIn(`product/${productIdx}`, false);
  };

  this.render = () => {
    const { product } = props;
    let templateLiteral = `
    <div class='product-list-item p-${product.idx}'>
      <div class='img-box'>
        <img class='border-medium' src='../images/dev/${product.imgUrls[0]}.svg'>
      </div>
      <div class='product-info'>
      <div class='product-top'>
        <div class='product-title-bar'>
          <div class='product-title'>${product.title}</div>
          <div class='product-location'>${product.location[0]}·${product.agoTime}</div>
          <div class='product-price'>${product.price}원</div>
        </div>
        <div class='product-favorite'>
          <img src='../images/dev/favorite_border.svg'>
        </div>
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
    const $product = selectLatestElement(props.parent, '.product-list-item');
    $product.addEventListener('click', this.productClickHandler);
  };

  this.render();
}
