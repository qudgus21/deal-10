import api from '../../utils/api';
import ProductListItem from '../Etc/ProductListItem';

export default function LikeList(props) {
  this.state = {
    products: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.sortMyProduct = (products) => {
    const result = products.filter((product) => {
      return product.isLike === 'Y';
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

  this.render = () => {
    const { parent } = props;
    const { products } = this.state;

    const templateLiteral = `
      <div class='likelist'></div>
    `;

    parent.innerHTML = templateLiteral;

    products
      ? products.forEach((product) => {
          new ProductListItem({
            parent: parent.querySelector('.likelist'),
            product: product,
          });
        })
      : null;
  };

  this.componentDidMount();
  this.render();
}
