import { selectLatestElement, setCookie } from '../../utils/helper';
import { slideIn, slideOut } from '../../utils/slide';
import WithoutAction from '../../components/Header/WithoutAction';
import Button from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';
import Register from './Register';
import api from '../../utils/api';
import Snackbar from '../../components/Etc/SnackBar';

export default function Login(props) {
  this.state = {
    value: '',
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    let templateLiteral = `
            <div class="login slide">
                <div class="header-box"></div>
                <div class="content">
                  <div class="id-input-box"></div>
                  <div class="btn-box"></div>
                  <div class="signup-button">회원가입</div>
                </div>
            </div>
        `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    new WithoutAction({
      parent: document.querySelector('.login .header-box'),
      content: '로그인',
      eventHandler: (e) => {
        slideOut('/', false);
      },
    });

    new TextInput({
      parent: document.querySelector('.login .id-input-box'),
      placeholder: '아이디를 입력하세요',
      value: this.state.value,
    });

    new Button({
      cls: 'large-button',
      parent: document.querySelector('.login .btn-box'),
      content: '로그인',
      eventHandler: (e) => {
        const $Login = document.querySelector('.login');
        const value = selectLatestElement($Login, '.id-input-box input').value;

        !value
          ? new Snackbar({ msg: '아이디를 입력해 주세요', duration: 1000 })
          : api.sendPost('/user/login', { userId: value }).then((result) => {
              if (result.status === 'ok') {
                new Snackbar({ msg: '로그인 성공', duration: 1000 });
                setCookie('user', result.data.id);
                setCookie('userIdx', result.data.idx);
                setTimeout(() => {
                  window.location.href = '/';
                }, 300);
              } else {
                new Snackbar({ msg: result.message, duration: 1000 });
              }
            });
      },
    });

    document
      .querySelector('.login .signup-button')
      .addEventListener('click', () => {
        slideIn('/register', false);
      });

    document
      .querySelector('.id-input-box > div > input')
      .addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
          document.querySelector('.large-button').click();
        }
      });
  };

  this.render();
}
