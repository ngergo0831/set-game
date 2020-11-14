const showSetButton = document.querySelector(
  "#main__right-sidebar-showSetButton"
);
const threeCardButton = document.querySelector(
  "#main__right-sidebar-threeCardButton"
);
const isSetButton = document.querySelector("#main__right-sidebar-isSetButton");
const remainingCards = document.querySelector("#main__right-sidebar-remaining");
const timer = document.querySelector("#main__left-sidebar-timer");
const timerText = document.querySelector("#main__left-sidebar-remainingTime");
const gameOverScreen = document.querySelector("#game-over");
let players = document.querySelector("#main__left-sidebar-players");
let cardsContainer = document.querySelector("#main__cards-container");
let numberOfPlayers = document.querySelector("#menu__player-number-text");
let diffRadio = document.querySelector("#menu__difficulty-radioBeginner");
let playerTime = document.querySelector("#game-over__onePlayer-time");
let playerPoints = document.querySelector("#game-over__onePlayer-points");
let thisPlayer = document.querySelector("#player-points1");

let gameFinished = false;
let playerDisabled = false;
let enabledPlayers = Number(numberOfPlayers.innerHTML);
let numOfFieldCards = 12;
let onFieldCards;
let plusThreeNoShuffled = false;
let onePlayerInterval;
let cardsShuffled = [];
let selectedCards = [];
let isCardsGood;
let clickedCardCounter = 0;
let cardsActive = false;
let currentPlayer = "";
let showHelpSetCounter = 0;
let showHelpSetInterval;
let multiPlayerCounter = 9;
let multiPlayerInterval;
let showSetCounter = 0;
let showSetInterval;
let firstGame = true;
