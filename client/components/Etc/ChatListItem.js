import { selectLatestElement } from '../../utils/helper';

export default function ChatListItem(props) {
  this.state = {
    data: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { chat } = props;

    let templateLiteral = `
        <div class='chat-list-item'>
            <div class='chat-div'>
                <div class='chat-row'>
                    <div class='chat-id'>${chat.userId}</div>
                    <div class='chat-agoTime'>${chat.agoTime}</div>
                </div>
                <div class='chat-row'>
                    <div class='chat-preview'>${chat.preview}</div>
                    <div class='chat-badge'>${chat.badge}</div>
                </div>
            </div>
            <div class='img-box'>
                <img src='${chat.imgUrl}' class='border-small'>
            </div>
        </div>
    `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);
  };

  this.render();
}
