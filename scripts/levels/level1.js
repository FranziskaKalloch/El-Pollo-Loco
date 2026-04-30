const level1 = new Level(

  [
    new Chicken(), 
    new Chicken(), 
    new Chicken(), 
  ],

  [
    new Cloud(0), 
    new Cloud(250), 
    new Cloud(450)
  ],
  // Aufgabe:
  // background layers in der richtigen reihenfolge einfügen
  [
    new Background('img/5_background/layers/air.png', 0, 0),
    new Background('img/5_background/layers/3_third_layer/1.png', 0, 0),
    new Background('img/5_background/layers/2_second_layer/1.png', 0, 0),
    new Background('img/5_background/layers/1_first_layer/1.png', 0, 0),
    new Background('img/5_background/layers/air.png', 720, 0),
    new Background('img/5_background/layers/3_third_layer/2.png', 720, 0),
    new Background('img/5_background/layers/2_second_layer/2.png', 720, 0),
    new Background('img/5_background/layers/1_first_layer/2.png', 720, 0),
    new Background('img/5_background/layers/air.png', 1440, 0),
    new Background('img/5_background/layers/3_third_layer/1.png', 1440, 0),
    new Background('img/5_background/layers/2_second_layer/1.png', 1440, 0),
    new Background('img/5_background/layers/1_first_layer/1.png', 1440, 0),
  ],
  // Aufgabe ---> SChleife erstellen und jedes Mal aufssummieren!

  
    5000,  // Länge des Levels
  
  
// Welche Gegner gibt es?
// Welche Coins gibt es?
// Welche Bottles gibt es?
// Welche Backgrounds gibt es?
// Wo endet das Level?
);
