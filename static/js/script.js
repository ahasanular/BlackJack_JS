
//challenge 01
function ageInDays(){
    let birthYear = prompt('What is your Birth Year?');
    let ageInDayss = (2021 - birthYear) * 365;
    let h1 = document.createElement('h1');
    let textAnswere = document.createTextNode('You are ' + ageInDayss + ' days old');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswere);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
}


//challenge 02
function generateCat() {
    let img = document.createElement('img');
    //let div = document.getElementById('flex-cat-gen');
    img.src = "static/images/cat.gif"
    document.getElementById('flex-cat-gen').appendChild(img);
}


//challenge 03
function rpsGame(yourChoice) {
    console.log('You : ' + yourChoice.id);
    let humanChoice,  botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    console.log('Computer : ' + botChoice);
    let result = decideWinner(humanChoice, botChoice);
    console.log('Result : ' + result);
    let messege = finalMessege(result); // {messege : You won, color: green}
    console.log(messege);
    rpsFrontEnd(yourChoice.id, botChoice, messege);

}

function randToRpsInt() {
    return Math.floor(Math.random() *3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissor'][number];
}

function decideWinner(yourChoice, computerChoice) {
    let rpsDatabase = {
        'rock': {'scissor': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissor': 0},
        'scissor': {'paper': 1, 'scissor': 0.5, 'rock': 0},
    }

    let yourScore = rpsDatabase[yourChoice][computerChoice]
    let computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

function finalMessege([yourScore, computerScore]) {
    if(yourScore === 0) {
        return {'messege' : 'You lost!', 'color': 'red'};
    }
    else if(yourScore === 0.5) {
        return {'messege' : 'You tied!', 'color': 'yellow'};
    }
    else {
        return {'messege' : 'You won!', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageachoice, finalMessege) {
    let imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src,
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    let humanDiv = document.createElement('div');
    let botDiv = document.createElement('div');
    let messegeDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "'style='box-shadow: 0px 10px 50px rgba(51, 122, 183, 1);'>";
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);


    messegeDiv.innerHTML = "<h1 style= 'font-size: 60px; padding : 30px; color:" + finalMessege.color + ";'>" + finalMessege.messege + "</h1>";
    document.getElementById('flex-box-rps-div').appendChild(messegeDiv);


    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageachoice] + "'style='box-shadow: 0px 10px 50px rgba(255, 99, 71, 1);'>";
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

}



//Challange 4: Change the Color of All Button

let all_buttons = document.getElementsByTagName('button');
    console.log(all_buttons);

let copyAllButtons = [];
for(let i = 0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}
console.log(copyAllButtons);

function butonColorChange(buttonChoice) {

    if(buttonChoice.value === 'reset') {
        rsetButtonColor(all_buttons, copyAllButtons);
    }
    else if(buttonChoice.value === 'random') {
        changeButtonColorRandomly(all_buttons);
    }
    else {
        changeButtonColor(all_buttons, buttonChoice);
    }

    //console.log(buttonChoice.value);
}


function changeButtonColor(all_buttons, buttonChoice) {
    let btnDatabase = {
        'red': 'btn-danger',
        'green': 'btn-success',
        'blue': 'btn-primary',
        'yellow': 'btn-warning'
    }

    //console.log(all_buttons[0].classList);

    for(i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(btnDatabase[buttonChoice.value]);
    }
}

function rsetButtonColor(all_buttons, copyofButtons) {
    for(let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}


function changeButtonColorRandomly(all_buttons) {
    let colorClass = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];
    //console.log(randomBtnColor);

    for(let i = 0; i < all_buttons.length; i++) {
        //console.log(randomBtnColor[i]);
        //console.log(all_buttons[i]);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(colorClass[Math.floor(Math.random() * 4)]);
    }
}



//Challange 5 : BlackJack
let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'Q':10, 'J': 10, 'A': [1, 11]},
    'win': 0,
    'loss': 0,
    'draw': 0,
    'isStand': false,
    'turnsOver': true,
    'dealOff': true,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];


const max = 21;
let dealerLimit = Math.floor((80 * max) / 100);

console.log(dealerLimit);


const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lostSound = new Audio('static/sounds/aww.mp3');
const drawSound = new Audio('static/sounds/draw.wav');


document.querySelector('#blackjack-hit-btn').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-btn').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand-btn').addEventListener('click', dealerLogic);

function blackjackHit() {
    if(blackjackGame['isStand'] === false) {
        let card = randomCard();
        updateScore(card, YOU);
        showCard(card, YOU);
        showScore(YOU);
        blackjackGame['turnsOver'] = false;
    }
}

function showCard(cardSrc, activePlayer) {
    if(activePlayer['score'] <= max) {
        let cardImage = document.createElement('img');
        cardImage.src = 'static/images/' + cardSrc + '.png';
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal() {
    if(blackjackGame['turnsOver'] === true && blackjackGame['dealOff'] === false) {
        blackjackGame['isStand'] = false;
        clearImages(YOU);
        clearImages(DEALER);
        clearScore(YOU);
        clearScore(DEALER);
        resetResult();
        blackjackGame['turnsOver'] = true;
        blackjackGame['dealOff'] = true;
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function updateScore(card, activePlayer) {
    if(card === 'A') {
        if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= max) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
        else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }
    else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if(activePlayer['score'] > max) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'PACK!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'tomato';
    }
    else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function clearImages(activePlayer){
    let Images = document.querySelector(activePlayer['div']).querySelectorAll('img');
    for(let i = 0; i < Images.length; i++) {
        Images[i].remove();
    }
}

function clearScore(activePlayer) {
    activePlayer['score'] = 0;
    let score = document.querySelector(activePlayer['scoreSpan']);
    score.textContent = 0;
    score.style.color = 'white';
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function dealerLogic() {
    if(blackjackGame['turnsOver'] === false) {
        blackjackGame['turnsOver'] = true;
        blackjackGame['isStand'] = true;
        while(DEALER['score'] <= dealerLimit) {

            let card = randomCard();
            showCard(card, DEALER);
            updateScore(card, DEALER);
            showScore(DEALER);
            await sleep(1000);
        }

        let winner = computeWinner();
        showResult(winner);
        blackjackGame['dealOff'] = false;
    }
}


function computeWinner() {
    let winner;

    if(YOU['score'] <= max) {
        if((YOU['score'] > DEALER['score']) || (DEALER['score'] > max)) {
            blackjackGame['win']++;
            winner = YOU;
        }
        else if(YOU['score'] < DEALER['score']) {
            blackjackGame['loss']++;
            winner = DEALER;
        }
        else if(YOU['score'] === DEALER['score']) {
            blackjackGame['draw']++;
        }
    }
    else if((YOU['score'] > max) && (DEALER['score'] <= max)) {
        blackjackGame['loss']++;
        winner = DEALER;
    }
    else if((YOU['score'] > max) && (DEALER['score'] > max)) {
        blackjackGame['draw']++;
    }

    return winner;
}

function showResult(winner) {
    let messege, messegeColor;

    if(blackjackGame['turnsOver'] === true) {

        if(winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['win'];
            messege = 'WON';
            messegeColor = '32CD32';
            winSound.play();
        }
        else if(winner === DEALER){
            document.querySelector('#losses').textContent = blackjackGame['loss'];
            messege = 'LOST!';
            messegeColor = 'tomato';
            lostSound.play();
        }
        else {
            document.querySelector('#draws').textContent = blackjackGame['draw'];
            messege = 'DRAW!';
            messegeColor = 'F5A300';
            drawSound.play();
        }

        let blackjackResult = document.querySelector('#blackjack-result');
        blackjackResult.textContent = messege;
        blackjackResult.style.color = messegeColor;
    }
}

function resetResult() {
    let resultSpan = document.querySelector('#blackjack-result');
    resultSpan.textContent = "Let's Play";
    resultSpan.style.color = 'black';
}