export default function ChatListItem(props) {
  this.state = {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const {
      productId,
      roomId,
      opponent,
      currentMessage,
      unreadCnt,
      imgUrls,
      updatetime,
    } = props.chat;

    let templateLiteral = `
        <div class='chatlist-item'>
            <div class='chat-div'>
                <div class='chat-row'>
                    <div class='chat-id'>username</div>
                    <div class='chat-agoTime'>12분 전</div>
                </div>
                <div class='chat-row'>
                    <div class='chat-preview'>혹시 팔렷나요?</div>
                    <div class='chat-badge'>5</div>
                </div>
            </div>
            <div class='img-box'>
                <img src='https://deal10.s3.ap-northeast-2.amazonaws.com/products/7148d9b7d668a408db9e09aa5b669d55' class='border-small'>
            </div>
        </div>
    `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);

    // const $chatListItem = selectLatestElement(
    //   document.querySelector('.chatlist-container'),
    //   '.chatlist-item'
    // );
    // $chatListItem.addEventListener('click', props.eventHandler);
  };

  this.render();
}
