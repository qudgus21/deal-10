import { selectLatestElement } from '../../utils/helper';
import imgBox from './ImgBox';

export default function productListItem(props) {
  this.state = {
    data: props.data,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  // 부모에 div.product-list 만들기
  this.render = () => {
    let templateLiteral = `
    <div class='product-list-item'>
      <div class='img-box'>
        <img class='border-medium' src='{imgUrl}'>
      </div>
      <div class='product-info'>
      <div class='product-top'>
        <div class='product-title-bar'>
          <div class='product-title'>{title}</div>
          <div class='product-location'>{location}·{updateDate}</div>
          <div class='product-price'>원</div>
        </div>
        <div class='product-favorite'>
          <img src='./images/dev/favorite_border.svg'>
        </div>
        </div>
        <div class='product-status-bar'>
          <div class='product-chats flex'>
            <img src='./images/dev/chat_bubble_mini.svg'>
            <span>{chats}</span>
          </div>
          <div class='product-likes flex'>
          <img src='./images/dev/favorite_border_mini.svg'>
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </div>
    `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    const $productListItem = selectLatestElement(
      props.parent,
      '.product-list-item'
    );
    //TODO: add eventlistener for favorite
  };

  this.render();
}
