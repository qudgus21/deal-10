import { selectLatestElement } from '../../utils/helper';
import { slideIn } from '../../utils/slide';
import { getCookie } from '../../utils/helper';

export default function homeHeader(props) {
  this.state = {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

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
        <div>역삼동</div>
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
    $locationDiv.addEventListener('click', () => {
      slideIn('/location', false);
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
