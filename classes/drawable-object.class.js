class DrawableObject { // Übergeordnetes Objekt von MoveAbleObject

img;
imageCache = []; // ein Speicher von Bildern

 // loadImage('img/test.png')
  loadImage(path) {
    this.img = new Image(); // ist das gleich wie, this.img = document.getElementById('image');
    this.img.src = path;
  }

   loadImages(array) {
    for (let index = 0; index < array.length; index++) {
      let path = array[index]; // hier wird der aktuelle Bildname gespeichert 
      let image = new Image(); // hier wird ein Bildobjekt erstellt
      image.src = path; // hier wird das Bild geladen 
      this.imageCache[path] = image; // speichert das Bild unter diesen Namen 
    }
  }
  }




