import { selectLatestElement } from '../../utils/helper';

export default function TextInput(props) {
  this.render = () => {
    const { parent, eventHandler, label, placeholder } = props;

    let templateLiteral = `
            <div class="text-input">
                ${label ? `<label>${label}</label>` : ``}
                <input placeholder='${placeholder}' type='text' class='text-input' />
            </div>
            `;
    parent.innerHTML = templateLiteral;

    const $input = selectLatestElement(parent, '.text-input');

    $input.addEventListener('keyup', eventHandler);
  };

  this.render();
}
