const cardsShuffled = cards
  .map((a) => ({ sort: Math.random(), value: a }))
  .sort((a, b) => a.sort - b.sort)
  .map((a) => a.value);

const cardsContainer = document.querySelector("#main__cards-container");
for (let i = 0; i < 12; i++) {
  const img = document.createElement("IMG");
  img.setAttribute("src", "res/cards/" + cardsShuffled[i].src);
  img.setAttribute("id", "card" + i);
  cardsContainer.appendChild(img);
}
