const cardsShuffled = cards
  .map((a) => ({ sort: Math.random(), value: a }))
  .sort((a, b) => a.sort - b.sort)
  .map((a) => a.value);

const div = document.querySelector("#main__cards-container");
for (let i = 0; i < 12; i++) {
  const x = document.createElement("IMG");
  x.setAttribute("src", "res/cards/" + cardsShuffled[i].src);
  x.setAttribute("id", "card" + i);
  div.appendChild(x);
}
