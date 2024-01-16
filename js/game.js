'use strict';

/* const */

var PlayingStatus = {
  notStarted: 'JUEGO NO INICIADO',
  sequenceShowing: 'MOSTRANDO SECUENCIA',
  sequenceWaiting: 'INGRESÁ LA SECUENCIA',
  sequenceCorrect: '¡CORRECTO!',
};

var GameColors = {
  green: 'green',
  red: 'red',
  blue: 'blue',
  yellow: 'yellow',
};

var RankingOrder = {
  name: 'name',
  level: 'level',
  points: 'points',
  date: 'date',
};

/* variables */

var gameColors = [
  GameColors.green,
  GameColors.red,
  GameColors.blue,
  GameColors.yellow,
];
var sequence = [];
var sequenceEntered = [];
var currentLevel = 0;
var currentPoints = 0;
var finalPoints = 0;
var gameStarted = false;
var showingLevelSecuence = false;
var timer;
var hours = 0;
var minutes = 0;
var seconds = 0;

/* functions  */

window.onload = function () {
    clearGame();
  };
  
  function openModal(message) {
    modalMessage.innerText = message;
    modal.style.display = 'flex';
  }
  
  function closeModal() {
    modal.style.display = 'none';
    ranking.style.display = 'none';
  }
  
  function newGame() {
    if (nameInput.value.length < 3) {
      openModal('Ingresá un nombre de más de 3 caracteres');
      return;
    }
    nameInput.disabled = true;
    startTimer();
    if (!gameStarted && !showingLevelSecuence) {
      gameStarted = true;
      setStartButton('EN CURSO');
      // audio not played and showing error inside setTimeout -> FIX
      // setTimeout(function() {
      createLevel();
      // }, 1000);
    }
  }
  
function startTimer() {
    timer = setInterval(function () {
      seconds++;
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
          minutes = 0;
          hours++;
        }
      }
      showTimer(
        to2Places(hours) + ':' + to2Places(minutes) + ':' + to2Places(seconds)
      );
    }, 1000);
  }
  
  function clearTimer() {
    clearInterval(timer);
    hours = 0;
    minutes = 0;
    seconds = 0;
    showTimer('00:00:00');
  }
  
  