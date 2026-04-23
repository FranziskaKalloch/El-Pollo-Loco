class MoveAbleObject {
  x = 120;
  y = 150;
  img;
  height = 300;
  width = 150;
  imageCache = []; // ein Speicher von Bildern
  speed;
  otherDirection = false;
  energy = 100; 
  

  // loadImage('img/test.png')
  loadImage(path) {
    this.img = new Image(); // ist das gleich wie, this.img = document.getElementById('image');
    this.img.src = path;
  }

  moveRight() {
    console.log('moving right');
  }

  moveLeft() {}

  

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
  
}

isHurt() {
// „Wurde ich gerade erst getroffen?“
}

isDead() {
// 👉 „Ist meine Energie bei 0 oder darunter?“

//Das brauchst du für:

//* Tod
//* Game Over
//* Death Animation
//* Gegner stirbt
}




}
// Funktion prüft: Berühren / überlappen sich zwei Rechtecke?
// Bedingung 1

//Pepe rechte Seite ist rechts von Gegner linker Seite

//Bedingung 2
//Pepe untere Seite ist unter Gegner oberer Seite

//Bedingung 3
//Pepe linke Seite ist links von Gegner rechter Seite

//Bedingung 4
//Pepe obere Seite ist über Gegner unterer Seite

//Nur dann überlappen sie sich.
