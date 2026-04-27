class MoveableObject extends DrawableObject {
  x = 120;
  y = 150;
  height = 300;
  width = 150;

  currentImage = 0;
  speed;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  energy = 100; 
  lastHit = 0; 

  constructor() {
    super(); 
  }

  // Gravitation darf wirken wenn:
  // 1. Pepe bereits in der Luft ist
  // ODER
  // 2. Pepe gerade nach oben springt (speedY < 0)
  gravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY < 0) {
        this.y = this.y + this.speedY; // Pepe bewegt sich nach unten / y = wo ist Pepe gerade / speedY = wie große Schritte macht er
        this.speedY = this.speedY + this.acceleration; //
      } else {
        this.y = 150; // „Bleib optisch hier stehen.“
        this.speedY = 0; // „Die Fallbewegung ist wirklich beendet.“
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 150; // Pepe ist in der Luft, wenn seine y-Position kleiner als 150 ist -- 150 = Bodenhöhe - und alles dadrüber ist unter dem Boden
  } // gibt ein true zurück // Ja Pepe ist in der Luft

  
  isColliding(object) {
    return this.x + this.width > object.x && 
    this.y + this.height > object.y &&
    this.x < object.x + object.width &&
    this.y < object.y + object.height;
  }



hit() {
// return energy -= 20; 
    //Das ist die Funktion, die Schaden anwendet.
// 1. Schaden bekommen (energy reduzieren)
// // 2. Prüfen: ist Character noch am Leben? // es soll nur abgezogen werden, wenn ernergy über 0 ist
// 3. Hurt-Zustand aktivieren (z.B. Zeitstempel speichern)
// 4. Optional später: Cooldown beachten (nicht mehrfach direkt Schaden bekommen)

 // if() {
  // keine Energie mehr abziehen, wenn energie kleiner 0 sein sollte }
  // } else {
  //.     this.lastHit = new Date().getTime();     } // so speichert man Zeit in Zahlenform  --> Zeitspanne kommt in isHurt()
}


isHurt() {

}

isDead() {

}

  
}


function isHurt() {
// 1. Prüfen: wurde Character vor kurzem getroffen?
  // 2. Vergleich mit Zeit (z.B. letzte Verletzung)
  // 3. true zurückgeben, wenn noch im Hurt-Zustand
  // 4. false zurückgeben, wenn wieder „normal“

  // enstprechende grafik anzeigen --> imagesHurt

  // let timepassed = new Date().getTime() - this.lastHit; // Differenz in millisikunden
  // timepassded = timespassed / 1000; difference in sekunden
  // return timepassed < 5; // das heisst, wenn wir in den letzten 5 Sekunden getroffen wurden, dann gibt die Funktion den Wert true zurück
  // der Zeitraum von 5 sekunden ist aber zu lang
  // besser kleinerer also 1 sekunde

 


function isDead() {
// 1. Prüfen: ist energy <= 0?
  // 2. true zurückgeben, wenn tot
  // 3. false zurückgeben, wenn noch am Leben

// return this.energy === 0; 

// dann kommt in der animate() FUnktion, wenn wir Tod sind, dann kommen andere Bilder
// imagesDead
}

}

