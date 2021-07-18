export default function ImgButton(props) {
  this.state = {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { parent, imgNum, imgCnt, imageHandler, cancleHandler } = props;
    let templateLiteral = `
        <div class="image-input box-${imgNum}">
            <input type="file" accept="image/*" class="imageInput" id="product-image-${imgNum}">
            <label for="product-image-${imgNum}" class="image-button">
            <div class='img-list'>
                <div class='img-box'>
                    <div class='border-medium2   img-picker flex flex-column'>
                        <img class="image-preview" src='../../images/dev/image.svg'>
                        <div class="image-count">${imgCnt}/10</div>
                        <img class="cancle-btn none btn-${imgNum}" src='../../images/dev/cancle2.png'>
                    </div>
                </div>
            </div>
            </label>
            <img src="" class="image-previews "/>
        </div>
    `;

    parent.insertAdjacentHTML('beforeend', templateLiteral);

    const $imageInput = document.querySelector(
      `.newpost #product-image-${imgNum}`
    );

    const $cancleButton = document.querySelector(`.newpost .btn-${imgNum}`);

    $imageInput.addEventListener('change', imageHandler);
    $cancleButton.addEventListener('click', cancleHandler);
  };

  this.render();
}
