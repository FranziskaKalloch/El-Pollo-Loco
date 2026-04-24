class MoveAbleObject extends DrawableObject {
  x = 120;
  y = 150;
  height = 300;
  width = 150;
 
  speed;
  otherDirection = false;
  energy = 100; 
  

 
  
  // isColliding (chicken )
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

