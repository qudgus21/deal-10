import { slideIn } from '../../utils/slide';
import { isLogin } from '../../utils/helper';
import api from '../../utils/api';

export default function SaleList(props) {
  this.state = {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { parent } = props;

    const templateLiteral = `
      <div class='salelist'>
        판매목록
      </div>
    `;

    parent.innerHTML = templateLiteral;
  };

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
