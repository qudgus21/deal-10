import { selectLatestElement } from '../../utils/helper';

export default function ProductListItem(props) {
  this.state = {
    data: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { product } = props;

    let templateLiteral = `
    <div class='product-list-item'>
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
  };

  this.render();
}
