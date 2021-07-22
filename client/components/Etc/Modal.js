export default function Modal(props) {
  this.state = {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { parent, title, msg, confirmEventHandler } = props;

    let templateLiteral = `
    <div class='modal'>
      <div class='modal-box'>
        <div class='modal-title'>${title}</div>
        <div class='modal-msg'>${msg}</div>
        <div class='modal-bottom-bar'>
          <button class='modal-cancel'>취소</button>
          <button class='modal-confirm'>확인</button>
        </div>
      </div>
    </div>`;

    parent.insertAdjacentHTML('beforeend', templateLiteral);

    const $modalCancel = document.querySelector('.modal-cancel');
    const $modalConfirm = document.querySelector('.modal-confirm');

    const $dropdown = document.querySelector('.dropdown');
    if ($dropdown != null) {
      $dropdown.remove();
    }

    $modalCancel.addEventListener('click', () => {
      document.querySelector('.modal').remove();
    });

    $modalConfirm.addEventListener('click', confirmEventHandler);
  };

  this.render();
}
