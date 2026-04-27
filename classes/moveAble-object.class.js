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

  
  // reine Physik/Geometrie - berühren sich zwei Objekte!
  isColliding(object) {
    return this.x + this.width > object.x && 
    this.y + this.height > object.y &&
    this.x < object.x + object.width &&
    this.y < object.y + object.height;
  }


// Konsequenz/Reaktion
// ... was passiert, wenn eine Kollision passiert ist?
// Leben abziehen
// Zeit speichern
// später Animation/ Sound 

hit() {
  if(this.energy > 0) {
    this.energy -= 20; 
    this.lastHit = Date.now(); // jetzt wurde ich getroffen, genau in dieser Sekunde 
  }
  if(this.energy < 0) {
    this.energy = 0; 
  }
}

//  Date.now();  // Speichert die aktuelle Zeit in Millisekunden seit 1970 || Date.now() ist dabei die Funktion für die Zeit in ms

// lastHit ----> Speichern Sie die aktuelle Zeit, wenn ein Klick oder eine Aktion stattfindet:

// return energy -= 20; 
// 1. Schaden bekommen (energy reduzieren)
// // 2. Prüfen: ist Character noch am Leben? // es soll nur abgezogen werden, wenn ernergy über 0 ist
// 3. Hurt-Zustand aktivieren (z.B. Zeitstempel speichern)
// 4. Optional später: Cooldown beachten (nicht mehrfach direkt Schaden bekommen)

 // if() {
  // keine Energie mehr abziehen, wenn energie kleiner 0 sein sollte }
  // } else {
  //.     this.lastHit = new Date().getTime();     } // so speichert man Zeit in Zahlenform  --> Zeitspanne kommt in isHurt()


// ich bin gerade verletzt und darf keinen neuen Schade für x sekunden bekommen 
isHurt() {  
  let timeSinceLastHit = Date.now() - this.lastHit; 
  console.log('"Ich BIN gerade noch im Hurt-Zustand"')
  return timeSinceLastHit < 1000; 
}
 

 isDead() {
// 1. Prüfen: ist energy <= 0?
  // 2. true zurückgeben, wenn tot
  // 3. false zurückgeben, wenn noch am Leben

// return this.energy === 0; 

// dann kommt in der animate() FUnktion, wenn wir Tod sind, dann kommen andere Bilder
// imagesDead
}

}

