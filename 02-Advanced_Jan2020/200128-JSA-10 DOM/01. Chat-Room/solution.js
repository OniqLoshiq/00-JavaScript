function solve() {
   let btn = document.getElementsByTagName('button')[0];

   btn.addEventListener('click', e => {
      let msg = document.createElement('div');
      msg.classList.add('message', 'my-message');

      let input = document.getElementById('chat_input');

      msg.innerHTML = input.value;
      document.getElementById('chat_messages').appendChild(msg);

      input.value = "";
   });
}


