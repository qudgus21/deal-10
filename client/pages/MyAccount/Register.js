import { selectLatestElement, setCookie } from '../../utils/helper';
import { slideOut } from '../../utils/slide';
import WithoutAction from '../../components/Header/WithoutAction';
import Button from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';
import api from '../../utils/api';
import Snackbar from '../../components/Etc/SnackBar';

export default function Register(props) {
  this.state = {
    value: '',
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    let templateLiteral = `
            <div class="register slide">
                <div class="header-box"></div>
                <div class="content">
                  <div class="id-input-box"></div>
                  <div class="location-input-box"></div>
                  <div class="btn-box"></div>
                </div>
            </div>
        `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    new WithoutAction({
      parent: document.querySelector('.register .header-box'),
      content: '회원가입',
      eventHandler: (e) => {
        slideOut('/login', false);
      },
    });

    new TextInput({
      parent: document.querySelector('.register .id-input-box'),
      placeholder: '영문, 숫자 조합 20자 이하',
      value: this.state.value,
      label: '아이디',
    });

    new TextInput({
      parent: document.querySelector('.register .location-input-box'),
      content: '회원가입',
      placeholder: '시·구 제외, 동만 입력',
      value: this.state.value,
      label: '우리 동네',
    });

    new Button({
      cls: 'large-button',
      parent: document.querySelector('.register .btn-box'),
      eventHandler: (e) => {},
      content: '회원가입',
      eventHandler: (e) => {
        const $Register = document.querySelector('.register');
        const id = document.querySelector('.register .id-input-box input')
          .value;
        const location = document.querySelector(
          '.register .location-input-box input'
        ).value;

        const idResult = idValidation(id);
        const locateResult = locateValidation(location);
        if (idResult !== 'ok') {
          new Snackbar({ msg: idResult, duration: 1000 });
          return;
        } else if (locateResult !== 'ok') {
          new Snackbar({ msg: locateResult, duration: 1000 });
          return;
        } else {
          api
            .sendPost('/user/register', { userId: id, location })
            .then((result) => {
              if (result.status === 'ok') {
                new Snackbar({ msg: '회원가입 성공', duration: 1000 });
                slideOut('/login', false);
              } else {
                new Snackbar({ msg: result.message, duration: 1000 });
                return;
              }
            });
        }
      },
    });

    const idValidation = (id) => {
      const idReg = /^[a-zA-Z0-9]{4,12}$/;
      if (id === '') {
        return '아이디를 입력해 주세요';
      } else if (!idReg.test(id)) {
        return '올바른 형식이 아닙니다';
      } else {
        return 'ok';
      }
    };

    const locateValidation = (location) => {
      if (location === '') {
        return '동네를 입력해 주세요';
      } else if (
        location.split(' ').length > 1 ||
        location[location.length - 1] !== '동'
      ) {
        return '동만 입력해 주세요';
      } else {
        return 'ok';
      }
    };
  };

  this.render();
}
