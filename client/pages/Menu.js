import WithoutAction from '../components/Header/WithoutAction';
import { slideOut } from '../utils/slide';
import SaleList from '../components/Menu/SaleList';
import LikeList from '../components/Menu/LikeList';
import ChatList from '../components/Menu/ChatList';

export default function Menu(props) {
  this.state = {
    data: null,
  };

  //   api.sendPost('/product/products', { userIdx: 1 }).then((result) => {
  //     result.data.forEach((data) => {
  //       new ProductListItem({
  //         parent: document.querySelector('menu-container'),
  //         data: data,
  //       });
  //     });
  //   });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    let templateLiteral = `
            <div class='menu slide'>
                <div class='header-box'>
                </div>
                <div class='tab-bar'>
                    <div class='tab-title sale-list tab-select'>판매목록</div>
                    <div class='tab-title chat-list'>채팅</div>
                    <div class='tab-title fav-list'>관심목록</div>
                </div>
                <div class='menu-container'></div>
            </div>
        `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    new WithoutAction({
      parent: document.querySelector('.menu .header-box'),
      content: '메뉴',
      eventHandler: (e) => {
        slideOut('/', false);
      },
    });

    new SaleList({
      parent: document.querySelector('.menu .menu-container'),
    });

    const $saleList = document.querySelector('.sale-list');
    const $chatList = document.querySelector('.chat-list');
    const $favList = document.querySelector('.fav-list');

    $saleList.addEventListener('click', () => {
      $saleList.classList.add('tab-select');
      $chatList.classList.remove('tab-select');
      $favList.classList.remove('tab-select');
      new SaleList({
        parent: document.querySelector('.menu .menu-container'),
      });
    });

    $chatList.addEventListener('click', () => {
      document.querySelector('.menu-container').innerHTML = '';
      $saleList.classList.remove('tab-select');
      $chatList.classList.add('tab-select');
      $favList.classList.remove('tab-select');
      new ChatList({
        parent: document.querySelector('.menu .menu-container'),
      });
      //   api.sendPost('/chatting/chattings', { userIdx: 1 }).then((result) => {
      //     result.data.forEach((data) => {
      //         new ChatListItem({
      //           parent: document.querySelector('menu-container'),
      //           data: data,
      //         });
      //     });
      //   });
    });

    $favList.addEventListener('click', () => {
      document.querySelector('.menu-container').innerHTML = '';
      $saleList.classList.remove('tab-select');
      $chatList.classList.remove('tab-select');
      $favList.classList.add('tab-select');
      new LikeList({
        parent: document.querySelector('.menu .menu-container'),
      });
    });
  };

  this.render();
}
