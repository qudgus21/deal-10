import { slideIn } from '../utils/slide';
import { selectLatestElement } from '../utils/helper';
import pagetest from './pagetest';
import homeHeader from '../components/Header/Main';
import productListItem from '../components/Etc/ProductListItem';
import api from '../utils/api';
import ProductListItem from '../components/Etc/ProductListItem';

export default function Home(props) {
  this.state = {
    products: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  api.sendPost('/product/products', {}).then((result) => {
    console.log(result);
    this.setState({
      products: result.data,
    });
  });

  this.render = () => {
    const templateLiteral = `
      <div class='home'>
      </div>
    `;

    props.parent.innerHTML = templateLiteral;
    const $home = document.querySelector('.home');
    new homeHeader({
      parent: $home,
    });

    $home.insertAdjacentHTML('beforeend', `<div class='product-list'></div>`);

    this.state.products
      ? this.state.products.forEach((product) => {
          new ProductListItem({
            parent: document.querySelector('.home'),
            product: product,
          });
        })
      : null;
  };

  this.render();
}
