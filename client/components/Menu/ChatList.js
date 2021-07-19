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
    api.sendPost('/chat/listAll').then((result) => {
      console.log(result);
      this.setState({
        chats: result.data,
      });
    });
  };

  this.render = () => {
    const { parent } = props;
    const { chats } = this.state;

    const templateLiteral = `
      <div class='chatlist'>
      </div>
    `;

    parent.innerHTML = templateLiteral;
    chats
      ? chats.forEach((chat) => {
          new ChatListItem({
            parent: parent.querySelector('.chatlist'),
            chat: chat,
          });
        })
      : null;
  };

  this.componentDidMount();
  this.render();
}
