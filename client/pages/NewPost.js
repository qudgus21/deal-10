import { slideOut } from '../utils/slide';
import { isLogin } from '../utils/helper';
import WithAction from '../components/Header/withAction';
import api from '../utils/api';
import ImgButton from '../components/Etc/ImgButton';

export default function NewPost(props) {
  this.state = {
    location: null,
    categorys: null,
    imgNum: 0, //늘림
    imgCnt: 0,
    selectedCategory: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.componentDidMount = () => {
    isLogin();

    api.sendPost('/user/getInfo', {}).then((result) => {
      document.querySelector('.app').lastElementChild.remove();
      this.setState({
        ...this.state,
        location: result.data.location[0],
      });
      setTimeout(() => {
        document
          .querySelector('.app')
          .lastElementChild.classList.add('slide-in');
      }, 50);
    });

    api.sendPost('/category/getCategorys', {}).then((result) => {
      document.querySelector('.app').lastElementChild.remove();
      this.setState({
        ...this.state,
        categorys: result.data,
      });
      setTimeout(() => {
        document
          .querySelector('.app')
          .lastElementChild.classList.add('slide-in');
      }, 50);
    });
  };

  this.validationCheck = () => {
    const nameValue = document.querySelector('.newpost input[name=title]')
      .value;
    const priceValue = document.querySelector('.newpost input[name=price]')
      .value;
    const descriptionValue = document.querySelector(
      '.newpost textarea[name=description]'
    ).value;

    const $imageInputs = document.querySelectorAll('.newpost .imageInput');

    let message = ``;
    if ($imageInputs.length === 1) {
      message = '한 장 이상의 이미지를 등록해주세요';
    } else if (!nameValue) {
      message = '제목을 입력해 주세요';
    } else if (!this.state.selectedCategory) {
      message = '카테고리를 선택해 주세요';
    } else if (isNaN(Number(priceValue))) {
      message = '가격은 숫자만 입력해 주세요';
    } else if (!descriptionValue) {
      message = '설명을 입력해 주세요';
    } else {
      message = 'ok';
    }
    const $completeButton = document.querySelector('.newpost .done-button');
    if (message === 'ok') {
      $completeButton.classList.add('complete');
    } else {
      $completeButton.classList.remove('complete');
    }
    return message;
  };

  this.submitHandler = () => {
    const nameValue = document.querySelector('.newpost input[name=title]')
      .value;
    const priceValue = document.querySelector('.newpost input[name=price]')
      .value;
    const descriptionValue = document.querySelector(
      '.newpost textarea[name=description]'
    ).value;

    const $imageInputs = document.querySelectorAll('.newpost .imageInput');

    const uploadValid = this.validationCheck();

    if (uploadValid === 'ok') {
      let formData = new FormData();
      for (let i = 0; i < $imageInputs.length; i++) {
        if (i !== $imageInputs.length - 1)
          formData.append('img', $imageInputs[i].files[0]);
      }
      formData.append('title', nameValue);
      formData.append('price', priceValue);
      formData.append('description', descriptionValue);
      formData.append('category', this.state.selectedCategory);
      api.sendProduct('/product/newpost', formData).then((result) => {
        if (result.status === 'ok') {
          alert('상품이 등록되었습니다');
          slideOut('/', false);
          return;
        }
      });
    } else {
      alert(uploadValid);
      return;
    }
  };

  this.addNewimgBox = () => {
    this.state.imgNum += 1;
    this.state.imgCnt += 1;

    new ImgButton({
      parent: document.querySelector('.newpost .newpost-image-form'),
      imgNum: this.state.imgNum,
      imgCnt: this.state.imgCnt,
      imageHandler: this.imageInputHandler,
      cancleHandler: this.imageCancleHandler,
    });
  };

  this.imageInputHandler = (e) => {
    const $form = e.target.parentNode.parentNode;
    const $targetBox = e.target.parentNode;
    const file = e.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onloadend = (data) => {
      $targetBox.querySelector('input').disabled = true;
      $targetBox.querySelector('.image-preview').src = data.target.result;
      $targetBox.querySelector('.image-preview').classList.add('isIn');
      $targetBox.querySelector('.image-count').classList.add('none');
      $targetBox.querySelector('.border-medium2').classList.add('upload');
      $targetBox.querySelector('.cancle-btn').classList.remove('none');
      this.addNewimgBox();
      this.validationCheck();
    };
  };

  this.imageCancleHandler = (e) => {
    const targetNum = Array.from(e.target.classList).pop().split('-')[1];
    const $target = document.querySelector(`.newpost .box-${targetNum}`);
    this.state.imgCnt -= 1;

    Array.from(
      document.querySelectorAll('.newpost .newpost-image-form .image-count')
    ).pop().textContent = `${this.state.imgCnt}/10`;

    $target.remove();
  };

  this.categorySelectHandler = (e) => {
    const $categorys = document.querySelectorAll('.newpost ul .category-item');
    $categorys.forEach((node) => {
      node.classList.remove('selected');
    });
    e.target.classList.add('selected');
    this.state.selectedCategory = e.target.textContent.trim();
    this.validationCheck();
  };

  this.render = () => {
    let templateLiteral = `
            <div class='newpost slide'>
                <div class='header-box'></div>
                <form action='/newpost' method='post' class='newpost-image-form' encType="multipart/form-data">
                </form>
                <form action='/newpost' method='post' class='newpost-form'>
                    <input type='text' class='newpost-input' name='title' placeholder='글 제목'/>
                    <div class="category-title">(필수)카테고리를 선택해 주세요.</div>
                    <div class="select-category">
                        <ul>
                          ${
                            this.state.categorys
                              ? `
                          ${this.state.categorys.reduce((acc, cur) => {
                            return (
                              acc +
                              `
                              <li class="category-item category-${cur.idx}">
                                ${cur.name}
                              </li>
                              `
                            );
                          }, ``)}
                          `
                              : ``
                          }          
                        </ul>
                    </div>
                    <input type='text' class='newpost-input' name='price' placeholder='₩ 가격(선택사항)'/>
                    <textarea rows="4" class='newpost-input' name='description' placeholder='게시글 내용을 작성해주세요.'></textarea>
                </form>
                <div class='location-bar'>
                    <img src='../../images/dev/location_black.svg'>
                    <div>${this.state.location}</div>
                </div>
            </div>
        `;
    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    const $categorys = document.querySelectorAll('.newpost ul .category-item');

    if ($categorys.length) {
      $categorys.forEach((node) => {
        node.addEventListener('click', this.categorySelectHandler);
      });
    }

    document.querySelectorAll('.newpost .newpost-input').forEach((input) => {
      input.addEventListener('keyup', this.validationCheck);
    });

    new WithAction({
      parent: document.querySelector('.newpost .header-box'),
      content: '글쓰기',
      src1: 'arrow_back',
      src2: 'done',
      eventHandler1: () => {
        slideOut('/', false);
      },
      eventHandler2: this.submitHandler,
    });

    new ImgButton({
      parent: document.querySelector('.newpost .newpost-image-form'),
      imgNum: this.state.imgNum,
      imgCnt: this.state.imgCnt,
      imageHandler: this.imageInputHandler,
      cancleHandler: this.imageCancleHandler,
    });
  };

  this.componentDidMount();
  this.render();
}
