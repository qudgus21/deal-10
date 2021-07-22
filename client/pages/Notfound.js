import WithoutAction from '../components/Header/WithoutAction';
import { slideOut } from '../utils/slide';

export default function Notfound(props) {
  this.state = {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    let templateLiteral = `
            <div class='notfound slide'>
                <div class='header-box'></div>
                <div class='notfound-container'>
                  <img class='notfound-title' src='../images/dev/at.png'>
                  <div class='notfound-msg'>페이지를 찾을 수 없어요</div>
                  <img class='notfound-char' src='../images/dev/baedal.png'>
                </div>
            </div>
        `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    new WithoutAction({
      parent: document.querySelector('.notfound .header-box'),
      content: '404',
      eventHandler: (e) => {
        slideOut('/', false);
      },
    });
  };

  this.render();
}
