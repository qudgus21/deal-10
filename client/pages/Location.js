import api from '../utils/api';
import WithoutAction from '../components/Header/WithoutAction';
import { slideOut } from '../utils/slide';
import LocationButton from '../components/Button/Location';
import { selectLatestElement } from '../utils/helper';

export default function Location(props) {
  this.state = {
    data: null,
  };

  api.sendPost('/user/getInfo', {}).then((result) => {
    this.setState({
      data: result.data,
    });
  });

  this.setState = (nextState) => {
    // document.querySelector('.app').lastElementChild.remove();
    this.state = nextState;
    this.render();
    // setTimeout(() => {
    //   document.querySelector('.app').lastElementChild.classList.add('slide-in');
    // }, 50);
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
        slideOut('/', false);
      },
    });

    const $locationDiv = document.querySelector('.location .location-div');

    if (this.state.data != null) {
      const { location } = this.state.data;
      console.log(location);
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
        $locationCancel.addEventListener('click', () => {
          if (location.length == 1) {
          } else {
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
            document.querySelector('.location-modal').remove();
          });

          $modalConfirm.addEventListener('click', () => {
            let value = $modalInput.value;
            if (value != '') {
              let newLocation = [];
              if (location.length == 1) {
                newLocation.push(location[0]);
              }
              newLocation.push(value);
              console.log(newLocation);
              api
                .sendPost('/user/setLocation', { location: newLocation })
                .then((result) => {
                  document.querySelector('.location-modal').remove();
                  this.setState({ data: { location: newLocation } });
                });
            }
          });
        });
      }
    }
  };

  this.render();
}
