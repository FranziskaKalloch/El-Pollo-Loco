class Chicken extends MoveAbleObject {
  constructor(y) {
    super(); // super() ruft zuerst den Konstruktor der Elternklasse auf
    this.x = 200 + Math.random() * 500; // Jedes Chicken bekommt eine zufällig Zahl zugewiesen // gibt eine Zahl zwischen 0 und 500
    this.y = 350;
    this.width = 100;
    this.height = 100;
    this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
  }
}
