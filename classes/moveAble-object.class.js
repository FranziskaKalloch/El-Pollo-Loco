class MoveableObject extends DrawableObject {
  x = 120;
  y = 150;
  groundY = 150; 
  height = 300;
  width = 150;

  currentImage = 0;
  speed;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  energy = 100; 
  lastHit = 0; 

  offset = { 
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  }

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
        this.y = this.groundY; // „Bleib optisch hier stehen.“
        this.speedY = 0; // „Die Fallbewegung ist wirklich beendet.“
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if(this instanceof ThrowableObject) {
      return true }
    return this.y < this.groundY; // Pepe ist in der Luft, wenn seine y-Position kleiner als 150 ist -- 150 = Bodenhöhe - und alles dadrüber ist unter dem Boden
  
  } // gibt ein true zurück // Ja Pepe ist in der Luft

  
  // reine Physik/Geometrie - berühren sich zwei Objekte!
  isColliding(object) {
    return this.x + this.width - this.offset.right > object.x + object.offset.left&& 
    this.y + this.height - this.offset.bottom > object.y + object.offset.top && // this unten + object oben
    this.x + this.offset.left < object.x + object.width - object.offset.right &&
    this.y +this.offset.top < object.y + object.height - object.offset.bottom;
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

// ich bin gerade verletzt und darf keinen neuen Schade für x sekunden bekommen 
isHurt() {  
  let timeSinceLastHit = Date.now() - this.lastHit; 
  return timeSinceLastHit < 1000; 
}

 isDead() {
  return this.energy === 0; 
}

}

