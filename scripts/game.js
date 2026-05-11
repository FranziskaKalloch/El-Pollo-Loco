let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

/**
 * Initializes the game canvas, world and rendering context.
 * Also activates enemy updates and mobile touch controls.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  ctx = canvas.getContext("2d");
  world.updateEnemies();
  bindTouchButtons();
}

/**
 * Handles keyboard keydown events.
 * Activates movement, jump, throw and pause controls.
 */
window.addEventListener("keydown", (event) => {
  if (event.key == 'ArrowUp') {
    keyboard.UP = true;
  }
  if (event.key == 'ArrowRight') {
    keyboard.RIGHT = true;
  }
  if (event.key == 'ArrowLeft') {
    keyboard.LEFT = true;
  }
  if (event.code == 'Space') {
    event.preventDefault();
    keyboard.SPACE = true;
  }
  if (event.key == 'ArrowDown') {
    keyboard.DOWN = true;
  }
  if(event.code == 'KeyD') {
    keyboard.D = true; 
  }
  if (event.key === "p" || event.key === "P") {
    gamePaused = !gamePaused;
    let pauseOverlay = document.getElementById("pauseOverlay");
    pauseOverlay.classList.toggle("hidden", !gamePaused);
  }
  //console.log(event); 
});

/**
 * Handles keyboard keyup events.
 * Stops movement, jump and throw actions when keys are released.
 */
window.addEventListener("keyup", (event) => {
  if (event.key == 'ArrowUp') {
    keyboard.UP = false;
  }
  if (event.key == 'ArrowRight') {
    keyboard.RIGHT = false;
  }
  if (event.key == 'ArrowLeft') {
    keyboard.LEFT = false;
  }
  if (event.code == 'Space') {
    keyboard.SPACE = false;
  }
  if (event.key == 'ArrowDown') {
    keyboard.DOWN = false;
  }
  if(event.code == 'KeyD') {
    keyboard.D = false; 
  }
});







