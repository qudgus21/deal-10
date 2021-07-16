import { selectLatestElement, setCookie } from '../../utils/helper';
import { slideIn, slideOut } from '../../utils/slide';
import WithoutAction from '../../components/Header/WithoutAction';
import Button from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';
import api from '../../utils/api';

export default function ProductDetail(props) {
  this.state = {
    value: '',
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  console.log(window.location.pathname);

  this.render = () => {
    let templateLiteral = `
            <div class="productdetail slide">
                <div class="header-box"></div>
                <div class="content">
                    상품디테일
                </div>
            </div>
        `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);
  };

  this.render();
}
