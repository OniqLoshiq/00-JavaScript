function mySolution(){
    let $questionTextarea = document.querySelector('#inputSection textarea');
    let $usernameInput = document.querySelector("#inputSection input[type='username']");
    let $pedndingQuestions = document.querySelector('#pendingQuestions');
    let $openedQuestions = document.querySelector('#openQuestions');

    document.querySelector('#inputSection button').addEventListener('click', askQuestion);


    function askQuestion(){
        let username = $usernameInput.value ? $usernameInput.value : 'Anonymous';
        let question = $questionTextarea.value;
        
        let pendingDiv = createElement('div', 'pendingQuestion');
        let imgElem = createElement('img', null, null, [{name: 'src', value: './images/user.png'}, {name: 'width', value: 32}, {name: 'height', value: 32}]);
        let spanUsername = createElement('span', null, username);
        let pQuestion = createElement('p', null, question);

        let divActions = createElement('div', 'actions');
        let btnActionArchive = createElement('button', 'archive', 'Archive', null, {type: 'click', handler: archiveQuestion});
        let btnActionOpen = createElement('button', 'open', 'Open', null, {type: 'click', handler: openQuestion});

        appendChildrenToElement(divActions, [btnActionArchive, btnActionOpen]);
        appendChildrenToElement(pendingDiv, [imgElem, spanUsername, pQuestion, divActions]);

        appendChildrenToElement($pedndingQuestions, [pendingDiv]);
    }

    function archiveQuestion(e){
        let questionToRemove = e.target.parentNode.parentNode;
        questionToRemove.remove();
    }
    
    function openQuestion(e){
        let divQuestion = e.target.parentNode.parentNode;
        appendChildrenToElement($openedQuestions, [divQuestion]);

        divQuestion.className = 'openQuestion';

        let divActions = divQuestion.querySelector('div .actions');
        divActions.innerHTML = "";
        let btnActionReply = createElement('button', 'reply', 'Reply', null, {type: 'click', handler: replyQuestion});
        appendChildrenToElement(divActions, [btnActionReply]);

        let divReplySection = createElement('div', 'replySection', null, [{name: 'style', value: 'display: none;'}]);
        let inputReply = createElement('input', 'replyInput', null, [{name: 'type', value: 'text'}, {name: 'placeholder', value: 'Reply to this question here...'}]);
        let btnReply = createElement('button', 'replyButton', 'Send', null, {type: 'click', handler: sendReply});
        let listReplies = createElement('ol', 'reply', null, [{name: 'type', value: '1'}]);
        appendChildrenToElement(divReplySection, [inputReply,btnReply, listReplies]);

        appendChildrenToElement(divQuestion, [divReplySection]);
    }

    function replyQuestion(e){
        let btn = e.target;
        //let replySection = btn.parentNode.parentNode.querySelector('.replySection');
        let replySection = btn.parentNode.nextSibling;
        
        if(btn.textContent === 'Back'){
            btn.textContent = 'Reply';
            replySection.style.display = 'none';
        } else if(btn.textContent === 'Reply'){
            btn.textContent = 'Back';
            replySection.style.display = 'block';
        } 
    }

    function sendReply(e){
        let input = e.target.previousSibling;
        let olElement = e.target.nextSibling;

        let answerText = input.value;
        input.value = "";

        let liAnswerEl = createElement('li', null, answerText);
        appendChildrenToElement(olElement, [liAnswerEl]);
    }
    

    function createElement(htmlElement, className, textValue, attributes, event){
        let element = document.createElement(htmlElement);
        
        if(className){
            element.classList.add(className);
        }

        if(textValue){
            element.textContent = textValue;
        }

        if(attributes){
            attributes.forEach(att => element.setAttribute(att.name, att.value));
        }

        if(event){
            element.addEventListener(event.type, event.handler);
        }

        return element;
    }

    function appendChildrenToElement(parentElement, children){
        children.forEach(c => parentElement.appendChild(c));
    }
}