// Gravitation
// ... Erdanziehungskraft

// speedY = 0;
// acceleration = 5;

// Wenn ein Objekt fällt, dann beschleunigt es im Fall... es fällt also nicht linear
// das heisst z.B.
// ab der ersten Sekunde hat es einen speedY von 5px
// ab der zweiten Sekunde dann einen speedY von 10px;
// ab der dritten Sekunde einen speedY von 15 px und so weiter

// als erstes setzen wir Pepe nach ganz oben in die LUft, damit wir prüfen können, ob er fällt und weiter
// dabei wird die y-Achse verändert -> y = 20

// function ---> applyGravity

speedY = 0; // wie schnell das Objket nach unten fällt
acceleration = 0; // die Beschleunigung

function gravity() {
  setInterval(() => {
    if (this.y < 180) {
      // damit er auf den Boden fällt und nich aus dem Bild
      this.y -= this.speedY; // wir ziehen die Geschwindigkeit ab
      this.speedY -= this.acceleration; // die Beschleunigung wird von der GEschwindigkeit abgezogen
    }
  }, 1000 / 25); // 25 pro sekunde wird das ausgeführt
}
// jetzt braucht Pepe aber noch andere Animationen
// mit acceleration jetzt ein bisschen ausprobieren, damit die Fallgeschwindikeit passt

// Als nächstes uss man wissen, ob er in der Luft ist oder nicht
// .. die Funktion gibt lediglich den Ausdruck wieder, dass er sich am Boden befinden

function isAboveGround() {
  return this.y < 180;
}
// diesen Ausdruck können wir jetzt in die if Abfrage packen, also die Funktion

//..gravity..
//setInterval
//if(isAboveGround) {}

// diese Abfrage wird öfters benötigt, daher machen wir es einfacher zu lesen

// Grafiken des Charakters ändern
// ... Jump animationen

// KOllision - Linien um Objekte zeichnen

function drawFrame() {
  this.ctx.beginPath();
  this.ctx.lineWidth = 5;
  this.ctx.strokeStyle = 'yellow';
  this.ctx.rect(Object.x, object.y, object.width, object.height);
  this.ctx.stroke();
}


if(character.x + charater.width > Chicken.x && 
    character.y + character.height > Chicken.y &&
    character.x < Chicken.x &&
    character.y < Chicken.y + Chicken.height
  )

  function isColliding(object) {
    return this.x + this.width > object.x &&
      this.y + this.height > object.y &&
      this.x < object.x + object.width &&
      this.y < object.y + object.height
  }


  function isHit() {
    // return energy -= 20; 
  }

  function isHurt() {}

  //Später z. B.:

//* Schaden nur einmal pro Treffer
//* Gegner verliert auch Leben
//* Unterschiedliche Schäden (Chicken vs Boss)