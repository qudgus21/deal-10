import { selectLatestElement } from '../../utils/helper';

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
    const $navigator = document.querySelector('carousel-navigator');
    props.imgUrls.forEach((imgUrl, index) => {
      let imgTemplateLiteral = `<span class='slide-img'>
        <img src='${imgUrl}'>
      </span>`;
      let navTemplateLiteral = `<span class='navigator-item nav-${index}`;

      $container.insertAdjacentHTML('beforeend', imgTemplateLiteral);
      $navigator.insertAdjacentHTML('beforeend', navTemplateLiteral);
      selectLatestElement($navigator, `.nav-${index}`).addEventListener(
        'click',
        () => {
          shiftTo(index);
        }
      );
    });
  };

  this.render();
}
