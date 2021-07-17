import api from '../utils/api';
import WithoutAction from '../components/Header/WithoutAction';
import { slideOut } from '../utils/slide';
import LocationButton from '../components/Button/Location';
import { selectLatestElement } from '../utils/helper';

export default function Location(props) {
  this.state = {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  // 유저 정보 fetch

  this.render = () => {
    const templateLiteral = `
      <div class='location slide'>
        <div class='header-box'></div>
        <div class='location-notice'>
          <h1>지역은 최소 1개 이상</h1>
          <h1>최대 2개까지 설정 가능해요.</h1>
        </div>
        <div class='location-div'></div>
      </div>
    `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    new WithoutAction({
      parent: document.querySelector('.location .header-box'),
      content: '내 동네 설정하기',
      eventHandler: (e) => {
        slideOut('/', false);
      },
    });

    // 로그인 안했으면 어케 표시하지?
    const $locationDiv = document.querySelector('.location .location-div');

    ['역삼동', null].forEach((location) => {
      new LocationButton({ parent: $locationDiv, location: location });
      if (location == null) {
        const $locationButton = selectLatestElement(
          $locationDiv,
          '.location-add-button'
        );
        $locationButton.addEventListener('click', () => {
          document.querySelector('.app').insertAdjacentHTML(
            'beforeend',
            `<div class='location-modal'>
                <div class='location-box'>
                  <div class='modal-title'>우리 동네를 입력하세요</div>
                  <input class='modal-input' placeholder='시구 제외, 동만 입력'></input>
                  <div class='modal-bottom-bar'>
                    <button class='modal-cancel'>취소</button>
                    <button class='modal-confirm'>확인</button>
                  </div>
                </div>
              </div>`
          );
          const $modalInput = document.querySelector('.modal-input');
          const $modalConfirm = document.querySelector('.modal-confirm');
          const $modalCancel = document.querySelector('.modal-cancel');

          $modalInput.addEventListener('keyup', ({ target }) => {
            if (target.value == '') {
              $modalConfirm.classList.remove('confirm');
            } else {
              $modalConfirm.classList.add('confirm');
            }
          });

          $modalCancel.addEventListener('click', () => {
            console.log('c');
            document.querySelector('.location-modal').remove();
          });
          // db 처리 후 re-render / submit 써야하나?
        });
      } else {
        const $locationButton = selectLatestElement(
          $locationDiv,
          '.location-button'
        );
        $locationButton.addEventListener('click', () => {
          $locationButton.remove();
          //db 처리
        });
      }
    });
  };

  this.render();
}
