import WithoutAction from '../components/Header/WithoutAction';
import api from '../utils/api';
import { slideIn, slideOut } from '../utils/slide';

export default function Category(props) {
  this.state = {
    value: '',
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    let templateLiteral = `
            <div class="category slide">
                <div class="header-box"></div>
                <div class="content">
                  <div class="signup-button">카테고리</div>
                </div>
            </div>
        `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    api.sendPost('/category/get', {}).then((result) => {
      console.log(result);
    });

    new WithoutAction({
      parent: document.querySelector('.category .header-box'),
      content: '카테고리',
      eventHandler: (e) => {
        slideOut('/', false);
      },
    });
  };
  this.render();
}
