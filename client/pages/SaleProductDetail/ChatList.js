import ChatListItem from '../../components/Etc/ChatListItem';
import WithoutAction from '../../components/Header/WithoutAction';
import { slideIn, slideOut } from '../../utils/slide';

export default function ChatList(props) {
  this.state = {
    chatList: [
      {
        productId: '1',
        chattingId: '2',
        status: '3',
        opponent: { userIdx: '4', userName: '4.5' },
        currentMessage: '5',
        unreadCnt: '666',
        imgUrls: '7',
        updatetime: '8',
      },
      {
        productId: '11',
        chattingId: '22',
        status: '3',
        opponent: { userIdx: '44', userName: '4.55' },
        currentMessage: '55',
        unreadCnt: '66',
        imgUrls: '7',
        updatetime: '88',
      },
      {
        productId: '111',
        chattingId: '222',
        status: '3',
        opponent: { userIdx: '444', userName: '4.555' },
        currentMessage: '555',
        unreadCnt: '6666',
        imgUrls: '7',
        updatetime: '8888',
      },
    ],
  };

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
