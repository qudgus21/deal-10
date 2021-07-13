export default function comp(props) { 
    
    this.state = {
        message: '상품'
    }


    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }


    this.render = () => {
        const { message } = this.state;

        let templateLiteral = `
            <div class="msg">${message}</div>
        `;

        props.parent.innerHTML = templateLiteral;
    

        this.messageClickHandler = (e) => {
            this.setState({
                ...this.state,
                message: props.message
            });
            // props.testfunction('sfsfs')
        }

        const $msgBtn = Array.from(props.parent.querySelectorAll('.msg')).pop();
        $msgBtn.addEventListener('click', this.messageClickHandler);
    }   
    
    this.render();
}