import { selectLatestElement } from '../../utils/helper';
import { slideIn } from '../../utils/slide';

export default function ChatListItem(props) {
  this.state = {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.chatClickHandler = (e) => {
    slideIn(`chatting/${props.chat.roomIdx}`);
  };

  this.render = () => {
    const { chat, parent } = props;

    let templateLiteral = `
        <div class='chatlist-item room-${chat.roomIdx}'>
            <div class='chat-div'>
                <div class='chat-row'>
                    <div class='chat-id'>${chat.id}</div>
                    <div class='chat-agoTime'>${
                      chat.conversation[0].registerDate
                    }</div>
                </div>
                <div class='chat-row'>
                    <div class='chat-preview'>${
                      chat.conversation[0].content
                    }</div>
                    ${
                      chat.unreadCnt > 0
                        ? `<div class='chat-badge'>${chat.unreadCnt}</div>`
                        : ``
                    }
                </div>
            </div>
            <div class='img-box'>
                <img src=${chat.imgUrls[0]} class='border-small'>
            </div>
        </div>
    `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    const $chatListItem = parent.querySelector(
      `.chatlist-item.room-${chat.roomIdx}`
    );

    $chatListItem.addEventListener('click', this.chatClickHandler);
  };

  this.render();
}
