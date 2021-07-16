import { slideOut } from '../utils/slide';
import WithAction from '../components/Header/withAction';

export default function NewPost(props) {
  this.state = {
    location: '역삼동',
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    let templateLiteral = `
            <div class='newpost slide'>
                <div class='header-box'></div>
                <form action='/newpost' method='post' class='newpost-form'>
                    <div class='img-list'>
                        <div class='img-box'>
                            <div class='border-medium2 img-picker flex flex-column'>
                                <img src='../../images/dev/image.svg'>
                                <div>0/10</div>
                            </div>
                        </div>
                    </div>
                    <input type='text' class='newpost-input' name='title' placeholder='글 제목'/>
                    <input type='text' class='newpost-input' name='price' placeholder='₩ 가격(선택사항)'/>
                    <input type='text' class='newpost-input' name='description' placeholder='게시글 내용을 작성해주세요.'/>
                </form>
                <div class='location-bar'>
                    <img src='../../images/dev/location_black.svg'>
                    <div>${this.state.location}</div>
                </div>
            </div>
        `;
    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    new WithAction({
      parent: document.querySelector('.newpost .header-box'),
      content: '글쓰기',
      eventHandler: (e) => {
        slideOut('/', false);
      },
    });
  };

  this.render();
}
