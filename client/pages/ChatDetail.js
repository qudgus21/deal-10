import api from '../utils/api';
import WithAction from '../components/Header/withAction';
import { slideOut } from '../utils/slide';
import { numberWithCommas } from '../utils/helper';
import conversatsion from '../utils/conversation';
import Snackbar from '../components/Etc/SnackBar';

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
        this.setState({
          chat: result.data,
          saleState: {
            C: '종료',
            R: '예약중',
            S: '판매중',
          },
        });
        conversatsion(result.data);
      });

      api.sendPost('/chat/read', { roomIdx });
    }, 0);
  };

  this.addChat = (chat) => {
    const $msgContainer = document.querySelector('.chatdetail .msg-container');
    let mesage = ``;

    chat.conversation.map((c, index) => {
      if (c.content !== null) {
        if (c.type === chat.myType) {
          mesage = `<div class='msg-right msg-${index}'><div class='msg-send msg-${index}-content'>${c.content}</div></div>`;
        } else {
          mesage = `<div class='msg-left msg-${index}'><div class='msg-receive msg-${index}-content'>${c.content}</div></div>`;
        }
        $msgContainer.insertAdjacentHTML('beforeend', mesage);
      }
    });

    // chat.conversation.forEach((c) => {

    // });

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
                    <input class="chat-input" type='text' name='msg' placeholder='메시지를 입력하세요.'>
                    <button class='send-msg-button'>
                        <img src='../../../images/dev/send.svg'>
                    </button>
                </div>
            </div>
        `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    new WithAction({
      parent: document.querySelector('.chatdetail .header-box'),
      content: `${chat ? chat.opponentId : `UserE`}`,
      eventHandler1: (e) => {
        if (
          document
            .querySelector('.chatdetail')
            .previousElementSibling.classList.contains('menu')
        ) {
          slideOut('/menu', false);
          document.querySelector('.tab-title.chat-list').click();
        } else if (chat.myType == 'C') {
          slideOut(`/product/${chat.productId}`);
        } else {
          slideOut(`/product/${chat.productId}/productchatlist`);
        }
      },
      eventHandler2: (e) => {
        new Snackbar({ msg: '채팅방에서 나갔습니다', duration: 1000 });
        const roomIdx = window.location.pathname.split('/').pop();
        api.sendPost('/chat/exit', { roomIdx }).then((result) => {
          if (
            document
              .querySelector('.chatdetail')
              .previousElementSibling.classList.contains('menu')
          ) {
            slideOut('/menu', false);
            document.querySelector('.tab-title.chat-list').click();
          } else if (chat.myType == 'C') {
            slideOut(`/product/${chat.productId}`);
          } else {
            slideOut(`/product/${chat.productId}/productchatlist`);
          }
        });
      },
      src1: 'arrow_back',
      src2: 'exit',
    });

    chat ? this.addChat(chat) : null;
  };

  this.componentDidMount();
  this.render();
}
