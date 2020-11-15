const render = () => {
  cardsContainer = document.querySelector("#main__cards-container");
  diffRadio = document.querySelector("#menu__difficulty-radioBeginner");
  gameOverOnePlayer.style.display = "block";
  gameOverOnePlayer.style.display = "block";
  showSetButton.disabled = radioShowSetNo.checked;
  threeCardButton.disabled = radioThreeCardYes.checked;
  isSetButton.disabled = radioIsSetNo.checked;
  clickedCardCounter = 0;
  cardsActive = false;
  playerDisabled = false;
  currentPlayer = "";
  showHelpSetCounter = 0;
  multiPlayerCounter = 9;
  showSetCounter = 0;
  onFieldCards = [];

  if (!radioThreeCardYes.checked) {
    threeCardButton.style.cursor = "pointer";
  }
  //Create players
  for (let i = 0; i < Number(playerText.innerHTML); i++) {
    const player = document.createElement("BUTTON");
    player.setAttribute("class", "main__left-sidebar-player");
    player.setAttribute("id", "player" + (i + 1));
    player.innerHTML = playerNames[i];
    player.addEventListener("click", () => {
      playerDisabled = false;
      clickedCardCounter = 0;
      cardsActive = true;
      currentPlayer = "player-points" + (i + 1);
      player.style.color = "blue";
      if (Number(numberOfPlayers.innerHTML) > 1) {
        changeScoreView();
        startTimer(player);
      }
    });

    if (Number(numberOfPlayers.innerHTML) == 1) {
      cardsActive = true;
      currentPlayer = "player-points" + 1;
      player.style.color = "blue";
      player.style.pointerEvents = "none";
    }
    const score = document.createElement("DIV");
    score.setAttribute("id", "player-points" + (i + 1));
    score.setAttribute("class", "player-points");
    score.innerHTML = 0;
    const playerFlex = document.createElement("DIV");
    playerFlex.setAttribute("class", "main__left-sidebar-player-flex");
    playerFlex.appendChild(player);
    playerFlex.appendChild(score);
    players.appendChild(playerFlex);
  }

  if (Number(numberOfPlayers.innerHTML) == 1) {
    radioAggregated.disabled = true;
    labelAggregated.style.cursor = "no-drop";
    timerOnePlayer();
  } else {
    radioAggregated.addEventListener("click", () => {
      for (let i = 0; i < Number(numberOfPlayers.innerHTML); i++) {
        let str = "#player-points" + (i + 1);
        tempPlayer = document.querySelector(str);
        tempPlayer.innerHTML = aggregatedPoints[i];
      }
    });
    radioActual.addEventListener("click", () => {
      for (let i = 0; i < Number(numberOfPlayers.innerHTML); i++) {
        let str = "#player-points" + (i + 1);
        tempPlayer = document.querySelector(str);
        tempPlayer.innerHTML = currentPoints[i];
      }
    });
  }
  //Create shuffled cards array
  do {
    cardsShuffled = [];
    cardsShuffled = createDeck();
    const temp = cardsShuffled.slice(0, 12);
    temp.forEach((x) =>
      onFieldCards.push({
        src: x.src,
        num: x.num,
        color: x.color,
        shape: x.shape,
        content: x.content,
      })
    );
    isCardsGood = helpSet();
  } while (!isCardsGood);

  cardsShuffled = cardsShuffled.slice(12);
  console.log("Pakliban lévő kártyák:");
  console.log(cardsShuffled);

  onFieldCards.forEach((card, i) => createCards(card.src, i));

  remainingCards.innerHTML = cardsShuffled.length;

  if (firstGame) {
    isSetButton.addEventListener("click", showHelpSet);
    showSetButton.addEventListener("click", showSet);
    threeCardButton.addEventListener("click", threeNewCard);
  }
};

btnStart.addEventListener("click", render);
