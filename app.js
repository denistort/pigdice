/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

'use strict'

let scores, roundScore, activePlayer,gamePlaying, playerScores;
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const btnset = document.querySelector('.setting-icon');

init();
//таймер
let delay = 1000;
let sec = 60;
let timerId = setTimeout( function timer() {
	sec -= 1;
	document.querySelector('.timer').textContent = sec;

	if(sec == 0){
		sec = 60;
		nextPlayer();
	}
	timerId = setTimeout(timer, delay); // (*)
  }, delay);

//


document.querySelector('.button-submit-username').addEventListener('click', () => {
	if (document.querySelector('.username-input').value >= 5){
		let username = document.querySelector('.username-input').value;
		document.querySelector('.username-input').value = '';
		document.querySelector('.player-name').textContent = username;
	}

})

btnset.addEventListener('click', () => {
	const games = document.getElementsByClassName('game-panel');
	for(let i = 0;i<games.length;i++){
		games[i].style.display = 'none';
	}
	
	document.querySelector('.btn-back-from-settings').style.display = 'block';
	const rules = document.getElementsByClassName('setting-panel');
	for(let i = 0;i<rules.length;i++){
		rules[i].style.display = 'block';
	}
});

document.querySelector('.btn-back-from-settings').addEventListener('click', function(){
	var games = document.getElementsByClassName('game-panel');
	for(let i = 0;i<games.length;i++){
		games[i].style.display = 'block';
	}
	
	document.querySelector('.btn-back-from-settings').style.display = 'none';
	var settingPanel = document.getElementsByClassName('setting-panel');
	for(let i = 0;i<settingPanel.length;i++){
		settingPanel[i].style.display = 'none';
	}

});

document.querySelector('.btn-roll').addEventListener('click', function(){
	if (gamePlaying && activePlayer !== 1) {
        let diceRollingSound = new Audio('sounds/dicerolling.wav');
		diceRollingSound.play();
		showRollResult(roll());

	}
});


function roll () {
    // 1. random number
		let dice = Math.floor(Math.random() * 6) + 1;

        return dice;
}

function showRollResult(rolledDice) {
    		// 2. display result
		let diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'flex';
        if (activePlayer == 0) {
            diceDOM.style.backgroundColor = '#EB4D4D';
        } else {
            diceDOM.style.backgroundColor = '#2ecc71';
        }
		diceDOM.textContent = rolledDice;

		document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + rolledDice + '</em';

		// 3. Update round score if the rolled number is not 1
		if (rolledDice !== 1) {
			hideRolledMsg();
			//add score
			roundScore += rolledDice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			//disable button

			disableBtn(btnRoll, 1000);
			hideRolledMsg();
			document.querySelector('.player-'+activePlayer+'-rolled-1').style.visibility = 'visible';
			nextPlayer();		
		}

}



document.querySelector('.btn-hold').addEventListener('click', function(){
		if (gamePlaying && activePlayer !== 1) {
            hold();
		}
		
		
});

function hold() {
	
    //
    disableBtn(btnRoll, 1000);
    // Add current score to global score
    scores[activePlayer] += roundScore;	

    console.log(scores);
    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //check if player won the game

    if (scores[activePlayer] >= 50) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner-' + activePlayer);
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active-' + activePlayer);
        gamePlaying = false;

		btnRoll.style.cssText = `opacity: 0.1`;
		btnHold.style.cssText = `opacity: 0.1`;

    } else {
        nextPlayer();
    }
}


document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-rules').addEventListener('click', function(){
	    const games = document.getElementsByClassName('game-panel');
		for(let i = 0;i<games.length;i++){
			games[i].style.display = 'none';
		}
	    
	    document.querySelector('.btn-back').style.display = 'block';
		const rules = document.getElementsByClassName('rules-panel');
		for(let i = 0;i<rules.length;i++){
			rules[i].style.display = 'block';
		}
		

		document.querySelector('.setting-icon').style.display = 'none';
});

document.querySelector('.btn-back').addEventListener('click', function(){
	    let games = document.getElementsByClassName('game-panel');
		for(let i = 0;i<games.length;i++){
			games[i].style.display = 'block';
		}
	    
	    document.querySelector('.btn-back').style.display = 'none';
		let rules = document.getElementsByClassName('rules-panel');
		for(let i = 0;i<rules.length;i++){
			rules[i].style.display = 'none';
		}

		document.querySelector('.setting-icon').style.display = 'block';
	
});

let counter;

function init() {
	disableBtn(document.querySelector('.btn-new'), 2000);
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	//Sound when game is started here
	let startAudio = new Audio('sounds/start.mp3');
	startAudio.play();
	//
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('.player-0-rolled-1').style.visibility = 'hidden';
	document.querySelector('.player-1-rolled-1').style.visibility = 'hidden';
	
	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player Ai';
	document.querySelector('.player-0-panel').classList.add('active-0');
	document.querySelector('.player-0-panel').classList.remove('winner-0');
	document.querySelector('.player-1-panel').classList.remove('winner-1');
	
	
	//make red for first player
	let icons = document.getElementsByTagName('i');
	for(let i = 0;i<icons.length;i++){
		icons[i].classList.add('color-' + activePlayer);
	}


	// bug with buttons

	btnRoll.style.cssText = `opacity: 1`;
	btnHold.style.cssText = `opacity: 1`;



}

function nextPlayer() {
	//next player
		
		counter =+ 1;
		console.log(counter);
		if (counter % 2 === 0) {
			document.querySelector('.counterofturns').innerHTML = counter / 2;
		}
		//reset timer
		
		//
		let icons = document.getElementsByTagName('i');
		for(let i = 0;i<icons.length;i++){
			icons[i].classList.remove('color-' + activePlayer);
		}
		
		document.querySelector('.dice').style.display = 'none';
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active-' + activePlayer);
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

		roundScore = 0;
		
		for(let i = 0;i<icons.length;i++){
			icons[i].classList.add('color-' + activePlayer);
		}
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('active-' + activePlayer);
		document.querySelector('#current-0').textContent = '0';
		document.querySelector('#current-1').textContent = '0';

		
        if (activePlayer === 1) {
            ai();
			btnRoll.style.cssText = `opacity: 0.2`;
			btnHold.style.cssText = `opacity: 0.2`;
        } else {
			btnRoll.style.cssText = `opacity: 1`;
			btnHold.style.cssText = `opacity: 1`;
		}
}

function disableBtn(btn, time) {
	   //disable button
		btn.disabled = true;
      	setTimeout(function(){btn.disabled = false;},time);
}

function hideRolledMsg(){
	document.querySelector('.player-0-rolled-1').style.visibility = 'hidden';
	document.querySelector('.player-1-rolled-1').style.visibility = 'hidden';
};

//
function ai() {
	//this function kind of ai player
	//
	let sum = 0;

	function step() {

		let resultDice = roll();

		sum = resultDice;
	
		setTimeout(showRollResult, 1000, resultDice);
		if(resultDice == 1) {
			return false;
		}
	}

	// let timerId = setTimeout(step() {
		

	// 	timerId = setTimeout(step, delay);
	  
	//   }, delay);
	if (gamePlaying && activePlayer == 1) {
		let difference;
		const rand = Math.floor(Math.random() * 2) + 1;
		scores[0] > scores[1] ? difference = scores[0] - scores[1] : difference = 0;
		console.log(difference)
		
		if (difference >= 10) {
			// let delay = 1000;
			// let i = 1;
			// let resultDice;
			// let timerId = setTimeout(function runRole() {
				
			// 	delay *= i;
				
			// 	resultDice = roll();

			// 	sum = resultDice;
			
			// 	setTimeout(showRollResult, 1000, resultDice);

			// 	i++;

			// 	if(resultDice == 1) {
			// 		return false;
			// 	}
			// 	if(i >= 4) {
			// 		return;
			// 	}
				
			// 	setTimeout(run, delay);

			// }, delay);

			
			setTimeout(step,1000)
			if (sum == 1) {
				return;
			}
			setTimeout(step,1000)
			if (sum == 1) {
				return;
			}

			if(sum !== 1){
				setTimeout(hold, 3000)
			};
		} else if (difference >= 5 && difference <= 9){
			setTimeout(step,1000);
			setTimeout(step,2000);

			setTimeout(hold, 4000);
		} else if (difference >= 1 && difference <= 4) {
			setTimeout(step,1000);
			setTimeout(step,2000);

			setTimeout(hold, 4000);
		} 
		else if (difference = 0){
			setTimeout(step,1000);
			setTimeout(step,2000);

			setTimeout(hold, 4000);

		}

		
	}


};

