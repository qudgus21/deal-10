import api from '../utils/api';
import WithAction from '../components/Header/withAction';
import { slideOut } from '../utils/slide';
import { numberWithCommas } from '../utils/helper';
export default function ChatDetail(props) {
  this.state = {
    chat: null,
  };
  this.setState = (nextState) => {
    document.querySelector('.app').lastElementChild.remove();
    this.state = nextState;
    this.render();
    setTimeout(() => {
      document.querySelector('.app').lastElementChild.classList.add('slide-in');
    }, 50);
  };
  this.componentDidMount = () => {
    setTimeout(() => {
      const roomIdx = window.location.pathname.split('/').pop();
      api.sendPost('/chat/chatData', { roomIdx }).then((result) => {
        let chat = result.data;
        this.setState({
          chat,
          saleState: {
            C: '종료',
            R: '예약중',
            S: '판매중',
          },
        });
      });
    }, 0);
  };
  this.addChat = (chat) => {
    const $msgContainer = document.querySelector('.chatdetail .msg-container');
    let mesage = ``;
    console.log(chat);
    chat.conversation.forEach((c) => {
      if (c.type === chat.myType) {
        mesage = `<div class='msg-right'><div class='msg-send'>${c.content}</div></div>`; //내타입이랑 같은놈
      } else {
        mesage = `<div class='msg-left'><div class='msg-receive'>${c.content}</div></div>`; //내타입이랑 다른놈
      }
      $msgContainer.insertAdjacentHTML('beforeend', mesage);
    });
    $msgContainer.insertAdjacentHTML(
      'beforeend',
      `<div class='msg-padding'></div>`
    );
    $msgContainer.scrollTo(0, $msgContainer.scrollHeight);
  };
  this.render = () => {
    const { chat, saleState } = this.state;
    let templateLiteral = `
            <div class='chatdetail slide'>
                <div class='header-box'></div>
                <div class='chatdetail-product'>
                    <div class='img-box'>
                        <img class='border-small' src='${
                          chat ? `${chat.productImgUrls[0]}` : ``
                        }'>
                    </div>
                    <div class='chatdetail-row'>
                        <div class='chatdetail-title'>
                          ${chat ? `${chat.productTitle}` : ``}
                        </div>
                        <div class='chatdetail-price'>
                        ${
                          chat ? `${numberWithCommas(chat.productPrice)}원` : ``
                        }
                        </div>
                    </div>
                    <div class='chatdetail-status flex'>${
                      chat ? `${saleState[chat.productStatus]}` : ``
                    }</div>
                </div>
                <div class='msg-container'></div>
                <div class='msg-input-div'>
                    <input type='text' name='msg' placeholder='메시지를 입력하세요.'>
                    <button class='send-msg-button'>
                        <img src='../images/dev/send.svg'>
                    </button>
                </div>
            </div>
        `;
    props.parent.insertAdjacentHTML('beforeend', templateLiteral);
    new WithAction({
      parent: document.querySelector('.chatdetail .header-box'),
      content: `${chat ? chat.opponentId : `UserE`}`,
      eventHandler: (e) => {
        slideOut('/', false);
      },
    });
    chat ? this.addChat(chat) : null;
    // let msgReceiveTl = `<div class='msg-left'><div class='msg-receive'>안녕하세요 궁금한게 있는데요</div></div>`; //내 타입이랑반대인놈
    // let msgSendTl = `<div class='msg-right'><div class='msg-send'>네 안녕하세요!</div></div>`; //내타입이랑 같은놈
    // const $msgContainer = document.querySelector('.chatdetail .msg-container');
    // for (let i = 0; i < 50; i++) {
    //   $msgContainer.insertAdjacentHTML('afterbegin', msgSendTl);
    //   $msgContainer.insertAdjacentHTML('afterbegin', msgReceiveTl);
    // }
  };
  this.componentDidMount();
  this.render();
}
