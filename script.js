const RANDOM_QUATE_API_URL='http://api.quotable.io/random';
const quote_text=document.getElementById('quote-text');
const quote_input=document.getElementById('quote-input');
const timer=document.getElementById('timer');

let timerStartFlag=0;

quote_input.addEventListener('input', ()=>{
    timerStartFlag++;
    if(timerStartFlag==1)startTimer();
    const arrayText=quote_text.querySelectorAll('span');
    const arrayInput=quote_input.value.split('');
    let correct=true;
    arrayText.forEach((charecterSpan, index)=>{
        const charecter=arrayInput[index];
        if(charecter==null){
            charecterSpan.classList.remove('correct');
            charecterSpan.classList.remove('incorrect');
            correct=false;
        }
        else if(charecter===charecterSpan.innerText){
            charecterSpan.classList.add('correct');
            charecterSpan.classList.remove('incorrect');
        }
        else{
            charecterSpan.classList.add('incorrect');
            charecterSpan.classList.remove('correct');
            correct=false;
        }
    })
    if(correct){
        renderQuate();
    }
})
function getQuate(){
    return fetch(RANDOM_QUATE_API_URL)
        .then(res=>res.json())
        .then(data=>data.content)
}

async function renderQuate(){
    timerStartFlag=0;
    const quote=await getQuate();
    quote_text.innerHTML='';
    quote.split('').forEach(charecter=>{
        const charSpan=document.createElement('span');
        charSpan.innerText=charecter;
        quote_text.appendChild(charSpan);
    })
    quote_input.value=null;
    timer.innerText=0;
}

let startTime;
function startTimer(){
    timer.innerText=0;
    startTime=new Date;
    setInterval(()=>{
        timer.innerText=getTime()
    }, 1000)

}
function getTime(){
    return Math.floor((new Date-startTime)/1000);
}
renderQuate();