import comp from '../components/compotest.js';
import { selectLatestElement } from '../utils/helper';
import { slideOut } from '../utils/slide';

export default function pagetest(props) {
  this.state = {
    productList: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  // this.complete = (text) => {
  //   this.setState({
  //     messsage: text,
  //   });
  // };

  this.render = () => {
    let templateLiteral = `
            <div class="pagetest slide">
                <div class="msg-container">
                    
                </div>
                <div class="second"></div>
                <div class="third"></div>
                <button class="back-button">뒤로가기</button>
            </div>
        `;

    // props.parent.innerHTML += templateLiteral;
    props.parent.insertAdjacentHTML('beforeend', templateLiteral);
    // Array.from(props.parent.querySelectorAll('.btn'))
    //   .pop()
    //   .addEventListener('click', () => {
    //     const params = {
    //       userIdx: '1',
    //     };

    //     api.sendPost('/user/register', params).then((result) => {
    //       if ((result.status = 'ok')) {
    //         this.setState({});
    //       }

    //       window.history.pushState('v1', '', '/page1');

    //       if ('/login') {
    //         new login({ parent: document.querySelector('') });
    //       }
    //     });
    //   });

    // this.state.productList.map(function(msg) {

    const $backButton = selectLatestElement(props.parent, 'back-button');

    $backButton.addEventListener('click', () => {
      slideOut('/', false);
    });

    new comp({
      parent: document.querySelector('.msg-container'),
      message: 'ddd',
    });

    // });
    // new comp({ parent: document.querySelector('.second'), message: '두번째', testfunction : this.complete});
    // new comp({ parent: document.querySelector('.third'), message: '세번째' });
  };

  this.render();
}
