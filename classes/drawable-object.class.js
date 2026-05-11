class DrawableObject {
  // Übergeordnetes Objekt von MoveAbleObject

  img;
  imageCache = []; // ein Speicher von Bildern

  /**
   * Loads a single image and assigns it to the current object.
   *
   * @param {string} path - The file path of the image.
   */
  loadImage(path) {
    this.img = new Image(); // ist das gleich wie, this.img = document.getElementById('image');
    this.img.src = path;
  }

  /**
   * Loads multiple images into the image cache.
   * Stores each image using its file path as the cache key.
   *
   * @param {Array<string>} array - An array containing image file paths.
   */
  loadImages(array) {
    for (let index = 0; index < array.length; index++) {
      let path = array[index]; // hier wird der aktuelle Bildname gespeichert
      let image = new Image(); // hier wird ein Bildobjekt erstellt
      image.src = path; // hier wird das Bild geladen
      this.imageCache[path] = image; // speichert das Bild unter diesen Namen
    }
  }
}
