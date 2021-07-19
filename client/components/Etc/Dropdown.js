export default function Dropdown(props) {
  this.render = () => {
    const { data, parent, cls } = props;
    //props.data는 다음과 같은 형태로 전달
    // [
    //     { text: '수정하기', eventHandler1: this.modify },
    //     { text: '삭제하기', eventHandler2: this.delete },
    //   ];

    let templateLiteral = `
            <div class="dropdown ${cls}">
                <div class="btn1 drop-btn">${data[0].text}</div>
                <div class="btn2 drop-btn">${data[1].text}</div>
            </div>
        `;

    parent.insertAdjacentHTML('beforeend', templateLiteral);

    const $btn1 = parent.querySelector('.btn1');
    const $btn2 = parent.querySelector('.btn2');

    $btn1.addEventListener('click', data[0].eventHandler);
    $btn2.addEventListener('click', data[1].eventHandler);

    if ($btn2.textContent === '삭제하기') $btn2.classList.add('red');
  };
  this.render();
}
