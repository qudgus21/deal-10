import { selectLatestElement, setCookie } from '../../utils/helper';
import { slideOut } from '../../utils/slide';
import WithoutAction from '../../components/Header/WithoutAction';
import Button from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';
import api from '../../utils/api';

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
                  <div class="btn-box"></div>
                  <div class="signup-button">회원가입</div>
                </div>
            </div>
        `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    new WithoutAction({
      parent: document.querySelector('.register .header-box'),
      content: '회원가입',
      eventHandler: (e) => {
        slideOut('/', false);
      },
    });

    new TextInput({
      parent: document.querySelector('.register .id-input-box'),
      content: '회원가입',
      placeholder: '아이디를 입력하세요',
      value: this.state.value,
    });

    new Button({
      cls: 'large-button',
      parent: document.querySelector('.register .btn-box'),
      content: '회원가입',
      eventHandler: (e) => {
        const $Login = document.querySelector('.register');
        const value = selectLatestElement($Login, '.id-input-box input').value;

        !value
          ? alert('아이디를 입력해 주세요')
          : api.sendPost('/user/login', { userId: value }).then((result) => {
              if (result.status === 'ok') {
                setCookie('user', result.data.id);
                slideOut('/', false);
              } else {
                alert(result.message);
              }
            });
      },
    });
  };

  this.render();
}
