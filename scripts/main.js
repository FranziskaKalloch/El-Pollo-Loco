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
let intervalIds = [];

/**
 * Starts the start screen music after the first user interaction.
 * Music is only played if the start screen is currently visible.
 */
function playStartScreenMusic() {
  startScreen.addEventListener(
    "click",
    () => {
      if (!startScreen.classList.contains("hidden")) {
        sound.playStartScreenMusic();
      }
    },
    { once: true },
  );
}

/**
 * Initializes the start button and starts the game.
 * Resets active intervals, hides the start screen,
 * starts background music and initializes the game world.
 */
function startGame() {
  let startGame = document.getElementById("startButton");
  startGame.addEventListener("click", () => {
    clearAllIntervals();
    sound.play("click");
    startScreen.classList.add("hidden");
    game.classList.remove("hidden");
    sound.stopStartScreenMusic();
    sound.playBackgroundMusic();
    init();
  });
}

/**
 * Restarts the current game session.
 * Resets screens, intervals, pause state and background music.
 */
function restartGame() {
  clearAllIntervals();
  gameOverScreen.classList.add("hidden");
  winScreen.classList.add("hidden");
  game.classList.remove("hidden");
  startScreen.classList.add("hidden");
  gamePaused = false;
  sound.stopBackgroundMusic();
  sound.playBackgroundMusic();
  init();
}

/**
 **Clears all active intervals stored in the intervalIds array.
 */
function clearAllIntervals() {
  intervalIds.forEach(clearInterval);
  intervalIds = [];
}

/**
 * Opens the main menu and hides all active game screens.
 */
function showMainMenu() {
  settings.close();
  gameOverScreen.classList.add("hidden");
  winScreen.classList.add("hidden");
  game.classList.add("hidden");
  startScreen.classList.remove("hidden");
}

/**
 * Adds click event listeners to menu and restart buttons.
 * Handles navigation back to the main menu and restarting the game.
 */
function manageScreenButtons() {
  let menuButton = document.querySelectorAll(".menu-btn");
  for (let menu of menuButton) {
    menu.addEventListener("click", showMainMenu);
  }
  for (let menu of menuButton) {
    menu.addEventListener("click", showMenuWithSound);
  }

  let restartButton = document.querySelectorAll(".restart-button");
  for (let restart of restartButton) {
    restart.addEventListener("click", restartGameWithSound);
  }
}

/**
 * Handles opening and closing of the introduction dialog.
 * Plays a click sound when interacting with the dialog buttons.
 */
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


/**
 * Handles the settings dialog behavior.
 * Shows or hides the main menu button depending on whether
 * the settings dialog was opened from the start screen or during gameplay.
 */
function manageSettings() {
  let settingsMenubutton = document.getElementById("settingsMenuButton"); 
  settingsButton.addEventListener("click", () => {
    sound.play("click");
    settingsMenubutton.classList.add("hidden"); 
    openDialog(settings);
  });

  gameSettingsButton.addEventListener("click", () => {
    sound.play("click");
    gamePaused = true;
    settingsMenubutton.classList.remove("hidden"); 
    openDialog(settings);
  });

  closeSettingsButton.addEventListener("click", () => {
    sound.play("click");
    closeDialog(settings);
    gamePaused = false;
  });
}

/**
 * Plays a click sound and restarts the game.
 */
function restartGameWithSound() {
  sound.play("click");
  restartGame();
}

/**
 * Plays a click sound and opens the main menu.
 */
function showMenuWithSound() {
  sound.play("click");
  showMainMenu();
}

/**
 * Handles music volume changes via the volume slider.
 * Updates the background music volume dynamically.
 */
function manageMusicVolume() {
  let slider = document.getElementById("musicVolume");
  slider.addEventListener("input", () => {
    let sliderValue = Number(slider.value);
    sound.setMusicVolume(sliderValue);
  });
}

/**
 * Handles muting and unmuting of sound effects and music.
 * Updates the button appearance depending on the mute state.
 */
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

/**
 * Updates the visual button style depending on the mute state.
 *
 * @param {HTMLElement} button - The button element to update.
 * @param {boolean} isMuted - Indicates whether the sound is muted.
 */
function setButtonColor(button, isMuted) {
  if (isMuted) {
    button.classList.add("btn-muted");
  } else {
    button.classList.remove("btn-muted");
  }
}

/**
 * Opens a dialog element and resets its scroll position.
 *
 * @param {HTMLDialogElement} dialog - The dialog element to open.
 */
function openDialog(dialog) {
  dialog.showModal();
  dialog.scrollTop = 0;
}

/**
 * Closes a dialog element.
 *
 * @param {HTMLDialogElement} dialog - The dialog element to close.
 */
function closeDialog(dialog) {
  dialog.close();
}

/**
 * Closes dialogs when the user clicks outside the dialog content area.
 */
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

/**
* Initializes the fullscreen button for the canvas element.
*/
function fullScreen() {
  let canvas = document.getElementById("canvas");
  let fullScreenButton = document.getElementById("fullscreen-btn");

  fullScreenButton.addEventListener("click", () => {
    enterFullscreen(canvas);
  });
}

/**
* Requests fullscreen mode for the given element.
* Includes browser-specific fallbacks.
*
* @param {HTMLElement} element - The element that should enter fullscreen mode.
*/
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullScreen) {
    element.msRequestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}

/**
 * Exits fullscreen mode.
 * Includes browser-specific fallback support.
 */
function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullScreen) {
    document.webkitExitFullScreen();
  }
}

/**
 * Adds touch controls for mobile devices.
 * Handles movement, jumping and throwing actions via touch events.
 */
function bindTouchButtons() {
  document.getElementById("btnLeft").addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.LEFT = true;
  });

  document.getElementById("btnLeft").addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.LEFT = false;
  });

  document
    .getElementById("btnRight")
    .addEventListener("touchstart", (event) => {
      event.preventDefault();
      keyboard.RIGHT = true;
    });

  document.getElementById("btnRight").addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById("btnJump").addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.SPACE = true;
  });

  document.getElementById("btnJump").addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.SPACE = false;
  });

  document
    .getElementById("btnThrow")
    .addEventListener("touchstart", (event) => {
      event.preventDefault();
      keyboard.D = true;
    });

  document.getElementById("btnThrow").addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.D = false;
  });
}

startGame();
manageIntroduction();
manageSettings();
manageMusicVolume();
muteSoundsAndMusic();
closeDialogOutside();
manageScreenButtons(); 
playStartScreenMusic();
fullScreen(); 
