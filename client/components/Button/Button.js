import { selectLatestElement } from '../../utils/helper';

export default function button(props) {
  //large-button(구현), medium-button(미구현)

  this.render = () => {
    const { cls, content, parent, eventHandler } = props;

    let templateLiteral = `
            <button class=${cls}>${content}</button>
        `;
    parent.innerHTML = templateLiteral;

    const $btn = selectLatestElement(parent, `.${cls}`);

    $btn.addEventListener('click', eventHandler);
  };
  this.render();
}
