import WithoutAction from '../components/Header/WithoutAction';
import api from '../utils/api';
import { slideIn, slideOut } from '../utils/slide';

export default function Category(props) {
  this.state = {
    list: [],
    currentCategory: '',
    products: [],
  };

  this.setState = (nextState) => {
    document.querySelector('.app').lastElementChild.remove();
    this.state = nextState;
    this.render();
    setTimeout(() => {
      document.querySelector('.app').lastElementChild.classList.add('slide-in');
    }, 50);
  };

  api.sendPost('/category/getCategorys', {}).then((result) => {
    this.setState({
      list: result.data,
    });
  });

  this.categoryClickHandler = (e) => {
    const category = e.currentTarget.className.split('-')[1];
    slideIn(`category/${category}`, false);
  };

  this.render = () => {
    let templateLiteral = `
            <div class="category slide">
                <div class="header-box"></div>
                <ul class="content">
                    ${this.state.list.reduce((acc, cur) => {
                      return (
                        acc +
                        `
                        <li class="category-${cur.idx}">
                            <div>
                                <img src='../images/dev/${cur.imgUrl}.svg'>
                            </div>
                            <div class="title">${cur.name}</div>
                        </li>
                        `
                      );
                    }, ``)}
                </ul>
            </div>
        `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    document.querySelectorAll('.category li').forEach((item) => {
      item.addEventListener('click', this.categoryClickHandler);
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
