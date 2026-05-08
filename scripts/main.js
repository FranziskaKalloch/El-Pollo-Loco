let startScreen = document.getElementById("startScreen");
let game = document.getElementById("gameContainer");
let gameOverScreen = document.getElementById("gameOverScreen");
let winScreen = document.getElementById("winScreen");
let introduction = document.getElementById("introductionDialog");
let settings = document.getElementById("settingsDialog");
let soundButton = document.getElementById("toggleSoundButton");
let musicButton = document.getElementById("toggleMusicButton");
let settingsButton = document.getElementById("settingsButton");
let gameSettingsButton = document.getElementById("gameSettingsButton");
let closeSettingsButton = document.getElementById("closeSettingsButton");
const sound = new Sounds();

let gamePaused = false;

sound.playStartScreenMusic();

function startGame() {
  let startGame = document.getElementById("startButton");
  startGame.addEventListener("click", () => {
    sound.play("click");
    startScreen.classList.add("hidden");
    game.classList.remove("hidden");
    sound.stopStartScreenMusic();
    sound.playBackgroundMusic();
    init();
  });
}

function restartGame() {
  gameOverScreen.classList.add("hidden");
  winScreen.classList.add("hidden");
  game.classList.remove("hidden");
  startScreen.classList.add("hidden");
  gamePaused = false;
  sound.stopBackgroundMusic();
  sound.playBackgroundMusic();
  init(); 
}

function showMainMenu() {
  gameOverScreen.classList.add("hidden");
  winScreen.classList.add("hidden");
  game.classList.add("hidden");
  startScreen.classList.remove("hidden");
}

function manageScreenButtons() {
  let menuButton = document.querySelectorAll(".menu-btn");
  for (let menu of menuButton) {
    menu.addEventListener("click", showMainMenu);
  }
  let restartButton = document.querySelectorAll(".restart-button");
  for (let restart of restartButton) {
    restart.addEventListener("click", restartGame);
  }
}

function manageIntroduction() {
  let introButton = document.getElementById("instructionsButton");
  let closeIntro = document.getElementById("closeIntroductionButton");
  introButton.addEventListener("click", () => {
    sound.play("click");
    openDialog(introduction);
  });
  closeIntro.addEventListener("click", () => {
    sound.play("click");
    closeDialog(introduction);
  });
}

function restartGameWithSound() {
  sound.play("click");
  restartGame();
}

function showMenuWithSound() {
  sound.play("click");
  showMainMenu();
}

function manageSettings() {
  settingsButton.addEventListener("click", () => {
    sound.play("click");
    openDialog(settings);
  });

  gameSettingsButton.addEventListener("click", () => {
    sound.play("click");
    gamePaused = true;
    openDialog(settings);
  });

  closeSettingsButton.addEventListener("click", () => {
    sound.play("click");
    closeDialog(settings);
    gamePaused = false;
  });
}

function openDialog(dialog) {
  dialog.showModal();
}

function closeDialog(dialog) {
  dialog.close();
}

function closeDialogOutside() {
  let dialogRef = document.querySelectorAll(".dialog-close-outside"); // alle Dialoge holen und über alle dialoge loopen, da wir einen Liste zurückbekomme
  for (let dialog of dialogRef) {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  }
}
// Slider holen
// input EventListener setzen
// den aktuellen .value auslesen
// diesen Wert an die Methode weitergeben
function manageMusicVolume() {
  let slider = document.getElementById("musicVolume");
  slider.addEventListener("input", () => {
    let sliderValue = Number(slider.value);
    sound.setMusicVolume(sliderValue);
  });
}

function muteSoundsAndMusic() {
  soundButton.addEventListener("click", () => {
    if (sound.soundMuted) {
      sound.setSoundMuted(false);
      sound.play("click");
    } else {
      sound.play("click");
      sound.setSoundMuted(true);
    }
    setButtonColor(soundButton, sound.soundMuted);
  });
  musicButton.addEventListener("click", () => {
    sound.play("click");
    sound.setMusicMuted(!sound.musicMuted);
    setButtonColor(musicButton, sound.musicMuted);
  });
}

function setButtonColor(button, isMuted) {
  if (isMuted) {
    button.classList.add("btn-muted");
  } else {
    button.classList.remove("btn-muted");
  }
}


startGame();
manageIntroduction();
manageSettings();
manageMusicVolume();
muteSoundsAndMusic();
playGameAgain(); 
closeDialogOutside();
