import WithoutAction from '../components/Header/WithoutAction';
import { slideOut } from '../utils/slide';
import ChatListItem from '../components/Etc/ChatListItem';
import api from '../utils/api';

export default function ProductChatList(props) {
  this.state = {
    chats: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.componentDidMount = () => {
    setTimeout(() => {
      const productIdx = window.location.pathname.split('/')[2];

      api.sendPost('/chat/listSaleProduct', { productIdx }).then((result) => {
        console.log(result);
        this.setState({
          chats: result.data,
        });
      });
    });
  };

  this.render = () => {
    const { parent } = props;
    const { chats } = this.state;

    let templateLiteral = `
            <div class='productchatlist slide'>
                <div class='header-box'></div>
                <div class='container'></div>
            </div>
        `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    new WithoutAction({
      parent: document.querySelector('.productchatlist .header-box'),
      content: '채팅하기',
      eventHandler: (e) => {
        slideOut('/', false);
      },
    });

    chats
      ? chats.forEach((chat) => {
          new ChatListItem({
            parent: parent.querySelector('.productchatlist .container'),
            chat: chat,
          });
        })
      : null;
  };

  this.componentDidMount();
  // this.render();
}
