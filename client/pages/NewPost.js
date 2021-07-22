import { slideOut } from '../utils/slide';
import { isLogin, numberWithCommas } from '../utils/helper';
import WithAction from '../components/Header/withAction';
import api from '../utils/api';
import ImgButton from '../components/Etc/ImgButton';
import Snackbar from '../components/Etc/SnackBar';

export default function NewPost(props) {
  this.state = {
    location: null,
    categorys: null,
    imgNum: 0,
    imgCnt: 0,
    selectedCategory: null,
    product: null,
    mode: null,
    removeImgList: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.getUser = () => {
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
  };

  this.getCategory = () => {
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

  this.getProductData = (productIdx) => {
    api.sendPost('/product/productDetail', { productIdx }).then((result) => {
      document.querySelector('.app').lastElementChild.remove();
      this.setState({
        product: result.data.product,
        categorys: result.data.categorys,
        mode: 'u',
        location: result.data.user.location,
        imgNum: result.data.product.imgUrls.length,
        imgCnt: result.data.product.imgUrls.length,
        removeImgList: [],
      });
      setTimeout(() => {
        document
          .querySelector('.app')
          .lastElementChild.classList.add('slide-in');
      }, 50);
    });
  };

  this.componentDidMount = () => {
    isLogin();

    this.getUser();
    this.getCategory();

    setTimeout(() => {
      const lastPath = window.location.pathname.split('/').pop();
      if (lastPath !== 'newpost') {
        this.getProductData(lastPath);
      }
    }, 0);
  };

  this.validationCheck = () => {
    const nameValue = document.querySelector(
      '.newpost input[name=title]'
    ).value;
    const priceValue = document.querySelector(
      '.newpost input[name=price]'
    ).value;
    const descriptionValue = document.querySelector(
      '.newpost textarea[name=description]'
    ).value;

    const $imageInputs = document.querySelectorAll('.newpost .imageInput');

    let message = ``;
    if ($imageInputs.length === 1) {
      message = '이미지를 등록하세요';
    } else if (!nameValue) {
      message = '제목을 입력하세요';
    } else if (!this.state.selectedCategory) {
      message = '카테고리를 선택하세요';
    } else if (isNaN(Number(priceValue))) {
      message = '가격은 숫자만 입력가능';
    } else if (!descriptionValue) {
      message = '설명을 입력하세요';
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

  this.updatePost = (nameValue, priceValue, descriptionValue, $imageInputs) => {
    let formData = new FormData();
    let uploadedCheck;
    for (let i = 0; i < $imageInputs.length; i++) {
      if (i !== $imageInputs.length - 1) {
        uploadedCheck = Array.from(
          $imageInputs[i].parentNode.classList
        ).includes('isuploaded');
        if (!uploadedCheck) {
          formData.append('img', $imageInputs[i].files[0]);
        }
      }
    }

    formData.append('productIdx', this.state.product.productIdx);
    formData.append('title', nameValue);
    formData.append('price', priceValue);
    formData.append('description', descriptionValue);
    formData.append('category', this.state.selectedCategory);
    formData.append('cancleList', JSON.stringify(this.state.removeImgList));
    api.sendProduct('/product/update', formData).then((result) => {
      if (result.status === 'ok') {
        new Snackbar({ msg: '수정되었습니다', duration: 1000 });
        setTimeout(() => {
          window.location.href = '/';
        }, 300);
        return;
      }
    });
  };

  this.insertPost = (nameValue, priceValue, descriptionValue, $imageInputs) => {
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
        new Snackbar({ msg: '등록되었습니다', duration: 1000 });
        setTimeout(() => {
          window.location.href = '/';
        }, 300);
        return;
      }
    });
  };

  this.submitHandler = () => {
    const nameValue = document.querySelector(
      '.newpost input[name=title]'
    ).value;
    const priceValue = document.querySelector(
      '.newpost input[name=price]'
    ).value;
    const descriptionValue = document.querySelector(
      '.newpost textarea[name=description]'
    ).value;
    const $imageInputs = document.querySelectorAll('.newpost .imageInput');
    const uploadValid = this.validationCheck();
    if (uploadValid === 'ok') {
      if (this.state.mode === 'u') {
        this.updatePost(nameValue, priceValue, descriptionValue, $imageInputs);
      } else {
        this.insertPost(nameValue, priceValue, descriptionValue, $imageInputs);
      }
    } else {
      new Snackbar({ msg: uploadValid, duration: 1000 });
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

    this.imageBoxAlign();
  };

  this.imageCancleHandler = (e) => {
    const targetNum = Array.from(e.target.classList).pop().split('-')[1];
    const $target = document.querySelector(`.newpost .box-${targetNum}`);
    this.state.imgCnt -= 1;

    Array.from(
      document.querySelectorAll('.newpost .newpost-image-form .image-count')
    ).pop().textContent = `${this.state.imgCnt}/10`;

    if (this.state.mode === 'u') {
      if (Array.from($target.classList).includes('isuploaded')) {
        this.state.removeImgList.push(
          $target.querySelector('.image-preview').src
        );
      }
    }
    $target.remove();
    this.validationCheck();
    this.imageBoxAlign();
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

  this.categoryFetch = () => {
    const targetCategory = this.state.product.category;
    document.querySelectorAll('.newpost ul .category-item').forEach((item) => {
      if (item.textContent.trim() === targetCategory) {
        item.classList.add('selected');
        this.state.selectedCategory = item.textContent.trim();
        this.validationCheck();
      }
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

  this.imgFetch = () => {
    const imgUrls = this.state.product.imgUrls;
    for (let i = 0; i < this.state.imgNum + 1; i++) {
      new ImgButton({
        parent: document.querySelector('.newpost .newpost-image-form'),
        imgNum: i,
        imgCnt: this.state.imgCnt,
        imageHandler: this.imageInputHandler,
        cancleHandler: this.imageCancleHandler,
        isuploaded: i !== this.state.imgNum ? true : false,
      });

      if (i !== this.state.imgNum) {
        const $targetBox = document.querySelector(
          `.newpost .newpost-image-form .image-input.box-${i}`
        );
        $targetBox.querySelector('input').disabled = true;
        $targetBox.querySelector('.image-preview').src = imgUrls[i];
        $targetBox.querySelector('.image-preview').classList.add('isIn');
        $targetBox.querySelector('.image-count').classList.add('none');
        $targetBox.querySelector('.border-medium2').classList.add('upload');
        $targetBox.querySelector('.cancle-btn').classList.remove('none');
      }
      this.imageBoxAlign();
    }
  };

  this.updateMode = () => {
    this.categoryFetch();
    this.imgFetch();
  };

  this.imageBoxAlign = () => {
    const $imageForm = document.querySelector('.newpost-image-form');
    if ($imageForm.children.length == 1) {
      $imageForm.classList.remove('one-image');
      $imageForm.classList.add('no-image');
    } else if ($imageForm.children.length == 2) {
      $imageForm.classList.remove('no-image');
      $imageForm.classList.add('one-image');
    } else {
      $imageForm.classList.remove('one-image');
    }
    $imageForm.scrollTo(-$imageForm.scrollWidth, 0);
  };

  this.render = () => {
    const { product, mode } = this.state;
    let templateLiteral = `
            <div class='newpost slide'>
                <div class='header-box'></div>
                <form action='/newpost' method='post' class='newpost-image-form no-image' encType="multipart/form-data">
                </form>
                <form action='/newpost' method='post' class='newpost-form'>
                    <input type='text' class='newpost-input' name='title' placeholder='글 제목' ${
                      product ? `value='${product.title}'` : ``
                    }/>
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
                    <input type='text' class='newpost-input' name='price' placeholder='가격(선택사항)' ${
                      product
                        ? `value='${
                            product !== null && product.price !== null
                              ? `${product.price}`
                              : ``
                          }'`
                        : ``
                    }/>
                    <textarea rows="4" class='newpost-input' name='description' placeholder='게시글 내용을 작성해주세요.'>${
                      product ? `${product.description}` : ``
                    }</textarea>
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
      content: `${mode === 'u' ? `글수정` : `글쓰기`}`,
      src1: 'arrow_back',
      src2: 'done',
      eventHandler1: () => {
        if (this.state.product) {
          slideOut(`/product/${this.state.product.productIdx}`);
        } else {
          slideOut('/', false);
        }
      },
      eventHandler2: this.submitHandler,
    });

    if (mode === 'u') {
      this.updateMode();
    } else {
      new ImgButton({
        parent: document.querySelector('.newpost .newpost-image-form'),
        imgNum: this.state.imgNum,
        imgCnt: this.state.imgCnt,
        imageHandler: this.imageInputHandler,
        cancleHandler: this.imageCancleHandler,
        isuploaded: false,
      });
    }
  };

  this.componentDidMount();
  this.render();
}
