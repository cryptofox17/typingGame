const word = document.getElementById('word'); //h1
const text = document.getElementById('text'); //input
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const mainBox = document.getElementById('main-box');


//the words 

const words = ['jelly', 'dependent', 'eight', 'highfalutin', 'silver', 'drag'];

let randomWord; 

let score =0;

let time =10;

let difficulty = localStorage.getItem('difficulty') !== null? localStorage.getItem('difficulty') : 'medium';

difficultySelect.value = localStorage.getItem('difficulty') !== null? localStorage.getItem('difficulty') : 'medium';


//important 

text.focus();

//start counting

const timeInterval =setInterval(updateTime, 1000);

//generate random word from array
function getRandomWord()
{
    return words[Math.floor(Math.random() *words.length)];
}

function addWordToDOM() 
{
    randomWord= getRandomWord();
    word.innerHTML =randomWord;
}

addWordToDOM();

function updateScore()
{
    score++;
    scoreEl.innerHTML = score;
}


function updateTime()
{
    time--;
    timeEl.innerHTML = time + `s`;
    if (time ===0)
    {
        clearInterval(timeInterval);
        //end game 

        gameOver();
    }
}

function gameOver()
{
 endgameEl.innerHTML = 
 `
 <h1>Time's up!</h1>
 <p> Your final Score is ${score} </p>
 <br>
 <button onclick="location.reload()" class="btn" style ="text-align=center"> Play Again</button>
 `;

 endgameEl.style.display ='flex';
 mainBox.style.display ='none';

}
//event listener 

text.addEventListener('input', e =>
{
   const insertedText = e.target.value.toLowerCase();

   if (insertedText === randomWord)
   {
       addWordToDOM();
       updateScore();
       e.target.value ='';

       if (difficulty ==='hard')
       {
           time += 2;
       }
       else if (difficulty ==='medium')
       {
           time += 3;
       }
       else 
       {
           time += 5;
       }
       updateTime();
   }
});

//settings

settingsBtn.addEventListener('click', ()=> settings.classList.toggle('hide'));

settingsForm.addEventListener('change', e => {
difficulty =e.target.value;
localStorage.setItem('difficulty', difficulty);
});