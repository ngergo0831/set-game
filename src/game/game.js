const players = document.querySelector("#main__left-sidebar-players");
const showSetButton = document.querySelector(
  "#main__right-sidebar-showSetButton"
);
const threeCardButton = document.querySelector(
  "#main__right-sidebar-threeCardButton"
);
const isSetButton = document.querySelector("#main__right-sidebar-isSetButton");
const remainingCards = document.querySelector("#main__right-sidebar-remaining");
const numberOfPlayers = document.querySelector("#menu__player-number-text");
const timer = document.querySelector("#main__left-sidebar-timer");
const timerText = document.querySelector("#main__left-sidebar-remainingTime");

let gameFinished = false;
let playerDisabled = false;
let enabledPlayers = Number(numberOfPlayers.innerHTML);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const timerOnePlayer = async () => {
  timer.innerHTML = 0;
  timerText.innerHTML = "Eltelt idő";
  //while !end
  while (!gameFinished) {
    await sleep(1000);
    timer.innerHTML = Number(timer.innerHTML) + 1;
  }
};

btnStart.addEventListener("click", () => {
  render();
});

const render = () => {
  showSetButton.disabled = radioShowSetNo.checked;
  threeCardButton.disabled = radioThreeCardYes.checked;
  isSetButton.disabled = radioIsSetNo.checked;
  let clickedCardCounter = 0;
  let cardsActive = false;
  let currentPlayer = "";
  if (Number(numberOfPlayers.innerHTML) == 1) timerOnePlayer();
  const cardsContainer = document.querySelector("#main__cards-container");
  for (let i = 0; i < Number(playerText.innerHTML); i++) {
    const player = document.createElement("BUTTON");
    player.setAttribute("class", "main__left-sidebar-player");
    player.setAttribute("id", "player" + (i + 1));
    player.innerHTML = playerNames[i];
    player.addEventListener("click", () => {
      clickedCardCounter = 0;
      cardsActive = true;
      currentPlayer = "player-points" + (i + 1);
      player.style.color = "blue";
      if (Number(numberOfPlayers.innerHTML) > 1) startTimer(player);
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

  const diffRadio = document.querySelector("#menu__difficulty-radioBeginner");

  let cardsShuffled = diffRadio.checked
    ? cards
        .filter((a) => a.content === "solid")
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)
    : cards
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
  let selectedCards = [];
  let onFieldCards = cardsShuffled.slice(0, 12);
  cardsShuffled = cardsShuffled.slice(12);
  console.log("Pakliban lévő kártyák:");
  console.log(cardsShuffled);
  const createCards = (card, i) => {
    const img = document.createElement("IMG");
    img.setAttribute("src", "res/cards/" + card.src);
    img.setAttribute("id", "card" + i);
    img.addEventListener("click", () => {
      if (cardsActive) {
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
          if (checkSet(selectedCards)) {
            console.log("SET");
            player.innerHTML = Number(player.innerHTML) + 1;
            for (let i = 0; i < 3; i++) {
              onFieldCards.forEach((x, j) => {
                if (x.src === selectedCards[i]) {
                  if (cardsShuffled.length == 0) {
                    onFieldCards[j].src = "no-more-card.png";
                    onFieldCards[j].color = "off";
                    onFieldCards[j].content = "off";
                    onFieldCards[j].num = "off";
                    onFieldCards[j].shape = "off";
                  } else {
                    onFieldCards[j] = cardsShuffled[0];
                    cardsShuffled = cardsShuffled.slice(1);
                  }
                }
              });
            }
            for (let i = 0; i < 3 && cardsShuffled.length != 0; i++) {
              document
                .querySelectorAll("#main__cards-container img")
                .forEach((x, j) => {
                  if (x.src.slice(-8) === selectedCards[i]) {
                    x.src = "res/cards/" + onFieldCards[j].src;
                  }
                });
            }
            for (let i = 0; i < 3; i++) {
              if (cardsShuffled.length == 0) {
                document
                  .querySelectorAll("#main__cards-container img")
                  .forEach((x, j) => {
                    if (x.src.slice(-8) === selectedCards[i]) {
                      x.src = "res/cards/no-more-card.png";
                      x.style.cursor = "no-drop";
                      x.style.pointerEvents = "none";
                      onFieldCards[j].src = "no-more-card.png";
                      onFieldCards[j].color = "off";
                      onFieldCards[j].content = "off";
                      onFieldCards[j].num = "off";
                      onFieldCards[j].shape = "off";
                      threeCardButton.disabled = true;
                    }
                  });
              }
            }
            const playerButtons = document.querySelectorAll(
              ".main__left-sidebar-player"
            );
            playerButtons.forEach((x) => {
              x.style.pointerEvents = "all";
              x.style.color = "black";
              x.style.cursor = "pointer";
            });
            playerDisabled = false;
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
              playerButtons.forEach((x) => {
                x.style.pointerEvents = "all";
                x.style.color = "black";
                x.style.cursor = "pointer";
              });
              enabledPlayers = Number(numberOfPlayers.innerHTML);
              playerDisabled = false;
            }
            if (Number(player.innerHTML) > 0)
              player.innerHTML = Number(player.innerHTML) - 1;
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

  onFieldCards.forEach((card, i) => createCards(card, i));

  const checkSet = (selectedCards) => {
    const cardsDetails = selectedCards.map(
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
      num.size !== 2 &&
      color.size !== 2 &&
      shape.size !== 2 &&
      content.size !== 2
    );
  };

  remainingCards.innerHTML = cardsShuffled.length;

  const showHelpSet = async () => {
    isSetButton.innerHTML = helpSet() ? "Van" : "Nincs";
    await sleep(3000);
    isSetButton.innerHTML = "Van SET a leosztásban?";
  };

  const startTimer = async (cplayer) => {
    let player = document.querySelector("#" + currentPlayer);
    let currPoints = Number(player.innerHTML);
    showSetButton.disabled = true;
    isSetButton.disabled = true;
    threeCardButton.disabled = true;
    playerDisabled = false;
    for (let i = 9; i >= 0 && cardsActive; i--) {
      timer.innerHTML = i;
      players.style.pointerEvents = "none";
      if (i == 0 && Number(numberOfPlayers.innerHTML) > 1) {
        playerDisabled = true;
        enabledPlayers--;
      }
      await sleep(1000);
    }
    players.style.pointerEvents = "auto";
    timer.innerHTML = 10;
    cardsActive = false;
    showSetButton.disabled = false;
    isSetButton.disabled = false;
    if (cardsShuffled.length !== 0) threeCardButton.disabled = false;
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
      enabledPlayers = Number(numberOfPlayers.innerHTML);
      playerDisabled = false;
    }
    if (Number(player.innerHTML) > 0 && Number(player.innerHTML) == currPoints)
      player.innerHTML = Number(player.innerHTML - 1);
  };

  isSetButton.addEventListener("click", showHelpSet);

  const helpSet = () => {
    for (let i = 0; i < 12; i++) {
      for (let j = i + 1; j < 12; j++) {
        for (let k = j + 1; k < 12; k++) {
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

  const showSet = async () => {
    const tempPlayers = document.querySelectorAll(
      "#main__left-sidebar-players button"
    );
    tempPlayers.forEach((x) => (x.style.pointerEvents = "none"));
    let cond = true;
    for (let i = 0; i < 12 && cond; i++)
      for (let j = i + 1; j < 12 && cond; j++)
        for (let k = j + 1; k < 12 && cond; k++)
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
              await sleep(2000);
              first.style.boxShadow = "";
              second.style.boxShadow = "";
              third.style.boxShadow = "";
              cond = false;
              tempPlayers.forEach((x) => (x.style.pointerEvents = "auto"));
            }
  };

  showSetButton.addEventListener("click", showSet);
  threeCardButton.addEventListener("click", () => {
    for (let i = 0; i < 3; i++) {
      createCards(cardsShuffled[i], i + 13);
      onFieldCards.push(cardsShuffled[i]);
      cardsShuffled = cardsShuffled.slice(1);
    }
    remainingCards.innerHTML = cardsShuffled.length;
    const mainCardsImg = document.querySelectorAll(
      "#main__cards-container img"
    );
    mainCardsImg.forEach((x) => (x.style.width = "80%"));
    threeCardButton.style.cursor = "no-drop";
    threeCardButton.disabled = true;
  });
};
