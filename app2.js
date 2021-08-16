'use strict'

function step() {

    let resultDice = Math.floor(Math.random() * 6) + 1;

    sum =+ resultDice;

    setTimeout(showRollResult, 1000, resultDice);
    if(resultDice == 1) {
        return false;
    }
}

let delay = 1000;
let i = 1;

let timerId = setTimeout(function run() {
    
    let resultDice = Math.floor(Math.random() * 6) + 1;
    document.querySelector('.out').innerHTML += `<div>${resultDice}</div>`;

    i++;

    if(resultDice == 1) {
        return false;
    }
    if(i >= 4) {
        return;
    }
    
    setTimeout(run, delay);

}, delay);