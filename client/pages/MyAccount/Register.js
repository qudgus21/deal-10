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
        slideOut('/', false);
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
    });
  };

  this.render();
}
