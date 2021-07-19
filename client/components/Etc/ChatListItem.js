import { selectLatestElement } from '../../utils/helper';
import { slideIn } from '../../utils/slide';

export default function ChatListItem(props) {
  this.state = {
    data: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const {
      productId,
      status,
      opponent,
      currentMessage,
      unreadCnt,
      imgUrls,
      updatetime,
    } = this.state.data;

    let templateLiteral = `
        <div class='chat-list-item'>
            <div class='chat-div'>
                <div class='chat-row'>
                    <div class='chat-id'>${opponent.userName}</div>
                    <div class='chat-agoTime'>${updatetime}</div>
                </div>
                <div class='chat-row'>
                    <div class='chat-preview'>${currentMessage}</div>
                    <div class='chat-badge'>${unreadCnt}</div>
                </div>
            </div>
            <div class='img-box'>
                <img src='${imgUrls[0]}' class='border-small'>
            </div>
        </div>
    `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    const $chatListItem = selectLatestElement(
      document.querySelector('.chat-list-item'),
      '.chat-div'
    );
    $chatListItem.addEventListener('click', () => {
      // product/${productId}/chatting/${chatting-contentsId}
      // product id랑 chattingcontentsid도 받아야할듯
      slideIn(`/product/${productId}/chatting/${chattingContentsId}`, false);
    });
  };

  this.render();
}
