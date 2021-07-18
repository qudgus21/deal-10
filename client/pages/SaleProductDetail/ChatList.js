import ChatListItem from '../../components/Etc/ChatListItem';
import WithoutAction from '../../components/Header/WithoutAction';

export default function ChatList(props) {
  this.state = {
    chatList: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  //   api.sendPost('/chatting/chattings', {}).then((result) => {
  //     console.log(result);
  //     this.setState({
  //       chatList: result.data,
  //     });
  //   });

  this.render = () => {
    const templateLiteral = `
      <div class='chatlist slide'>
        <div class='header-box'></div>
        <div class='chatlist-container'></div>
      </div>
    `;

    props.parent.innerHTML = templateLiteral;

    new WithoutAction({
      parent: document.querySelector('.chatlist .header-box'),
      content: '채팅하기',
      eventHandler: (e) => {
        slideOut('/productdetail', false);
      },
    });

    // this.state.chatList.forEach((chat) => {
    //   new ChatListItem({
    //     parent: document.querySelector('.chatlist-container'),
    //     chat: chat,
    //   });
    // });
  };

  this.render();
}
