import { selectLatestElement } from '../../utils/helper';

export default function WithoutAction(props) {
  this.state = {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { content, parent, eventHandler } = props;

    const templateLiteral = `
            <div class='header'>
              <img class='back-button' src='../../images/dev/arrow_back.svg'/>
              <h1>${content}</h1>
              <img src='../../images/dev/none2.svg'/>
            </div>
        `;

    props.parent.innerHTML = templateLiteral;

    const $btn = selectLatestElement(parent, '.back-button');

    $btn.addEventListener('click', eventHandler);
  };

  this.render();
}
