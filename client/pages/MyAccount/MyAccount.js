import { getCookie, selectLatestElement, setCookie } from '../../utils/helper';
import { slideOut } from '../../utils/slide';
import WithoutAction from '../../components/Header/WithoutAction';
import Button from '../../components/Button/Button';
import api from '../../utils/api';

export default function MyAccount(props) {
  this.state = {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    let templateLiteral = `
            <div class="MyAccount slide">
                <div class="header-box"></div>
                <div class="content">
                  <h2>${getCookie('user')}</h2>
                  <div class="btn-box"><div>
                </div>
            </div>
        `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    new WithoutAction({
      parent: document.querySelector('.MyAccount .header-box'),
      content: '내 계정',
      eventHandler: (e) => {
        slideOut('/', false);
      },
    });

    new Button({
      cls: 'large-button',
      parent: document.querySelector('.MyAccount .btn-box'),
      content: '로그아웃',
      eventHandler: (e) => {
        api.sendPost('/user/logout', {}).then((result) => {
          if (result.status === 'ok') {
            setCookie('user', 'none', 0);
            setCookie('userIdx', 'none', 0);
            alert('로그아웃 성고');
            window.location.href = '/';
            // slideOut('/', false);
          }
        });
      },
    });
  };

  this.render();
}
