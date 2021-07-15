import { slideIn } from '../utils/slide';
import { selectLatestElement } from '../utils/helper';
import pagetest from './pagetest';
import homeHeader from '../components/Header/Main';
import productListItem from '../components/Etc/ProductListItem';

export default function Home(props) {
  this.state = {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

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

    for (let i = 0; i < 10; i++) {
      new productListItem({
        parent: document.querySelector('.product-list'),
        data: {
          title: '타이틀',
          location: '무슨동',
          price: '99999',
          updateDate: '1시간 전',
          imgUrl:
            'https://cdn.pixabay.com/photo/2016/04/15/08/04/strawberry-1330459_1280.jpg',
          chats: 11,
          likes: 11,
        },
      });
    }
  };

  this.render();
}
