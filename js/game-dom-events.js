'use strict';

var buttonStart = document.getElementById('start-button');

var buttonGreen = document.getElementById('green');
var buttonRed = document.getElementById('red');
var buttonBlue = document.getElementById('blue');
var buttonYellow = document.getElementById('yellow');

var labelLevel = document.getElementById('level');
var labelScore = document.getElementById('score');
var labelTimer = document.getElementById('timer');
var labelState = document.getElementById('state');

var nameInput = document.getElementById('input-name');

var modal = document.getElementById('modal');
var modalMessage = document.getElementById('modal-message');
var modalClose = document.getElementById('modal-close');

var buttonGithub = document.getElementById('button-github');
var buttonScore = document.getElementById('button-score');
var buttonContact = document.getElementById('button-contact');

var ranking = document.getElementById('ranking');
var rankingList = document.getElementById('ranking-list');
var rankingClose = document.getElementById('ranking-close');

var rankingPositionButton = document.getElementById('ranking-position-title');
var rankingNameButton = document.getElementById('ranking-name-title');
var rankingLevelButton = document.getElementById('ranking-level-title');
var rankingPointsButton = document.getElementById('ranking-points-title');
var rankingDateButton = document.getElementById('ranking-date-title');

nameInput.addEventListener('input', function () {
    nameInput.style.width = this.value.length + 'ch';
  });
  
  buttonStart.addEventListener('click', function () {
    newGame();
  });
  
  buttonGreen.addEventListener('click', function () {
    if (gameStarted) {
      colorClicked(GameColors.green);
    }
  });
  
  buttonRed.addEventListener('click', function () {
    if (gameStarted) {
      colorClicked(GameColors.red);
    }
  });
  
  buttonBlue.addEventListener('click', function () {
    if (gameStarted) {
      colorClicked(GameColors.blue);
    }
  });
  
  buttonYellow.addEventListener('click', function () {
    if (gameStarted) {
      colorClicked(GameColors.yellow);
    }
  });
  
  modalClose.addEventListener('click', function () {
    closeModal();
  });
  
  rankingClose.addEventListener('click', function () {
    closeModal();
  });
  
  buttonGithub.addEventListener('click', function () {
    window.open(
      'https://github.com/amilcarmiranda/SIMON-LPPA',
      '_blank'
    );
  });
  
  buttonContact.addEventListener('click', function () {
    window.location.href = 'contact.html';
  });
  
  buttonScore.addEventListener('click', function () {
    showRanking(RankingOrder.points);
  });
  
  rankingPositionButton.addEventListener('click', function () {
    showRanking(RankingOrder.points);
  });
  
  rankingNameButton.addEventListener('click', function () {
    showRanking(RankingOrder.name);
  });
  
  rankingLevelButton.addEventListener('click', function () {
    showRanking(RankingOrder.level);
  });
  
  rankingPointsButton.addEventListener('click', function () {
    showRanking(RankingOrder.points);
  });
  
  rankingDateButton.addEventListener('click', function () {
    showRanking(RankingOrder.date);
  });
  