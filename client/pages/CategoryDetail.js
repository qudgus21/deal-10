import WithoutAction from '../components/Header/WithoutAction';
import api from '../utils/api';
import { slideOut } from '../utils/slide';
import ProductListItem from '../components/Etc/ProductListItem';

export default function CategoryDetail(props) {
  this.state = {
    products: null,
    category: null,
  };

  this.setState = (nextState) => {
    document.querySelector('.app').lastElementChild.remove();
    this.state = nextState;
    this.render();
    setTimeout(() => {
      document.querySelector('.app').lastElementChild.classList.add('slide-in');
    }, 50);
  };

  setTimeout(() => {
    const category = window.location.pathname.split('/').pop();
    api
      .sendPost('/product/categoryProducts', { categoryIdx: category })
      .then((result) => {
        this.setState({
          ...this.state,
          products: result.data.products,
          category: result.data.category,
        });
      });
  }, 0);

  this.render = () => {
    let templateLiteral = `
            <div class="categorydetail slide">
              <div class="header-box"></div>
              <ul class="content">
              
              </ul>
            </div>
        `;
    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    new WithoutAction({
      parent: document.querySelector('.categorydetail .header-box'),
      content: this.state.category ? this.state.category.name : '',
      eventHandler: (e) => {
        slideOut('/', false);
      },
    });

    this.state.products
      ? this.state.products.forEach((product) => {
          new ProductListItem({
            parent: document.querySelector('.categorydetail ul'),
            product: product,
          });
        })
      : null;
  };

  this.render();
}
