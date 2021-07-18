import { selectLatestElement } from '../../utils/helper';

export default function WithAction(props) {
  this.state = {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { content, parent, src1, src2, eventHandler1, eventHandler2 } = props;

    const templateLiteral = `
    <div class='header with-action'>
      <img class='back-button' src='../../images/dev/${src1}.svg'/>
      <h1>${content}</h1>
      <img class='done-button' src='../../images/dev/${src2}.svg'/>
    </div>
        `;

    props.parent.innerHTML = templateLiteral;

    const $backBtn = selectLatestElement(parent, '.back-button');
    const $doneBtn = selectLatestElement(parent, '.done-button');

    $backBtn.addEventListener('click', eventHandler1);
    $doneBtn.addEventListener('click', eventHandler2);
  };

  this.render();
}
