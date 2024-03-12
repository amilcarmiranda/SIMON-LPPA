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
          createLevel();
      
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
  
 function getRanking() {
  var storedRanking = localStorage.getItem('ranking');
  return storedRanking ? JSON.parse(storedRanking) : [];
}

function updateRanking(newItem) {
  var ranking = getRanking();
  ranking.push(newItem);
  localStorage.setItem('ranking', JSON.stringify(ranking));
}

function showFinalResults() {
  finalPoints = currentPoints - calculatePenalization();
  var points = 'Puntos alcanzados: ' + currentPoints;
  var penalization = 'Penalización: ' + calculatePenalization();
  var final = 'PUNTAJE FINAL: ' + finalPoints;
  openModal(
    'Ingresaste un color incorrecto! Perdiste :(\n\n' +
      points +
      '\n' +
      penalization +
      '\n\n' +
      final
  );
}

function saveResult() {
  var result = {
    name: nameInput.value,
    level: currentLevel,
    points: finalPoints,
    date: Date(Date.now()),
  };
  updateRanking(result);
}

function showRanking(order) {
  ranking.style.display = 'flex';
  rankingList.innerHTML = '';

  var storedRanking = getRanking();
  storedRanking = storedRanking.sort(function (a, b) {
    return b.points - a.points;
  });
  storedRanking = storedRanking.slice(0, 10);

  var rankingWithPosition = storedRanking.map(function (item, index) {
    return {
      position: index + 1, // add position number
      name: item.name,
      level: item.level,
      points: item.points,
      date: item.date,
    };
  });

  switch (order) {
    case RankingOrder.name:
      rankingWithPosition = rankingWithPosition.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
      break;
    case RankingOrder.level:
      rankingWithPosition = rankingWithPosition.sort(function (a, b) {
        return b.level - a.level;
      });
      break;
    case RankingOrder.points:
      rankingWithPosition = rankingWithPosition.sort(function (a, b) {
        return b.points - a.points;
      });
      break;
    case RankingOrder.date:
      rankingWithPosition = rankingWithPosition.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      break;
  }

  while (rankingWithPosition.length < 10) {
    rankingWithPosition.push({
      name: '-',
      level: '-',
      points: '-',
      date: '-',
      position: 10,
    });
  }

  rankingWithPosition.forEach(function (item) {
    var rankingItem = document.createElement('li');
    rankingItem.classList.add('ranking-item');
    rankingItem.innerHTML =
      createSpanRankingItem('# ' + item.position) +
      createSpanRankingItem(item.name.toUpperCase()) +
      createSpanRankingItem(item.level) +
      createSpanRankingItem(item.points) +
      createSpanRankingItem(visualFormattedDatetime(item.date));
    rankingList.appendChild(rankingItem);
  });
}

function createSpanRankingItem(value) {
  return '<span>' + value + '</span>';
}

 
function clearGame() {
  gameStarted = false;
  currentLevel = 0;
  currentPoints = 0;
  finalPoints = 0;
  sequence = [];
  nameInput.disabled = false;
  clearSequenceEntered();
  setGameState(PlayingStatus.notStarted);
  setStartButton('INICIAR');
  showLevel(0);
  showPoints(0);
  clearTimer();
}

function showLevel(value) {
  labelLevel.innerText = 'Nvl: ' + value;
}

function showPoints(value) {
  labelScore.innerText = 'Pts: ' + value;
}

function showTimer(value) {
  labelTimer.innerText = value;
}

function clearSequenceEntered() {
  sequenceEntered = [];
}

function setGameState(newState) {
  labelState.innerText = newState;
  switch (newState) {
    case PlayingStatus.notStarted:
      labelState.style.color = 'white';
      break;
    case PlayingStatus.sequenceShowing:
      labelState.style.color = 'yellow';
      break;
    case PlayingStatus.sequenceWaiting:
      labelState.style.color = 'tomato';
      break;
    case PlayingStatus.sequenceCorrect:
      labelState.style.color = 'lightgreen';
      break;
  }
}

function setStartButton(title) {
  buttonStart.innerText = title;
}

/* utils */

function to2Places(value) {
  return String(value).padStart(2, '0');
}

function calculatePenalization() {
  return Math.trunc((hours * 60 * 60 + minutes * 60 + seconds) / 15);
}

function visualFormattedDatetime(datetime) {
  var parsedDate = new Date(datetime);
  if (isNaN(parsedDate)) {
    return '-';
  }
  var day = to2Places(parsedDate.getDate());
  var month = to2Places(parsedDate.getMonth() + 1);
  var year = parsedDate.getFullYear();
  var hours = to2Places(parsedDate.getHours());
  var minutes = to2Places(parsedDate.getMinutes());
  return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes;
}
