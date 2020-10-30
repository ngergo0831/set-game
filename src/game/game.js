const players = document.querySelector("#main__left-sidebar-players");

btnStart.addEventListener("click", () => {
  render();
});

const render = () => {
  let clickedCardCounter = 0;
  let cardsActive = false;
  let currentPlayer = "";
  const cardsContainer = document.querySelector("#main__cards-container");
  for (let i = 0; i < Number(playerText.innerHTML); i++) {
    const player = document.createElement("BUTTON");
    player.setAttribute("class", "main__left-sidebar-player");
    player.setAttribute("id", "player" + (i + 1));
    player.innerHTML = "player" + (i + 1);
    player.addEventListener("click", () => {
      let clickedCardCounter = 0;
      cardsActive = true;
      currentPlayer = "player-points" + (i + 1);
      startTimer();
    });
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
            //remove()
          } else {
            if (Number(player.innerHTML) > 0)
              player.innerHTML = Number(player.innerHTML) - 1;
          }
          cardsActive = false;
          clickedCardCounter = 0;
          document
            .querySelectorAll("#main__cards-container img")
            .forEach((x) => (x.style.boxShadow = ""));
          selectedCards = [];
        }
      }
    });
    cardsContainer.appendChild(img);
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

  const remainingCards = document.querySelector(
    "#main__right-sidebar-remaining"
  );
  remainingCards.innerHTML = cardsShuffled.length;

  const isSetButton = document.querySelector(
    "#main__right-sidebar-isSetButton"
  );

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const showHelpSet = async () => {
    isSetButton.innerHTML = helpSet() ? "Van" : "Nincs";
    await sleep(3000);
    isSetButton.innerHTML = "Van SET a leosztásban?";
  };

  const timer = document.querySelector("#main__left-sidebar-timer");

  const startTimer = async () => {
    let player = document.querySelector("#" + currentPlayer);
    let currPoints = Number(player.innerHTML);
    for (let i = 9; i >= 0 && cardsActive; i--) {
      timer.innerHTML = i;
      players.style.pointerEvents = "none";
      await sleep(1000);
    }
    players.style.pointerEvents = "auto";
    timer.innerHTML = 10;
    cardsActive = false;
    player = document.querySelector("#" + currentPlayer);
    if (Number(player.innerHTML) > 0 && Number(player.innerHTML) == currPoints)
      player.innerHTML = Number(player.innerHTML - 1);
  };

  isSetButton.addEventListener("click", showHelpSet);

  const helpSet = () => {
    for (let i = 0; i < 12; i++)
      for (let j = i + 1; j < 12; j++)
        for (let k = j + 1; k < 12; k++)
          if (
            checkSet([
              onFieldCards[i].src,
              onFieldCards[j].src,
              onFieldCards[k].src,
            ])
          )
            return true;
    return false;
  };

  const showSetButton = document.querySelector(
    "#main__right-sidebar-showSetButton"
  );

  const showSet = async () => {
    let cond = true;
    for (let i = 0; i < 12 && cond; i++)
      for (let j = i + 1; j < 12 && cond; j++)
        for (let k = j + 1; k < 12 && cond; k++)
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
          }
  };

  showSetButton.addEventListener("click", showSet);

  const threeCardButton = document.querySelector(
    "#main__right-sidebar-threeCardButton"
  );

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
