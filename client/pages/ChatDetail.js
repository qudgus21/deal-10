import WithAction from '../components/Header/withAction';
import { slideOut } from '../utils/slide';
import { saleConstant } from '../utils/constant';
import api from '../utils/api';

export default function ChatDetail(props) {
  this.state = {
    chatContents: [],
    product: {},
    user: {},
    isFirst: true,
  };

  setTimeout(() => {
    const productId = window.location.pathname.split('/')[2];
    console.log(productId);
    api
      .sendPost('/product/detail', {
        productIdx: productId,
      })
      .then((result) => {
        api
          .sendPost('/user/getInfo', {
            userIdx: result.data.userIdx,
          })
          .then((result2) => {
            this.setState({
              ...this.state,
              product: result.data,
              user: result2.data,
              isFirst: true,
            });
          });
      });
  }, 0);

  this.setState = (nextState) => {
    const $app = document.querySelector('.app');
    if (!$app.lastElementChild.classList.contains('chatlist'))
      document.querySelector('.app').lastElementChild.remove();
    this.state = nextState;
    this.render();
    if (this.state.isFirst == true) {
      setTimeout(() => {
        document
          .querySelector('.app')
          .lastElementChild.classList.add('slide-in');
      }, 50);
    } else {
      document.querySelector('.chatdetail').style.left = '0px';
      document.querySelector('.chatdetail').style.top = '0px';
    }
  };

  // TODO: 채팅방 입장시 해당 방 메시지 싹다 read로 바꾸기
  // 메시지 fetch 방식에 따라 렌더 고쳐야할듯

  this.render = () => {
    let templateLiteral = `
            <div class='chatdetail slide'>
                <div class='header-box'></div>
                <div class='chatdetail-product'>
                    <div class='img-box'>
                        <img class='border-small' src='${
                          this.state.product.imgUrls[0]
                        }'>
                    </div>
                    <div class='chatdetail-row'>
                        <div class='chatdetail-title'>${
                          this.state.product.title
                        }</div>
                        <div class='chatdetail-price'>${
                          this.state.product.price
                        }</div>
                    </div>
                    <div class='chatdetail-status flex'>${
                      saleConstant[this.state.product.status]
                    }</div>
                </div>
                <div class='msg-container'></div>
                <div class='msg-input-div'>
                    <input type='text' name='msg' placeholder='메시지를 입력하세요.'>
                    <button class='send-msg-button'>
                        <img src='../../../images/dev/send.svg'>
                    </button>
                </div>
            </div>
        `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    new WithAction({
      parent: document.querySelector('.chatdetail .header-box'),
      content: this.state.user.id,
      src1: 'arrow_back',
      src2: 'exit',
      eventHandler1: () => {
        if (this.state.product) {
          slideOut(`/product/${this.state.product.productIdx}/chatlist`, false);
        } else {
          slideOut(`/product/${this.stat.product.productIdx}/chatlist`, false);
        }
      },
      eventHandler2: () => {
        //TODO: db에서 채팅방 삭제
        // confirm 팝업 있어야할듯?
      },
    });

    const $msgContainer = document.querySelector('.msg-container');

    // TODO: 채팅 가져오기
    // 데이터는 셋인터벌로 가져오나?
    // this.state.chatContents.forEach((chatContent) => {
    //   if (chatContent.type == 'S') {
    //     let msgSendTl = `<div class='msg-right'><div class='msg-send'>${chatContent.content}</div></div>`;
    //     $msgContainer.insertAdjacentHTML('afterbegin', msgSendTl);
    //   } else {
    //     let msgReceiveTl = `<div class='msg-left'><div class='msg-receive'>${chatContent.content}</div></div>`;
    //     $msgContainer.insertAdjacentHTML('afterbegin', msgReceiveTl);
    //   }
    // });
    $msgContainer.insertAdjacentHTML(
      'beforeend',
      `<div class='msg-padding'></div>`
    );
    $msgContainer.scrollTo(0, $msgContainer.scrollHeight);
  };
}
