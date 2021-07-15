import { selectLatestElement, setCookie } from '../../utils/helper';
import { slideIn, slideOut } from '../../utils/slide';
import WithoutAction from '../../components/Header/WithoutAction';
import Button from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';
import Register from './Register';
import api from '../../utils/api';

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
          ? alert('아이디를 입력해 주세요')
          : api.sendPost('/user/login', { userId: value }).then((result) => {
              if (result.status === 'ok') {
                alert('로그인 성공');
                setCookie('user', result.data.id);
                slideOut('/', false);
              } else {
                alert(result.message);
              }
            });
      },
    });

    document
      .querySelector('.login .signup-button')
      .addEventListener('click', () => {
        slideIn('/register', false);
      });
  };

  this.render();
}
