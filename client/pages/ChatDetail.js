import api from '../utils/api';
import WithAction from '../components/Header/withAction';
import { slideOut } from '../utils/slide';

export default function ChatDetail(props) {
  this.state = {
    data: null,
    chat: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  //   api.sendPost('/chatting/chattingDetail 주소 나중에 정하기', {}).then((result) => {
  //     this.setState({
  //       chat: chat.data, append하면되는데 전부 읽어오면 좀 손해인듯 생각ㄲ 걍 다가져오는게 낫나?
  //     });
  //   });

  this.render = () => {
    // const { chat } = this.state.data;
    let templateLiteral = `
            <div class='chatdetail slide'>
                <div class='header-box'></div>
                <div class='chatdetail-product'>
                    <div class='img-box'>
                        <img class='border-small' src='https://evan-moon.github.io/static/0a02b37a5a8be4d9a803999dc5586f67/14b42/thumbnail.jpg'>
                    </div>
                    <div class='chatdetail-row'>
                        <div class='chatdetail-title'>빈티지 롤러 스케이트</div>
                        <div class='chatdetail-price'>160,000원</div>
                    </div>
                    <div class='chatdetail-status flex'>판매중</div>
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
      content: 'UserE',
      eventHandler: (e) => {
        slideOut('/', false);
      },
    });
    //TODO: withaction 헤더 아이콘 & 액션이벤트핸들러 파라미터 추가

    let msgReceiveTl = `<div class='msg-left'><div class='msg-receive'>안녕하세요 궁금한게 있는데요</div></div>`;
    let msgSendTl = `<div class='msg-right'><div class='msg-send'>네 안녕하세요!</div></div>`;

    // 데이터 받아와서 리시브 샌드 Div 추가하기 가장 오래된게 가장 먼저 추가됨 그리고 로드 다하면 바닥 자동 스크롤?
    // 데이터는 셋인터벌로 가져오나?
    // 최신부터 가져와서 앞에다 끼우는 거도 괜찮을거같은데 이건 하기 나름인듯 이렇게하면 스크롤 안해도 될듯
    const $msgContainer = document.querySelector('.msg-container');
    for (let i = 0; i < 50; i++) {
      $msgContainer.insertAdjacentHTML('afterbegin', msgSendTl);
      $msgContainer.insertAdjacentHTML('afterbegin', msgReceiveTl);
    }
    $msgContainer.insertAdjacentHTML(
      'beforeend',
      `<div class='msg-padding'></div>`
    );
    $msgContainer.scrollTo(0, $msgContainer.scrollHeight);
  };

  this.render();
}
