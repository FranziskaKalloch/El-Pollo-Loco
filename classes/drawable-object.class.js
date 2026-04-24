class DrawableObject { // Übergeordnetes Objekt von MoveAbleObject
    // loadImage 
    img;
    imageCache = []; // ein Speicher von Bildern
     x = 120;
  y = 150;
  height = 300;
  width = 150;

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

  //loadImage(path) {
    // ein einzelnes Bild laden
    // Bildobjekt erzeugen
    // src setzen
    // in this.img speichern

//loadImages(array) {

    // mehrere Bilder laden
    // durch das Array mit Bildpfaden loopen
    // für jeden Pfad ein neues Image erstellen
    // src setzen
    // Bild im imageCache speichern

  }




