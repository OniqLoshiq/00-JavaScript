function solve() {
  let rightAnswers = ['onclick', 'JSON.stringify()', 'A programming API for HTML and XML documents'];
  let numberRightAnswers = 0;
  let counter = 0;

  let el = document.getElementById('quizzie');
  let sections = Array.from(el.children).filter(c => c.tagName === 'SECTION');

  let handler = (e) => {
    if (e.target.className === 'answer-text') {
      let answer = e.target.innerHTML;
      if(rightAnswers.includes(answer)){
        numberRightAnswers++;
      }
      
      sections[counter++].style.display = 'none';

      if(counter < sections.length){
        sections[counter].style.display = 'block';
      } else {
        el.removeEventListener('click', handler);
        let result = numberRightAnswers === sections.length ? 'You are recognized as top JavaScript fan!' : `You have ${numberRightAnswers} right answers`;
        document.querySelector('#results').style.display = 'block';
        document.querySelector('.results-inner h1').innerHTML = result;
      }
    }
  }

  el.addEventListener('click', handler);
}
