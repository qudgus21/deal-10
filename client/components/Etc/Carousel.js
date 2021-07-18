import { selectLatestElement } from '../../utils/helper';
import { carouselInit, shiftTo } from '../../utils/carousel';

export default function Carousel(props) {
  this.state = {
    data: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    let templateLiteral = `
      <div class='carousel'>
        <div class='carousel-wrapper'>
          <div class='carousel-container'>
          </div>
        </div>
        <div class='carousel-navigator'>
        </div>
        <a id='prev' class='control prev'></a>
        <a id='next' class='control next'></a>
      </div>        
    `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    const $container = document.querySelector('.carousel-container');
    const $navigator = document.querySelector('.carousel-navigator');
    props.imgUrls.forEach((imgUrl, index) => {
      let imgTemplateLiteral = `<span class='carousel-img'>
        <img src='${imgUrl}'>
      </span>`;
      let navTemplateLiteral = `<span class='navigator-item nav-${index}'></span>`;

      $container.insertAdjacentHTML('beforeend', imgTemplateLiteral);
      $navigator.insertAdjacentHTML('beforeend', navTemplateLiteral);
      selectLatestElement($navigator, `.nav-${index}`).addEventListener(
        'click',
        () => {
          shiftTo(index);
        }
      );
      if (index == 0) {
        selectLatestElement($navigator, `.nav-${index}`).classList.add(
          'selected'
        );
      }
    });
    //애니메이션이 안댐 그리고 넘겨도 멈춤 체크 ㄱ
    const $carousel = document.querySelector('.carousel');
    const $prev = document.querySelector('.prev');
    const $next = document.querySelector('.next');

    carouselInit($carousel, $container, $prev, $next);
  };

  this.render();
}
