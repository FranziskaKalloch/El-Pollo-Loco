class MoveAbleObject {
  x = 120;
  y = 150;
  img;
  height = 300;
  width = 150;
  imageCache = []; // ein Speicher von Bildern

  // loadImage('img/test.png')
  loadImage(path) {
    this.img = new Image(); // ist das gleich wie, this.img = document.getElementById('image');
    this.img.src = path;
  }
  moveRight() {
    console.log('moving right');
  }

  moveLeft() {}
}
