import WithoutAction from '../components/Header/WithoutAction';
import { slideOut } from '../utils/slide';
import ChatListItem from '../components/Etc/ChatListItem';
import api from '../utils/api';
import { selectLatestElement } from '../utils/helper';

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
        this.setState({
          chats: result.data,
        });
      });
    });
  };

  const refreshChat = setInterval(() => {
    if (
      document
        .querySelector('.app')
        .lastElementChild.classList.contains('productchatlist')
    ) {
      const $preChatlist = document.querySelector('.productchatlist');
      $preChatlist.classList.add('chatlist-prev');
      const pos = $preChatlist.scrollTop;
      this.componentDidMount();
      setTimeout(() => {
        const $chatlist = selectLatestElement(props.parent, '.productchatlist');
        $chatlist.classList.add('none-in');
        $chatlist.scrollTo(0, pos);
        setTimeout(() => {
          $preChatlist.remove();
        }, 100);
      }, 50);
    }
  }, 3000);

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
      parent: selectLatestElement(parent, '.header-box'),
      content: '채팅하기',
      eventHandler: (e) => {
        clearInterval(refreshChat);
        const productIdx = window.location.pathname.split('/')[2];

        slideOut(`/product/${productIdx}`, false);
      },
    });

    chats
      ? chats.forEach((chat) => {
          new ChatListItem({
            parent: selectLatestElement(parent, '.container'),
            chat: chat,
          });
        })
      : null;
  };

  this.componentDidMount();
  // this.render();
}
