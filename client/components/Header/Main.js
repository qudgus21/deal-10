import { isLogin, selectLatestElement } from '../../utils/helper';
import { slideIn } from '../../utils/slide';
import { getCookie } from '../../utils/helper';
import Dropdown from '../Etc/Dropdown';
import api from '../../utils/api';

export default function homeHeader(props) {
  this.state = {
    data: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  api.sendPost('/user/getInfo', {}).then((result) => {
    this.setState({
      data: result.data,
    });
  });

  this.render = () => {
    let templateLiteral = `
    <div class='home-header'>
      <div class='flex'>
        <button class='category-button' type='button'>
          <img src='./images/dev/category.svg'>
        </button>
        <img src='./images/dev/none.svg'>
      </div>
      <div class='location-div flex'>
        <img src='./images/dev/location.svg'>
        <div>동네 설정</div>
      </div>
      <div>
        <button class='my-account-button' type='button'>
          <img src='./images/dev/account.svg'>
        </button>
        <button class='menu-button' type='button'>
          <img src='./images/dev/menu.svg'>
        </button>
      </div>
    </div>
    `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    const $homeHeader = document.querySelector('.home-header');
    const $categoryButton = selectLatestElement(
      $homeHeader,
      '.category-button'
    );
    const $locationDiv = selectLatestElement($homeHeader, '.location-div');
    const $myAccountButton = selectLatestElement(
      $homeHeader,
      '.my-account-button'
    );
    const $menuButton = selectLatestElement($homeHeader, '.menu-button');

    $categoryButton.addEventListener('click', () => {
      slideIn('/category', false);
    });

    if (this.state.data != null) {
      $locationDiv.children[1].innerText = this.state.data.location[0];
    }

    $locationDiv.addEventListener('click', () => {
      if (isLogin()) {
        if (document.querySelector('.dropdown') !== null) {
          document.querySelector('.dropdown').remove();
        }
        new Dropdown({
          parent: $homeHeader,
          data: [
            { text: this.state.data.location[0], eventHandler: () => {} },
            {
              text: '내 동네 설정',
              eventHandler: () => {
                slideIn('/location', false);
                document.querySelector('.dropdown').remove();
              },
            },
          ],
        });
      } else {
        alert('로그인을 해주세요.');
      }
    });

    $myAccountButton.addEventListener('click', () => {
      if (getCookie('user')) {
        slideIn('/MyAccount', false);
      } else {
        slideIn('/login', false);
      }
    });
    $menuButton.addEventListener('click', () => {
      slideIn('/menu', false);
    });
  };
  this.render();
}
