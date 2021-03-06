import WithoutAction from '../components/Header/WithoutAction';
import { slideOut } from '../utils/slide';
import SaleList from '../components/Menu/SaleList';
import LikeList from '../components/Menu/LikeList';
import ChatList from '../components/Menu/ChatList';

export default function Menu(props) {
  this.state = {
    data: null,
  };

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

    const refreshChat = setInterval(() => {
      if (
        document
          .querySelector('.app')
          .lastElementChild.classList.contains('menu') &&
        document.querySelector('.tab-select').classList.contains('chat-list')
      ) {
        const $menu = document.querySelector('.menu');
        const pos = $menu.scrollTop;
        document.querySelector('.chat-list').click();
        setTimeout(() => {
          $menu.scrollTo(0, pos);
        }, 50);
      }
    }, 3000);

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    new WithoutAction({
      parent: document.querySelector('.menu .header-box'),
      content: '메뉴',
      eventHandler: (e) => {
        clearInterval(refreshChat);
        window.location.href = '/';
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
      if (!$chatList.classList.contains('tab-select')) {
        document.querySelector('.menu-container').firstElementChild.remove();
      } else {
        document
          .querySelector('.menu-container')
          .firstElementChild.classList.add('chatlist-prev');
        setTimeout(() => {
          document.querySelector('.menu-container').firstElementChild.remove();
        }, 100);
      }
      $saleList.classList.remove('tab-select');
      $chatList.classList.add('tab-select');
      $favList.classList.remove('tab-select');
      new ChatList({
        parent: document.querySelector('.menu .menu-container'),
      });
    });

    $favList.addEventListener('click', () => {
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
