const subBtn = document.querySelector("#menu__playerNumSub");
const addBtn = document.querySelector("#menu__playerNumAdd");
const playerText = document.querySelector("#menu__player-number-text");

subBtn.disabled = true;

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
  settings.style.display = "grid";
});

const btnStart = document.querySelector("#menu__btnStart");
const mainScreen = document.querySelector("#main");
btnStart.addEventListener("click", () => {
    menu.style.display = "none";
    mainScreen.style.display = "grid";
});