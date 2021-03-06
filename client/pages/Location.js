import api from '../utils/api';
import WithoutAction from '../components/Header/WithoutAction';
import { slideOut } from '../utils/slide';
import LocationButton from '../components/Button/Location';
import { selectLatestElement } from '../utils/helper';

export default function Location(props) {
  this.state = {
    data: null,
    isFirst: true,
  };

  api.sendPost('/user/getInfo', {}).then((result) => {
    this.setState({
      data: result.data,
      isFirst: true,
    });
  });

  this.setState = (nextState) => {
    const $app = document.querySelector('.app');
    if (!$app.lastElementChild.classList.contains('home'))
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
      document.querySelector('.app').lastElementChild.classList.add('slide-in');
    }
  };

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
        window.location.href = '/';
      },
    });

    const $locationDiv = document.querySelector('.location .location-div');

    if (this.state.data != null) {
      const { location } = this.state.data;
      location.forEach((loc, index) => {
        new LocationButton({ parent: $locationDiv, location: loc });
        const $locationButton = selectLatestElement(
          $locationDiv,
          '.location-button'
        );
        if (index == 1) {
          $locationButton.classList.add('sub');
          $locationButton.addEventListener('click', () => {
            if (location.length == 2) {
              api
                .sendPost('/user/setLocation', {
                  location: location.slice().reverse(),
                })
                .then((result) => {
                  api.sendPost('/user/getInfo', {}).then((result) => {
                    this.setState({
                      data: result.data,
                      isFirst: false,
                    });
                  });
                });
            }
          });
        }
        const $locationCancel = selectLatestElement(
          $locationButton,
          '.location-cancel'
        );
        $locationCancel.addEventListener('click', (e) => {
          e.stopPropagation();
          if (location.length !== 1) {
            $locationButton.remove();
            api
              .sendPost('/user/setLocation', {
                location: [
                  selectLatestElement($locationDiv, '.location-button')
                    .innerText,
                ],
              })
              .then((result) => {
                api.sendPost('/user/getInfo', {}).then((result) => {
                  this.setState({
                    data: result.data,
                    isFirst: false,
                  });
                });
              });
          }
        });
      });

      if (location.length == 1) {
        new LocationButton({ parent: $locationDiv, location: null });
        const $locationButton = selectLatestElement(
          $locationDiv,
          '.location-add-button'
        );
        $locationButton.addEventListener('click', () => {
          document.body.insertAdjacentHTML(
            'beforeend',
            `<div class='modal'>
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

          $modalInput.addEventListener('keyup', (e) => {
            if (e.target.value != '' && e.target.value.slice(-1) == '동') {
              $modalConfirm.classList.add('confirm');
            } else {
              $modalConfirm.classList.remove('confirm');
            }

            if (e.keyCode === 13) {
              $modalConfirm.click();
            }
          });

          $modalCancel.addEventListener('click', () => {
            document.querySelector('.modal').remove();
          });

          $modalConfirm.addEventListener('click', () => {
            let value = $modalInput.value;
            if (value != '' && value.slice(-1) == '동') {
              let newLocation = [];
              if (location.length == 1) {
                newLocation.push(location[0]);
              }
              newLocation.push(value);
              api
                .sendPost('/user/setLocation', { location: newLocation })
                .then((result) => {
                  document.querySelector('.modal').remove();
                  this.setState({
                    data: { location: newLocation },
                    isFirst: false,
                  });
                });
            }
          });
        });
      }
    }
  };
}
