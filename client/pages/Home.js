import { slideIn } from '../utils/slide';
import { selectLatestElement } from '../utils/helper';
import pagetest from './pagetest';

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
                <input type='button' class='next-button' value='페이지 이동'></input>
            </div>
        `;

    props.parent.innerHTML = templateLiteral;

    const $nextButton = selectLatestElement(props.parent, 'next-button');

    $nextButton.addEventListener('click', () => {
      console.log('페이지 이동?');
      slideIn('/pagetest', false);
    });
  };

  this.render();
}
