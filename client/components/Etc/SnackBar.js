export default function Snackbar(props) {
  this.render = () => {
    const { msg, duration } = props;

    let templateLiteral = `
              <div class='snackbar'>
                  <div class='snackbar-msg'>${msg}</div>
              </div>
          `;

    document.body.insertAdjacentHTML('beforeend', templateLiteral);

    const $snackbar = document.querySelector('.snackbar');

    setTimeout(() => {
      $snackbar.classList.add('show-snackbar');
    }, 0);

    setTimeout(() => {
      $snackbar.classList.remove('show-snackbar');
      setTimeout(() => {
        $snackbar.remove();
      }, 200);
    }, duration);
  };
  this.render();
}
