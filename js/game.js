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