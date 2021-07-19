import api from '../../utils/api';
import ChatListItem from '../Etc/ChatListItem';

export default function ChatList(props) {
  this.state = {
    chats: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.componentDidMount = () => {
    this.setState({
      ...this.state,
      chats: [{}, {}, {}, {}, {}],
    });
    // api.sendPost('/chat/list').then((result) => {
    //   // this.setState({
    //   //   ...this.state,
    //   //   products: this.sortMyProduct(result.data),
    //   // });
    // });
  };

  this.render = () => {
    const { parent } = props;
    const { chats } = this.state;

    const templateLiteral = `
      <div class='chatlist'>
      </div>
    `;

    parent.innerHTML = templateLiteral;
    console.log(chats);
    chats
      ? chats.forEach((chat) => {
          new ChatListItem({
            parent: parent.querySelector('.chatlist'),
            chat: chats,
          });
        })
      : null;
  };

  this.componentDidMount();
  this.render();
}
