import { slideIn } from '../utils/slide';
import { selectLatestElement } from '../utils/helper';
import pagetest from './pagetest';
import homeHeader from '../components/Header/Main';
import productListItem from '../components/Etc/ProductListItem';
import api from '../utils/api';

export default function Home(props) {
  this.state = {
    list: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  api.sendPost('/product/getProducts', {}).then((result) => {
    this.setState({
      list: result.data,
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

    this.state.list.forEach(function (product) {
      new productListItem({
        parent: document.querySelector('.product-list'),
        idx: product.idx,
      });
    });
  };

  this.render();
}
