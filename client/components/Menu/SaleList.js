import { getCookie } from '../../utils/helper';
import ProductListItem from '../Etc/ProductListItem';
import api from '../../utils/api';

export default function SaleList(props) {
  this.state = {
    products: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.sortMyProduct = (products) => {
    const userIdx = getCookie('userIdx');
    const result = products.filter((product) => {
      return product.userId === userIdx;
    });
    return result;
  };

  this.componentDidMount = () => {
    api.sendPost('/product/products').then((result) => {
      this.setState({
        ...this.state,
        products: this.sortMyProduct(result.data),
      });
    });
  };

  this.saleListHandler = () => {};

  this.render = () => {
    const { parent } = props;
    const { products } = this.state;

    const templateLiteral = `
      <div class='salelist'>
      </div>
    `;

    parent.innerHTML = templateLiteral;
    products
      ? products.forEach((product) => {
          new ProductListItem({
            parent: parent.querySelector('.salelist'),
            product: product,
            isMenu: true,
            saleListHandler: this.saleListHandler,
          });
        })
      : null;
  };

  this.componentDidMount();
  this.render();
}

//   api.sendPost('/product/products', { userIdx: 1 }).then((result) => {
//     result.data.forEach((data) => {
//       new ProductListItem({
//         parent: document.querySelector('menu-container'),
//         data: data,
//       });
//     });
//   });
