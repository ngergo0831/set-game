const copyValues = (from, to) => {
  to.src = from.src;
  to.num = from.num;
  to.color = from.color;
  to.shape = from.shape;
  to.content = from.content;
};

const showHelpSet = () => {
  isSetButton.innerHTML = helpSet() ? "Van" : "Nincs";
  showHelpSetInterval = setInterval(() => {
    showHelpSetCounter++;
    if (showHelpSetCounter == 2) {
      isSetButton.innerHTML = "Van SET a leosztásban?";
      showHelpSetCounter = 0;
      clearInterval(showHelpSetInterval);
    }
  }, 1000);
};

const startTimer = (cplayer) => {
  players.style.pointerEvents = "none";
  let btnTemp = document.querySelectorAll(".main__left-sidebar-player");
  btnTemp.forEach((x) => {
    x.style.pointerEvents = "none";
  });
  let player = document.querySelector("#" + currentPlayer);
  let num;
  if (currentPlayer[currentPlayer.length - 1] == "0") {
    num = 9;
  } else {
    num = Number(currentPlayer[currentPlayer.length - 1]) - 1;
  }
  let currPoints = currentPoints[num];
  showSetButton.disabled = true;
  isSetButton.disabled = true;
  threeCardButton.disabled = true;
  playerDisabled = false;

  const noMoreTime = () => {
    players.style.pointerEvents = "all";
    let btnTemp2 = document.querySelectorAll(".main__left-sidebar-player");
    btnTemp2.forEach((x) => {
      x.style.pointerEvents = "all";
    });
    timer.innerHTML = 10;
    cardsActive = false;
    showSetButton.disabled = false;
    isSetButton.disabled = false;
    if (cardsShuffled.length != 0) threeCardButton.disabled = false;
    document
      .querySelectorAll("#main__cards-container img")
      .forEach((x) => (x.style.boxShadow = ""));
    selectedCards = [];
    clickedCardCounter = 0;
    player = document.querySelector("#" + currentPlayer);
    if (
      playerDisabled &&
      enabledPlayers != 0 &&
      Number(numberOfPlayers.innerHTML) > 1
    ) {
      cplayer.style.color = "grey";
      cplayer.style.pointerEvents = "none";
      cplayer.style.cursor = "no-drop";
    } else {
      if (Number(numberOfPlayers.innerHTML) > 1) cplayer.style.color = "black";
    }
    if (enabledPlayers == 0) {
      const playerButtons = document.querySelectorAll(
        ".main__left-sidebar-player"
      );
      playerButtons.forEach((x) => {
        x.style.pointerEvents = "all";
        x.style.color = "black";
        x.style.cursor = "pointer";
      });
      players.style.pointerEvents = "all";
      enabledPlayers = Number(numberOfPlayers.innerHTML);
      playerDisabled = false;
    }
    if (currentPoints[num] > 0 && currentPoints[num] == currPoints) {
      currentPoints[num]--;
      player.innerHTML = currentPoints[num];
    }
  };

  multiPlayerInterval = setInterval(() => {
    timer.innerHTML = multiPlayerCounter;
    if (multiPlayerCounter == 0 && Number(numberOfPlayers.innerHTML) > 1) {
      playerDisabled = true;
      enabledPlayers--;
    }
    if (multiPlayerCounter == 0 || !cardsActive) {
      clearInterval(multiPlayerInterval);
      multiPlayerCounter = 10;
      noMoreTime();
    }
    multiPlayerCounter--;
  }, 1000);
};

const showSet = () => {
  /*const tempPlayers = document.querySelectorAll(
    "#main__left-sidebar-players button"
  );*/
  //tempPlayers.forEach((x) => (x.style.pointerEvents = "none"));
  players.style.pointerEvents = "none";
  let cond = true;
  for (let i = 0; i < numOfFieldCards && cond; i++)
    for (let j = i + 1; j < numOfFieldCards && cond; j++)
      for (let k = j + 1; k < numOfFieldCards && cond; k++)
        if (
          onFieldCards[i].src !== "no-more-card.png" &&
          onFieldCards[j].src !== "no-more-card.png" &&
          onFieldCards[k].src !== "no-more-card.png"
        )
          if (
            checkSet([
              onFieldCards[i].src,
              onFieldCards[j].src,
              onFieldCards[k].src,
            ])
          ) {
            const first = document.querySelector(
              `img[src='res/cards/${onFieldCards[i].src}']`
            );
            first.style.boxShadow =
              "-3px -3px 30px 3px red, 3px 3px 30px 3px red";
            const second = document.querySelector(
              `img[src='res/cards/${onFieldCards[j].src}']`
            );
            second.style.boxShadow =
              "-3px -3px 30px 3px red, 3px 3px 30px 3px red";
            const third = document.querySelector(
              `img[src='res/cards/${onFieldCards[k].src}']`
            );
            third.style.boxShadow =
              "-3px -3px 30px 3px red, 3px 3px 30px 3px red";

            cond = false;

            showSetInterval = setInterval(() => {
              if (showSetCounter == 1) {
                first.style.boxShadow = "";
                second.style.boxShadow = "";
                third.style.boxShadow = "";
                //tempPlayers.forEach((x) => (x.style.pointerEvents = "auto"));
                players.style.pointerEvents = "all";
                clearInterval(showSetInterval);
                showSetCounter = 0;
              }
              showSetCounter++;
            }, 200);
          }
};

const timerOnePlayer = () => {
  timer.innerHTML = 0;
  timerText.innerHTML = "Eltelt idő";
  onePlayerInterval = setInterval(() => {
    timer.innerHTML = Number(timer.innerHTML) + 1;
    if (gameFinished) clearInterval(onePlayerInterval);
  }, 1000);
};

const checkSet = (selectedCardss) => {
  const cardsDetails = selectedCardss.map(
    (e) => onFieldCards.filter((x) => x.src === e)[0]
  );
  let num = new Set();
  let color = new Set();
  let shape = new Set();
  let content = new Set();
  cardsDetails.forEach((x) => {
    num.add(x.num);
    color.add(x.color);
    shape.add(x.shape);
    content.add(x.content);
  });
  return (
    num.size !== 2 && color.size !== 2 && shape.size !== 2 && content.size !== 2
  );
};

const helpSet = () => {
  for (let i = 0; i < numOfFieldCards; i++) {
    for (let j = i + 1; j < numOfFieldCards; j++) {
      for (let k = j + 1; k < numOfFieldCards; k++) {
        if (
          onFieldCards[i].src !== "no-more-card.png" &&
          onFieldCards[j].src !== "no-more-card.png" &&
          onFieldCards[k].src !== "no-more-card.png"
        ) {
          if (
            checkSet([
              onFieldCards[i].src,
              onFieldCards[j].src,
              onFieldCards[k].src,
            ])
          ) {
            return true;
          }
        }
      }
    }
  }
  return false;
};

const threeNewCard = () => {
  for (let i = 0; i < 3; i++) {
    createCards(cardsShuffled[i].src, i + numOfFieldCards);
    const temp = cardsShuffled[i];
    onFieldCards.push({
      src: temp.src,
      num: temp.num,
      color: temp.color,
      shape: temp.shape,
      content: temp.content,
    });
    //onFieldCards.push(cardsShuffled[i]);
  }
  cardsShuffled = cardsShuffled.slice(3, cardsShuffled.length);
  if (cardsShuffled.length == 0) plusThreeNoShuffled = true;
  numOfFieldCards += 3;
  remainingCards.innerHTML = cardsShuffled.length;
  const mainCardsImg = document.querySelectorAll("#main__cards-container img");
  mainCardsImg.forEach((x) => (x.style.width = "80%"));
  threeCardButton.style.cursor = "no-drop";
  threeCardButton.disabled = true;
};

const createCards = (src, i) => {
  const img = document.createElement("IMG");
  img.setAttribute("src", "res/cards/" + src);
  img.setAttribute("id", "card" + i);
  img.addEventListener("click", () => {
    if (cardsActive) {
      players.style.pointerEvents = "none";
      if (img.style.boxShadow === "") {
        img.style.boxShadow = "-3px -3px 30px 3px red, 3px 3px 30px 3px blue";
        clickedCardCounter++;
        selectedCards.push(img.src);
      } else {
        img.style.boxShadow = "";
        clickedCardCounter--;
        selectedCards = selectedCards.filter((x) => x !== img.src);
      }
      if (clickedCardCounter == 3) {
        selectedCards = selectedCards.map((x) => x.slice(-8));
        let player = document.querySelector("#" + currentPlayer);
        let num;
        if (currentPlayer[currentPlayer.length - 1] == "0") {
          num = 9;
        } else {
          num = Number(currentPlayer[currentPlayer.length - 1]) - 1;
        }
        if (checkSet(selectedCards)) {
          console.log("SET");
          currentPoints[num]++;
          player.innerHTML = currentPoints[num];
          let indexes = [];

          if (numOfFieldCards != 12) {
            for (let ind = 12; ind < 15; ind++) {
              for (let j = 0; j < 3; j++) {
                if (onFieldCards[ind].src === selectedCards[j]) {
                  indexes.push(ind);
                }
              }
            }
          }

          if (indexes.length == 0 && numOfFieldCards != 12) {
            for (let inde = 0; inde < 3; inde++) {
              for (let j = 0; j < onFieldCards.length; j++) {
                if (onFieldCards[j].src === selectedCards[inde]) {
                  let lastIndex = onFieldCards.length - 1;
                  onFieldCards[j] = onFieldCards[lastIndex];
                  onFieldCards = onFieldCards.slice(0, lastIndex);
                }
              }
            }
            document.querySelector("#card12").outerHTML = "";
            document.querySelector("#card13").outerHTML = "";
            document.querySelector("#card14").outerHTML = "";
            const mainCardsImg = document.querySelectorAll(
              "#main__cards-container img"
            );
            mainCardsImg.forEach((x) => (x.style.width = "100%"));
            if (cardsShuffled.length !== 0) threeCardButton.disabled = false;
            if (cardsShuffled.length !== 0) threeCardButton.cursor = "pointer";
            numOfFieldCards = 12;
          } else {
            for (let inn = 0; inn < 3; inn++) {
              for (let j = 0; j < onFieldCards.length; j++) {
                if (onFieldCards[j].src === selectedCards[inn]) {
                  if (cardsShuffled.length == 0) {
                    if (numOfFieldCards == 12 || indexes.length == 3) {
                      if (indexes.length == 3) {
                        document.querySelector("#card" + j).outerHTML = "";
                        onFieldCards = onFieldCards.filter(
                          (x, index) => index != j
                        );
                      } else {
                        onFieldCards[j].src = "no-more-card.png";
                        onFieldCards[j].color = "off";
                        onFieldCards[j].content = "off";
                        onFieldCards[j].num = "off";
                        onFieldCards[j].shape = "off";
                        let str = "#card" + j;
                        let tempCard = document.querySelector(str);
                        tempCard.style.pointerEvents = "none";
                        tempCard.style.cursor = "no-drop"; //nem működik
                      }
                    } else {
                      if (indexes.length != 0) {
                        let lastIndex = indexes[indexes.length - 1];
                        onFieldCards[j] = onFieldCards[lastIndex];
                        onFieldCards = onFieldCards.filter(
                          (x, index) => index != lastIndex
                        );
                        indexes = indexes.slice(0, indexes.length - 1);
                        numOfFieldCards--;
                        document.querySelector("#card" + lastIndex).outerHTML =
                          "";

                        if (inn == 2) {
                          const mainCardsImg = document.querySelectorAll(
                            "#main__cards-container img"
                          );
                          mainCardsImg.forEach((x) => (x.style.width = "100%"));
                          let remove = document.querySelector("#card" + 12);
                          if (remove != null) remove.outerHTML = "";
                          remove = document.querySelector("#card" + 13);
                          if (remove != null) remove.outerHTML = "";
                          remove = document.querySelector("#card" + 14);
                          if (remove != null) remove.outerHTML = "";
                        }
                      } else {
                        //indexes.length == 0
                        let lastIndex = onFieldCards.length - 1;
                        onFieldCards[j] = onFieldCards[lastIndex];
                        onFieldCards = onFieldCards.slice(0, lastIndex);
                        numOfFieldCards--;
                        if (inn == 2) {
                          const mainCardsImg = document.querySelectorAll(
                            "#main__cards-container img"
                          );
                          mainCardsImg.forEach((x) => (x.style.width = "100%"));
                          threeCardButton.disabled = true;
                          threeCardButton.style.cursor = "no-drop";
                          let remove = document.querySelector("#card" + 12);
                          if (remove != null) remove.outerHTML = "";
                          remove = document.querySelector("#card" + 13);
                          if (remove != null) remove.outerHTML = "";
                          remove = document.querySelector("#card" + 14);
                          if (remove != null) remove.outerHTML = "";
                        }
                      }
                    }
                  } else {
                    if (numOfFieldCards == 12) {
                      //onFieldCards[j] = cardsShuffled[0];
                      copyValues(cardsShuffled[0], onFieldCards[j]);
                      cardsShuffled = cardsShuffled.slice(1);
                    } else {
                      let lastIndex;
                      if (indexes.length != 0) {
                        lastIndex = indexes[indexes.length - 1];
                        onFieldCards[j] = onFieldCards[lastIndex];
                        onFieldCards = onFieldCards.filter(
                          (x, index) => index != lastIndex
                        );
                        indexes = indexes.slice(0, indexes.length - 1);
                        numOfFieldCards--;
                        document.querySelector("#card" + lastIndex).outerHTML =
                          "";
                      } else {
                        lastIndex = onFieldCards.length - 1;
                        onFieldCards[j] = onFieldCards[lastIndex];
                        onFieldCards = onFieldCards.slice(0, lastIndex);
                        numOfFieldCards--;
                        if (inn == 2) {
                          const mainCardsImg = document.querySelectorAll(
                            "#main__cards-container img"
                          );
                          mainCardsImg.forEach((x) => (x.style.width = "100%"));
                          let remove = document.querySelector("#card" + 12);
                          if (remove != null) remove.outerHTML = "";
                          remove = document.querySelector("#card" + 13);
                          if (remove != null) remove.outerHTML = "";
                          remove = document.querySelector("#card" + 14);
                          if (remove != null) remove.outerHTML = "";
                        }
                      }
                    }
                  }
                  plusThreeNoShuffled = true;
                }
              }
            }
            if (cardsShuffled.length !== 0) threeCardButton.disabled = false;
            if (cardsShuffled.length !== 0)
              threeCardButton.style.cursor = "pointer";
            numOfFieldCards = 12;
          }
          if (
            !helpSet() &&
            cardsShuffled.length != 0 &&
            radioThreeCardYes.checked
          )
            threeNewCard();
          for (let inde = 0; inde < 3; inde++) {
            document
              .querySelectorAll("#main__cards-container img")
              .forEach((x, j) => {
                if (x.src.slice(-8) === selectedCards[inde]) {
                  x.src = "res/cards/" + onFieldCards[j].src;
                }
              });
          }
          //Game over
          if (!helpSet() && cardsShuffled.length == 0) {
            gameFinished = true;
            console.log("Game over");
            threeCardButton.disabled = true;
            threeCardButton.style.cursor = "pointer";
            showSetButton.disabled = true;
            showSetButton.style.cursor = "pointer";
            isSetButton.disabled = true;
            isSetButton.style.cursor = "pointer";
            mainScreen.style.display = "none";
            if (Number(numberOfPlayers.innerHTML) > 1) {
              currentPoints.forEach((numm, index) => {
                aggregatedPoints[index] += numm;
              });
              gameOverPointsTitles = document.querySelector(
                "#game-over__morePointsTitles"
              );
              while (gameOverPointsTitles.children.item(2)) {
                gameOverPointsTitles.removeChild(
                  gameOverPointsTitles.lastChild
                );
              }
              for (let inndex = 0; inndex < 10; inndex++) {
                newChild1 = document.createElement("DIV");
                newChild2 = document.createElement("DIV");
                newChild3 = document.createElement("DIV");
                newChild4 = document.createElement("DIV");
                newChild1.setAttribute("class", "game-over__points-left");
                if (inndex >= Number(numberOfPlayers.innerHTML)) {
                  newChild1.style.color = "transparent";
                  newChild1.style.userSelect = "none";
                  newChild1.style.pointerEvents = "none";
                  newChild1.style.border = "none";
                }
                newChild1.innerHTML = playerNames[inndex];
                gameOverPointsTitles.appendChild(newChild1);

                newChild2.setAttribute(
                  "class",
                  "game-over__points-right margin-right"
                );
                if (inndex >= Number(numberOfPlayers.innerHTML)) {
                  newChild2.style.color = "transparent";
                  newChild2.style.userSelect = "none";
                  newChild2.style.pointerEvents = "none";
                  newChild2.style.border = "none";
                }
                newChild2.innerHTML = currentPoints[inndex];
                gameOverPointsTitles.appendChild(newChild2);

                newChild3.setAttribute(
                  "class",
                  "game-over__points-left margin-left"
                );
                if (inndex >= Number(numberOfPlayers.innerHTML)) {
                  newChild3.style.color = "transparent";
                  newChild3.style.userSelect = "none";
                  newChild3.style.pointerEvents = "none";
                  newChild3.style.border = "none";
                }
                newChild3.innerHTML = playerNames[inndex];
                gameOverPointsTitles.appendChild(newChild3);

                newChild4.setAttribute("class", "game-over__points-right");
                if (inndex >= Number(numberOfPlayers.innerHTML)) {
                  newChild4.style.color = "transparent";
                  newChild4.style.userSelect = "none";
                  newChild4.style.pointerEvents = "none";
                  newChild4.style.border = "none";
                }
                newChild4.innerHTML = aggregatedPoints[inndex];
                gameOverPointsTitles.appendChild(newChild4);
              }
            }
            currentPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            gameOverScreen.style.display = "flex";
            if (Number(numberOfPlayers.innerHTML) > 1) {
              gameOverOnePlayer.style.display = "none";
            } else {
              gameOverMorePlayers.style.display = "none";
            }
            players.style.pointerEvents = "all";
            afterGame();
          }
          if (!plusThreeNoShuffled) {
            for (let ii = 0; ii < 3; ii++) {
              if (cardsShuffled.length == 0) {
                document
                  .querySelectorAll("#main__cards-container img")
                  .forEach((x, j) => {
                    if (x.src.slice(-8) === selectedCards[ii]) {
                      x.src = "res/cards/no-more-card.png";
                      x.style.cursor = "no-drop";
                      x.style.pointerEvents = "none";
                      onFieldCards[j].src = "no-more-card.png";
                      onFieldCards[j].color = "off";
                      onFieldCards[j].content = "off";
                      onFieldCards[j].num = "off";
                      onFieldCards[j].shape = "off";
                    }
                  });
              }
            }
          }
          const playerButtons = document.querySelectorAll(
            ".main__left-sidebar-player"
          );
          if (Number(numberOfPlayers.innerHTML) > 1) {
            playerButtons.forEach((x) => {
              x.style.pointerEvents = "all";
              x.style.color = "black";
              x.style.cursor = "pointer";
            });
            players.style.pointerEvents = "all";
          }
          if (cardsShuffled.length > 2) {
            threeCardButton.style.cursor = "pointer";
          } else {
            threeCardButton.style.cursor = "no-drop";
            threeCardButton.disabled = true;
          }
          playerDisabled = false;
          enabledPlayers = Number(numberOfPlayers.innerHTML);
          remainingCards.innerHTML = cardsShuffled.length;
        } else {
          const playerNum =
            currentPlayer.charAt(currentPlayer.length - 1) == "0"
              ? "10"
              : currentPlayer.charAt(currentPlayer.length - 1);
          const currPlayerButton = document.querySelector(
            "#player" + playerNum
          );
          if (Number(numberOfPlayers.innerHTML) > 1) {
            players.style.pointerEvents = "none";
            currPlayerButton.style.pointerEvents = "none";
            currPlayerButton.style.color = "gray";
            currPlayerButton.style.cursor = "no-drop";
            playerDisabled = true;
          }
          if (Number(numberOfPlayers.innerHTML) > 1) enabledPlayers--;
          if (enabledPlayers == 0) {
            const playerButtons = document.querySelectorAll(
              ".main__left-sidebar-player"
            );
            players.style.pointerEvents = "all";
            playerButtons.forEach((x) => {
              console.log("inside img");
              x.style.pointerEvents = "all";
              x.style.color = "black";
              x.style.cursor = "pointer";
            });
            enabledPlayers = Number(numberOfPlayers.innerHTML);
            playerDisabled = false;
          }
          if (currentPoints[num] > 0) {
            currentPoints[num]--;
            player.innerHTML = currentPoints[num];
          }
        }
        if (Number(numberOfPlayers.innerHTML) > 1) cardsActive = false;
        clickedCardCounter = 0;
        document
          .querySelectorAll("#main__cards-container img")
          .forEach((x) => (x.style.boxShadow = ""));
        selectedCards = [];
      }
    }
  });
  cardsContainer.appendChild(img);
  enabledPlayers = Number(numberOfPlayers.innerHTML);
};

const resetEverything = () => {
  numberOfPlayers = document.querySelector("#menu__player-number-text");
  players = document.querySelector("#main__left-sidebar-players");
  cardsContainer = document.querySelector("#main__cards-container");
  while (cardsContainer.firstChild) {
    cardsContainer.removeChild(cardsContainer.lastChild);
  }
  while (players.firstChild) {
    players.removeChild(players.lastChild);
  }
  gameFinished = false;
  playerDisabled = false;
  enabledPlayers = Number(numberOfPlayers.innerHTML);
  numOfFieldCards = 12;
  onFieldCards = [];
  plusThreeNoShuffled = false;
  timer.innerHTML = 10;
};

const afterGame = () => {
  playerTime = document.querySelector("#game-over__onePlayer-time");
  playerTime.innerHTML = timer.innerHTML + " mp alatt végeztél";
  playerPoints = document.querySelector("#game-over__onePlayer-points");
  thisPlayer = document.querySelector("#player-points1");
  playerPoints.innerHTML = thisPlayer.innerHTML;
  firstGame = false;
  clearInterval(showSetInterval);
  clearInterval(multiPlayerInterval);
  clearInterval(showHelpSetInterval);
  clearInterval(onePlayerInterval);
  resetEverything();
};

const createDeck = () => {
  return diffRadio.checked
    ? cards
        .filter((a) => a.content === "solid")
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)
    : cards
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
};

const changeScoreView = () => {
  if (!radioActual.checked) {
    radioActual.checked = true;
    for (let i = 0; i < Number(numberOfPlayers.innerHTML); i++) {
      let str = "#player-points" + (i + 1);
      tempPlayer = document.querySelector(str);
      tempPlayer.innerHTML = currentPoints[i];
    }
  }
};
