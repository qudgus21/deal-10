export default function textInput(props) { 
    
    this.state = {
    }

    
    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    
    this.render = () => {
        const { cls, parent, eventHandler } = this.props;

        let templateLiteral = `
            <input type='text' class='${cls}'></input>
        `;
        props.parent.innerHTML = templateLiteral;
     
        const $textInput = Array.from(props.parent.querySelectorAll(cls)).pop();
        $textInput.addEventListener('click', eventHandler);
    }   
    this.render();
}