import ChatListItem from '../../components/Etc/ChatListItem';
import WithoutAction from '../../components/Header/WithoutAction';
import { slideIn, slideOut } from '../../utils/slide';

export default function ChatList(props) {
  this.state = {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const templateLiteral = `
      <div class='chatlist slide'>
        <div class='header-box'></div>
        <div class='chatlist-container'></div>
      </div>
    `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    new WithoutAction({
      parent: document.querySelector('.chatlist .header-box'),
      content: '채팅하기',
      eventHandler: (e) => {
        slideOut(`/product/${this.state.chatList[0].productId}`);
      },
    });

    this.state.chatList.forEach((chat) => {
      new ChatListItem({
        parent: document.querySelector('.chatlist-container'),
        chat: chat,
        eventHandler: () => {
          slideIn(
            `/product/${chat.productId}/chatlist/${chat.chattingId}`,
            false
          );
        },
      });
    });
  };

  this.render();
}
