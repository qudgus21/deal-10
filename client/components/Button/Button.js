export default function button(props) { 
    
    this.state = {
    }

    
    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    
    this.render = () => {
        const { cls, content, parent, eventHandler } = this.props;

        let templateLiteral = `
            <input type='button' class='${cls}'>${content}</input>
        `;
        props.parent.innerHTML = templateLiteral;
     
        const $btn = Array.from(props.parent.querySelectorAll(cls)).pop();
        $btn.addEventListener('click', eventHandler);
    }
    this.render();
}