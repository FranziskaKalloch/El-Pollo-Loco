let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);

  ctx = canvas.getContext('2d');

  console.log('My character is', world.character);
}

window.addEventListener('keydown', (event) => {
  if (event.key == 'ArrowUp') {
    keyboard.UP = true;
    console.log('UP');
  }
  if (event.key == 'ArrowRight') {
    keyboard.RIGHT = true;
    console.log('right');
  }
  if (event.key == 'ArrowLeft') {
    keyboard.LEFT = true;
    console.log('left');
  }
  if (event.code == 'Space') {
    keyboard.SPACE = true;
    console.log('Space');
  }
  if (event.key == 'ArrowDown') {
    keyboard.DOWN = true;
    console.log('down');
  }

  console.log(event);
});
// Browser sag mir Bescheid, wenn irgendeine taste gedrückt wird
// window --- das komplette Browserfenster

// Sobald die Taste wieder losgelassen wird, soll alles wieder auf false gesetzt werden
window.addEventListener('keyup', (event) => {
  if (event.key == 'ArrowUp') {
    keyboard.UP = false;
    console.log('false');
  }
  if (event.key == 'ArrowRight') {
    keyboard.RIGHT = false;
    console.log('false');
  }
  if (event.key == 'ArrowLeft') {
    keyboard.LEFT = false;
    console.log('false');
  }
  if (event.key == 'Space') {
    keyboard.SPACE = false;
    console.log('false');
  }
  if (event.key == 'ArrowDown') {
    keyboard.DOWN = false;
    console.log('false');
  }

  console.log(event);
});
