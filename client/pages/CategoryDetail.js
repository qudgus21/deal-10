import WithoutAction from '../components/Header/WithoutAction';
import api from '../utils/api';
import { slideOut } from '../utils/slide';

export default function CategoryDetail(props) {
  this.state = {
    list: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    let templateLiteral = `
            <div class="categorydetail slide">
                <div></div>
                <div>디테일 페이지</div>
            </div>
        `;
    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    // new WithoutAction({
    //   parent: document.querySelector('.categorydetail .header-box'),
    // });
  };

  this.render();
}
