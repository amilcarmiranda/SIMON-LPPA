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

  
function createLevel() {
  currentLevel++;
  showLevel(currentLevel);
  var randomColor = gameColors[Math.floor(Math.random() * gameColors.length)];
  sequence.push(randomColor);
  clearSequenceEntered();
  showLevelSequence(0);
}

function playAudio(color) {
  document.getElementById(color + '-sound').play();
}

function showLevelSequence(colorIndex) {
  showingLevelSecuence = true;
  setGameState(PlayingStatus.sequenceShowing);
  buttonPressed(sequence[colorIndex]);
  setTimeout(function () {
    var nextColorIndex = colorIndex + 1;
    if (nextColorIndex < sequence.length) {
      setTimeout(function () {
        showLevelSequence(nextColorIndex);
      }, 500);
    } else {
      showingLevelSecuence = false;
      setGameState(PlayingStatus.sequenceWaiting);
    }
  }, 1000);
}

function colorClicked(color) {
  if (!showingLevelSecuence) {
    sequenceEntered.push(color);
    buttonPressed(color);
    if (sequenceEntered.length <= sequence.length) {
      var currentColorIndex = sequenceEntered.length - 1;
      if (sequenceEntered[currentColorIndex] == sequence[currentColorIndex]) {
        currentPoints += 1;
        showPoints(currentPoints);
        if (sequenceEntered.length == sequence.length) {
          setGameState(PlayingStatus.sequenceCorrect);
          setTimeout(function () {
            createLevel();
          }, 2000);
        }
      } else {
        showFinalResults();
        saveResult();
        clearGame();
      }
    }
  }
}

function buttonPressed(button) {
  switch (button) {
    case GameColors.red:
      buttonRed.style.background = '#ff6347';
      break;
    case GameColors.blue:
      buttonBlue.style.background = '#87cefa';
      break;
    case GameColors.green:
      buttonGreen.style.background = '#90ee90';
      break;
    case GameColors.yellow:
      buttonYellow.style.background = '#ffff00';
      break;
  }
  playAudio(button);
  setTimeout(function () {
    buttonDefault(button);
  }, 250);
}

function buttonDefault(button) {
  switch (button) {
    case GameColors.red:
      buttonRed.style.background = '#8b0000';
      break;
    case GameColors.blue:
      buttonBlue.style.background = '#00008b';
      break;
    case GameColors.green:
      buttonGreen.style.background = '#006400';
      break;
    case GameColors.yellow:
      buttonYellow.style.background = '#daa520';
      break;
  }
}
  
  