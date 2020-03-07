function lockedProfile() {
    const $btns = document.querySelectorAll('.profile > button');
    
    [...$btns].forEach(b => b.addEventListener('click', e => {
        const $profile = b.parentNode;
        const $lockInput = $profile.querySelector("input[value='lock']");
        const $hiddenInfo = b.previousElementSibling;

        if(!$lockInput.checked && b.textContent === 'Show more'){
            b.textContent = 'Hide it';
            $hiddenInfo.style.display = 'block';
        } else if (!$lockInput.checked){
            $hiddenInfo.style.display = 'none';
            b.textContent = 'Show more';
        }
    }));
}