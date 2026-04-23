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

function isAboveGround() {
  return this.y < 180;
}
