import WithoutAction from '../components/Header/WithoutAction';
import api from '../utils/api';
import { slideOut } from '../utils/slide';

export default function Category(props) {
  this.state = {
    list: [],
  };

  this.setState = (nextState) => {
    document.querySelector('.app').lastElementChild.remove();
    this.state = nextState;
    this.render();
    setTimeout(() => {
      document.querySelector('.app').lastElementChild.classList.add('slide-in');
    }, 100);
  };

  api.sendPost('/category/getCategorys', {}).then((result) => {
    this.setState({
      list: result.data,
    });
  });

  this.render = () => {
    let categorys = this.state.list.reduce((acc, cur) => {
      return (
        acc +
        `
        <li>
            <div>${cur.category}</div>
            <div>
                <img src='../images/dev/${cur.imgUrl}.svg'>
            </div>
        </li>
        `
      );
    }, ``);

    console.log(categorys);

    let templateLiteral = `
            <div class="category slide">
                <div class="header-box"></div>
                <ul class="content">
                    ${this.state.list.reduce((acc, cur) => {
                      return (
                        acc +
                        `
                        <li>
                            <div>${cur.category}</div>
                            <div>
                                <img src='../images/dev/${cur.imgUrl}.svg'>
                            </div>
                        </li>
                        `
                      );
                    }, ``)}
                </ul>
            </div>
        `;
    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

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
