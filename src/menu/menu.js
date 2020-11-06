const subBtn = document.querySelector("#menu__playerNumSub");
const addBtn = document.querySelector("#menu__playerNumAdd");
const playerText = document.querySelector("#menu__player-number-text");

subBtn.disabled = true;

let playerNames = [
  "player1",
  "player2",
  "player3",
  "player4",
  "player5",
  "player6",
  "player7",
  "player8",
  "player9",
  "player10",
];

subBtn.addEventListener("click", () => {
  addBtn.disabled = false;
  addBtn.style.cursor = "pointer";
  if (Number(playerText.innerHTML) !== 1)
    playerText.innerHTML = Number(playerText.innerHTML) - 1;
  if (Number(playerText.innerHTML) === 1) {
    subBtn.style.cursor = "no-drop";
    subBtn.disabled = true;
  }
});

addBtn.addEventListener("click", () => {
  subBtn.disabled = false;
  subBtn.style.cursor = "pointer";
  if (Number(playerText.innerHTML) !== 10)
    playerText.innerHTML = Number(playerText.innerHTML) + 1;
  if (Number(playerText.innerHTML) === 10) {
    addBtn.style.cursor = "no-drop";
    addBtn.disabled = true;
  }
});

const menu = document.querySelector("#menu");
const settings = document.querySelector("#menu-settings");
const settingsBtn = document.querySelector("#menu__subSettings");
settingsBtn.addEventListener("click", () => {
  menu.style.display = "none";
  settings.style.display = "flex";
});

const btnStart = document.querySelector("#menu__btnStart");
const mainScreen = document.querySelector("#main");
btnStart.addEventListener("click", () => {
  menu.style.display = "none";
  mainScreen.style.display = "grid";
});

const btnBack = document.querySelector("#menu-settings-btnBack");
btnBack.addEventListener("click", () => {
  settings.style.display = "none";
  menu.style.display = "grid";
});

const btnRules = document.querySelector("#menu__subRules");
const rules = document.querySelector("#menu-rules");
btnRules.addEventListener("click", () => {
  menu.style.display = "none";
  rules.style.display = "flex";
});

const btnRulesBack = document.querySelector("#menu-rules-btnBack");
btnRulesBack.addEventListener("click", () => {
  rules.style.display = "none";
  menu.style.display = "grid";
});

const playerSet = document.querySelector("#menu-settings-player-names");
const playerNameSet = document.querySelector("#menu-player-names");
playerSet.addEventListener("click", () => {
  settings.style.display = "none";
  playerNameSet.style.display = "flex";
});

const btnPlayerBack = document.querySelector("#menu-settings-playerBackButton");
btnPlayerBack.addEventListener("click", () => {
  settings.style.display = "flex";
  playerNameSet.style.display = "none";
});

const playerNameText = document.querySelectorAll(".menu-settings-players");
playerNameText.forEach((x, i) => {
  let input = document.createElement("INPUT");
  input.setAttribute("class", "menu-settings-player");
  input.setAttribute("maxlength", "15");
  input.value = playerNames[i];
  input.style = "text-align:center;";
  input.addEventListener("input", (x) => {
    if (input.value.length > 0) {
      btnPlayerBack.disabled = false;
      btnPlayerBack.style.borderColor = "black";
      input.style.borderColor = "black";
    } else {
      btnPlayerBack.disabled = true;
      btnPlayerBack.style.borderColor = "#1010104D";
      input.style.borderColor = "red";
    }
    playerNames[i] = input.value;
    input.value = playerNames[i];
  });
  x.appendChild(input);
});
