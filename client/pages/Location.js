import api from '../utils/api';
import WithoutAction from '../components/Header/WithoutAction';
import { slideOut } from '../utils/slide';

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
  };

  this.render();
}
