import { selectLatestElement } from '../../utils/helper';

export default function WithAction(props) {
  this.state = {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { content, parent, eventHandler } = props;

    const templateLiteral = `
    <div class='header with-action'>
      <img class='back-button' src='../../images/dev/arrow_back.svg'/>
      <h1>${content}</h1>
      <img class='done-button' src='../../images/dev/done.svg'/>
    </div>
        `;

    props.parent.innerHTML = templateLiteral;

    const $backBtn = selectLatestElement(parent, '.back-button');
    const $doneBtn = selectLatestElement(parent, '.done-button');

    $backBtn.addEventListener('click', eventHandler);
    $doneBtn.addEventListener('click', () => {
      document.forms['newpost-form'].submit();
    });
  };

  this.render();
}
