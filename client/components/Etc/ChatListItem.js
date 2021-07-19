import { selectLatestElement } from '../../utils/helper';

export default function ChatListItem(props) {
  this.state = {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const {
      productId,
      chattingId,
      status,
      opponent,
      currentMessage,
      unreadCnt,
      imgUrls,
      updatetime,
    } = props.chat;

    let templateLiteral = `
        <div class='chatlist-item'>
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
      document.querySelector('.chatlist-container'),
      '.chatlist-item'
    );
    $chatListItem.addEventListener('click', props.eventHandler);
  };

  this.render();
}
