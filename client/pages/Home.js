import { slideIn } from '../utils/slide';
import { selectLatestElement, getCookie } from '../utils/helper';

export default function Home(props) {
  this.state = {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const templateLiteral = `
            <div class='home'>
                <div class='red'>홈 화면 메인</div>
                <div>홈 화면 내용 메인22</div>
                <input type='button' class='category-button' value='카테고리'></input>
                <input type='button' class='my-account-button' value='내 계정'></input>
            </div>
        `;

    props.parent.innerHTML = templateLiteral;

    const $myAccountButton = selectLatestElement(
      props.parent,
      '.my-account-button'
    );

    const $categoryButton = selectLatestElement(
      props.parent,
      '.category-button'
    );

    $myAccountButton.addEventListener('click', () => {
      if (getCookie('user')) {
        slideIn('/MyAccount', false);
      } else {
        slideIn('/login', false);
      }
    });

    $categoryButton.addEventListener('click', () => {
      slideIn('/category', false);
    });
  };

  this.render();
}
