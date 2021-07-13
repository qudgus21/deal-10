cimport comp from '../components/compotest.js'
import api from '../../utils/api.js'
import { LoaderTargetPlugin } from 'webpack';

export default function pagetest(props) { 

    this.state = {
        productList : [],
    }


    this.setState = (nextState) => { 
        this.state = nextState;
        this.render();
    }


    this.complete = (text) => { 
        this.setState({
            messsage: text
        })
    }


    this.render = () => {
        let templateLiteral = `
            <div class="pagetest">
                <div class="msg-container">
                    
                </div>
                <div class="second"></div>
                <div class="third"></div>
                <button class="btn">유저1번 검색입니다</button>
            </div>
        `;

        props.parent.innerHTML = templateLiteral;
        

        Array.from(props.parent.querySelectorAll('.btn')).pop().addEventListener('click', () => {
            const params = {
                userIdx : '1'
            }

            api.sendPost('/user/register', params).then(result => { 
                if (result.status = 'ok') {
                    this.setState({
                        
                    })
                }









                window.history.pushState('v1', '', '/page1');
                
                
                if ('/login') {
                    new login({parent: document.querySelector("")})
                }
            })
        })

        // this.state.productList.map(function(msg) {
        //     new comp({ parent: document.querySelector('.msg-container'), message: msg });
        // });
        // new comp({ parent: document.querySelector('.second'), message: '두번째', testfunction : this.complete});
        // new comp({ parent: document.querySelector('.third'), message: '세번째' });
        
        
    }  
    
    this.render();
}