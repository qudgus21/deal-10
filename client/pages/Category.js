import WithoutAction from '../components/Header/WithoutAction';
import api from '../utils/api';
import { slideOut } from '../utils/slide';

export default function Category(props) {
  this.state = {
    list: [],
  };

  this.setState = (nextState) => {
    document.querySelector('.app').lastElementChild.remove();
    this.state = nextState;
    this.render();
    setTimeout(() => {
      document.querySelector('.app').lastElementChild.classList.add('slide-in');
    }, 100);
  };

  api.sendPost('/category/getCategorys', {}).then((result) => {
    this.setState({
      list: result.data,
    });
  });

  this.render = () => {
    let templateLiteral = `
            <div class="category slide">
                <div class="header-box"></div>
                <ul class="content">
                    ${this.state.list.reduce((acc, cur) => {
                      return (
                        acc +
                        `
                        <li class="category-${cur.idx}">
                            <div>
                                <img src='../images/dev/${cur.imgUrl}.svg'>
                            </div>
                            <div class="title">${cur.category}</div>
                        </li>
                        `
                      );
                    }, ``)}
                </ul>
            </div>
        `;
    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    // const $lis = document.querySelectorAll('.category li');
    // if ($lis.length) {
    //   $lis.forEach((item) => {
    //     item.addEventListener('click', (e) => {
    //       new CategoryDetail({
    //         parent: document.querySelector('.category .header-box'),
    //         content: '카테고리',
    //         eventHandler: (e) => {
    //           slideOut('/', false);
    //         },
    //       });
    //     });
    //   });
    // }

    new WithoutAction({
      parent: document.querySelector('.category .header-box'),
      content: '카테고리',
      eventHandler: (e) => {
        slideOut('/', false);
      },
    });
  };

  this.render();
}
