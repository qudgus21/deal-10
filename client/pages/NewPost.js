import { slideOut } from '../utils/slide';
import WithAction from '../components/Header/withAction';
import api from '../utils/api';

export default function NewPost(props) {
  this.state = {
    location: '역삼동',
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.submitHandler = () => {
    const nameValue = document.querySelector('.newpost input[name=title]')
      .value;
    const priceValue = document.querySelector('.newpost input[name=price]')
      .value;
    const descriptionValue = document.querySelector(
      '.newpost textarea[name=description]'
    ).value;
    const imageFile = document.querySelector('.newpost #imageInput').files[0];

    let formData = new FormData();
    formData.append('img', imageFile);
    formData.append('name', nameValue);
    formData.append('price', priceValue);
    formData.append('decription', descriptionValue);

    api.sendProduct('/product/newpost', formData).then((result) => {
      console.log(result);
    });
  };

  this.render = () => {
    let templateLiteral = `
            <div class='newpost slide'>
                <div class='header-box'></div>
                <form action='/newpost' method='post' class='newpost-image-form' encType="multipart/form-data">
                  <div class="image-input">
                    <input type="file" accept="image/*" id="imageInput">
                    <label for="imageInput" class="image-button">
                      <div class='img-list'>
                        <div class='img-box'>
                            <div class='border-medium2 img-picker flex flex-column'>
                                <img src='../../images/dev/image.svg'>
                                <div>0/10</div>
                            </div>
                        </div>
                      </div>
                    </label>
                    <img src="" class="image-preview">
                    <span class="change-image">Choose different image</span>
                  </div>
                </form>
                <form action='/newpost' method='post' class='newpost-form'>
                    <input type='text' class='newpost-input' name='title' placeholder='글 제목'/>
                    <input type='text' class='newpost-input' name='price' placeholder='₩ 가격(선택사항)'/>
                    <textarea rows="10" class='newpost-input' name='description' placeholder='게시글 내용을 작성해주세요.'></textarea>
                </form>
                <div class='location-bar'>
                    <img src='../../images/dev/location_black.svg'>
                    <div>${this.state.location}</div>
                </div>
            </div>
        `;
    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    //필요할지도 모르니 주석처리
    // const $imageInput = document.querySelector('.newpost #imageInput');
    // $imageInput.addEventListener('change', (e) => {
    //   const file = e.target.files;

    //   const reader = new FileReader();
    //   reader.readAsDataURL(file[0]);

    //   reader.onloadend = () => {
    //     // let fileData = {
    //     //   name: file[0].name,
    //     //   category: file[0].type,
    //     //   multipart_form_data: file[0],
    //     // };
    //   };

    //   // console.log(e);
    //   // const file = e.srcElement.files[0];

    //   // const reader = new FileReader();
    //   // reader.readAsDataURL(file);

    //   // reader.onload = function (data) {
    //   //   const filename = e.target.files[0].name;
    //   //   const fileData = reader.result;
    //   // };
    // });

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

    // $('#imageInput').on('change', function() {
    //   $input = $(this);
    //   if($input.val().length > 0) {
    //     fileReader = new FileReader();
    //     fileReader.onload = function (data) {
    //     $('.image-preview').attr('src', data.target.result);
    //     }
    //     fileReader.readAsDataURL($input.prop('files')[0]);
    //     $('.image-button').css('display', 'none');
    //     $('.image-preview').css('display', 'block');
    //     $('.change-image').css('display', 'block');
    //   }
    // });

    // $('.change-image').on('click', function() {
    //   $control = $(this);
    //   $('#imageInput').val('');
    //   $preview = $('.image-preview');
    //   $preview.attr('src', '');
    //   $preview.css('display', 'none');
    //   $control.css('display', 'none');
    //   $('.image-button').css('display', 'block');
    // });
  };

  this.render();
}
