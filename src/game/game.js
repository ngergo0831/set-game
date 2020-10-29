const players = document.querySelector("#main__left-sidebar-players");

btnStart.addEventListener("click", () => {
  render();
});

const render = () => {
  let clickedCardCounter = 0;
  let cardsActive = false;
  const cardsContainer = document.querySelector("#main__cards-container");
  for (let i = 0; i < Number(playerText.innerHTML); i++) {
    const player = document.createElement("BUTTON");
    player.setAttribute("class", "main__left-sidebar-player");
    player.setAttribute("id", "player" + (i + 1));
    player.innerHTML = "player" + (i + 1) + "0";
    player.addEventListener("click", () => {
      let clickedCardCounter = 0;
      startTimer();
      cardsActive = true;
    });
    players.appendChild(player);
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
          if (checkSet(selectedCards)) {
            console.log("SET");
            //player.points++ , remove()
          } else {
            //player.points--
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

  const startTimer = () => {};

  const isSetButton = document.querySelector(
    "#main__right-sidebar-isSetButton"
  );

  isSetButton.addEventListener("click", () =>
    helpSet() ? alert("van") : alert("nincs")
  );

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

  const showSet = () => {
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
              "-3px -3px 30px 3px red, 3px 3px 30px 3px blue";
            const second = document.querySelector(
              `img[src='res/cards/${onFieldCards[j].src}']`
            );
            second.style.boxShadow =
              "-3px -3px 30px 3px red, 3px 3px 30px 3px blue";
            const third = document.querySelector(
              `img[src='res/cards/${onFieldCards[k].src}']`
            );
            third.style.boxShadow =
              "-3px -3px 30px 3px red, 3px 3px 30px 3px blue";
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
    const mainCardsImg = document.querySelectorAll(
      "#main__cards-container img"
    );
    mainCardsImg.forEach((x) => (x.style.width = "70%"));
    threeCardButton.style.cursor = "no-drop";
    threeCardButton.disabled = true;
  });
};

//let onFieldCards = cardsShuffled.slice(0, 12);
