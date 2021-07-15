import { selectLatestElement, setCookie } from '../../utils/helper';
import { slideOut } from '../../utils/slide';
import WithoutAction from '../../components/Header/WithoutAction';
import Button from '../../components/Button/Button';

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
                  <h2>Username</h2>
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
        setCookie('ssid', 'none', 0);
        slideOut('/', false);
      },
    });
  };

  this.render();
}
