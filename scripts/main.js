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
let fullscreenButton = document.getElementById("toggleFullscreenButton");
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
    gamePaused = false;
    sound.play("click");
    startScreen.classList.add("hidden");
    game.classList.remove("hidden");
    document.getElementById("impressum").classList.add("hidden");
    sound.stopStartScreenMusic();
    sound.playBackgroundMusic();
    initLevel();
    init();
  });
}

/**
 * Restarts the current game session.
 * Resets screens, intervals, pause state and background music.
 */
function restartGame() {
  clearAllIntervals();
  resetGameSounds();
  gamePaused = false;
  pauseOverlay.classList.add("hidden");
  gameOverScreen.classList.add("hidden");
  winScreen.classList.add("hidden");
  game.classList.remove("hidden");
  startScreen.classList.add("hidden");
  sound.playBackgroundMusic();
  initLevel();
  init();
}

/**
 * Stops all active game sounds
 * and resets the snoring state.
 */
function resetGameSounds() {
  if (world && world.sound) {
    world.sound.stopBackgroundMusic();
    world.sound.stopSnoreSound();
  }
  sound.stopBackgroundMusic();
  sound.stopSnoreSound();
  if (world && world.character) {
    world.character.isSnoring = false;
  }
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
  clearAllIntervals();
  resetGameSounds();
  settings.close();
  gamePaused = true;
  sound.stopSnoreSound();
  pauseOverlay.classList.add("hidden");
  gameOverScreen.classList.add("hidden");
  winScreen.classList.add("hidden");
  game.classList.add("hidden");
  startScreen.classList.remove("hidden");
  document.getElementById("impressum").classList.remove("hidden");
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
    sound.stopSnoreSound();
    settingsMenubutton.classList.remove("hidden");
    openDialog(settings);
  });
  closeSettingsButton.addEventListener("click", () => {
    sound.play("click");
    closeDialog(settings);
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
 * Adds touch controls for mobile devices.
 */
function bindTouchButtons() {
  bindTouchButton("btnLeft", "LEFT");
  bindTouchButton("btnRight", "RIGHT");
  bindTouchButton("btnJump", "SPACE");
  bindTouchButton("btnThrow", "D");
}

/**
 * Connects a touch button with a keyboard action.
 *
 * @param {string} buttonId - The id of the touch button.
 * @param {string} key - The keyboard property to control.
 */
function bindTouchButton(buttonId, key) {
  let button = document.getElementById(buttonId);

  button.addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard[key] = true;
  });

  button.addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard[key] = false;
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
bindTouchButtons();
