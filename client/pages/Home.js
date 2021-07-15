import { slideIn } from '../utils/slide';
import { selectLatestElement } from '../utils/helper';
import pagetest from './pagetest';
import homeHeader from '../components/Header/Main';
import productListItem from '../components/Etc/ProductListItem';

export default function Home(props) {
  this.state = {
    list: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const templateLiteral = `
      <div class='home'>
      </div>
    `;
    // =======
    //             <div class='home'>
    //                 <div class='red'>홈 화면 메인</div>
    //                 <div>홈 화면 내용 메인22</div>
    //                 <input type='button' class='category-button' value='카테고리'></input>
    //                 <input type='button' class='my-account-button' value='내 계정'></input>
    //             </div>
    //         `;
    // >>>>>>> 46a3cd506ff1142811d6d3781540ef8eda26161b

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
