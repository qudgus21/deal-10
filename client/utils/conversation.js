import io from 'socket.io-client';
import api from '../utils/api';

const makeEmitData = (chat) => {
  return {
    roomIdx: chat.roomIdx,
    myIdx: chat.myType === 'S' ? chat.saler : chat.customer,
    opponentIdx: chat.opponentIdx,
    myType: chat.myType,
  };
};

export default function conversatsion(chat) {
  const socket = io.connect('http://localhost:3000');

  socket.on('connect', function () {
    socket.emit('newUserChatInfo', makeEmitData(chat));
  });

  socket.on('update', function (data) {
    console.log(data);
    const $msgContainer = document.querySelector('.chatdetail .msg-container');
    const mesage = `<div class='msg-left'><div class='msg-receive'>${data}</div></div>`;
    $msgContainer.insertAdjacentHTML('beforeend', mesage);
  });

  const send = (data) => {
    socket.emit('message', { type: 'message', data });
  };

  const afterChat = (value) => {
    const $msgContainer = document.querySelector('.chatdetail .msg-container');
    const mesage = `<div class='msg-right'><div class='msg-send'>${value}</div></div>`;
    $msgContainer.insertAdjacentHTML('beforeend', mesage);
    document.querySelector('.chatdetail .chat-input').value = ' ';
  };

  const imgSubmitHandler = () => {
    const value = document.querySelector('.chatdetail .chat-input').value;
    if (value) {
      api
        .sendPost('/chat/chattingContent', {
          ...chat,
          content: value,
        })
        .then((result) => {
          afterChat(value);
          send({
            ...chat,
            content: value,
          });
        });
    }
  };

  document
    .querySelector('.chatdetail .send-msg-button img')
    .addEventListener('click', imgSubmitHandler);
}
