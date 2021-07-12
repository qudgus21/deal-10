export default function comp() { 
    console.log('test')

    const $input = document.querySelector('input').addEventListener('click', () => { 
        console.log('click')
    })
}