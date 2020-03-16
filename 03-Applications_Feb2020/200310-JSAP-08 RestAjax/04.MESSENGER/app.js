function attachEvents() {
    let $submit = document.querySelector('#submit');
    let $refresh = document.querySelector('#refresh');
    let $name = document.querySelector('#author');
    let $message = document.querySelector('#content');
    let $messageLog = document.querySelector('#messages');

    $submit.addEventListener('click', addMessage);
    $refresh.addEventListener('click', refreshMessages);

    function addMessage(){
        if(!$name.value.trim()){
            return alert('Please enter a name!')
        }

        if(!$message.value.trim()){
            return alert('Cannot send empty message!');
        }

        fetch(`https://jsex-a9160.firebaseio.com/messanger.json`, {
            method: 'post',
            body: JSON.stringify({name: $name.value, content: $message.value})
        })
        .then(() => {
            $message.value = ''
        })
        .catch(() => {
            alert('Something went wrong!')
        })
    }

    function refreshMessages(){
        $name.value = '';
        $message.value = '';
        fetch(`https://jsex-a9160.firebaseio.com/messanger.json`)
        .then(res => res.json())
        .then(data => {
          let allMsgs = Object.values(data).map(({name, content}) => `${name}: ${content}`).join('\n');
          $messageLog.value = allMsgs;
        })
        .catch(() => {
            $messageLog.value = 'No messages yet...'
        })
    }
}

attachEvents();