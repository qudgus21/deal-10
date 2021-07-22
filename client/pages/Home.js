import { slideIn } from '../utils/slide';
import { isLogin } from '../utils/helper';
import homeHeader from '../components/Header/Main';
import api from '../utils/api';
import ProductListItem from '../components/Etc/ProductListItem';
import Snackbar from '../components/Etc/SnackBar';

export default function Home(props) {
  this.state = {
    products: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  api.sendPost('/product/products', { isHome: true }).then((result) => {
    let products = result.data.filter((product) => {
      return product.location !== null;
    });
    this.setState({
      products,
    });
  });

  this.render = () => {
    const templateLiteral = `
      <div class='home'>
        <button class='fab-button'>
          <img src='../images/dev/add_white.svg'>
        </button>
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

    $home.insertAdjacentHTML(
      'beforeend',
      `<div class='empty'>
        <img class='empty-banner' src='../images/dev/empty.png'></img>
        <div class='empty-msg'>불러올 상품이 없어요</div>
        <div class='empty-msg'>첫 번째로 등록해보세요!</div>
      </div>`
    );

    document.querySelector('.fab-button').addEventListener('click', () => {
      if (!isLogin()) {
        new Snackbar({ msg: '로그인 후 이용해 주세요', duration: 1000 });
        return;
      }
      slideIn('/newpost', false);
    });

    document.querySelector('.home').addEventListener('click', (e) => {
      if (!e.target.classList.contains('dropdown')) {
        if (document.querySelector('.dropdown') != null) {
          document.querySelector('.dropdown').remove();
        }
      }
    });
  };

  this.render();
}
