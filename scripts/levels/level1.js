let backgroundObjects = [];

for(let i = 0; i < 7; i++) {
  let x = i * 720; 

  let imageNumber;
    if (i % 2 === 0) {
     imageNumber = 1;
    } else {
    imageNumber = 2;
  }
  backgroundObjects.push(new Background('img/5_background/layers/air.png', x, 0)); 
  backgroundObjects.push(new Background(`img/5_background/layers/3_third_layer/${imageNumber}.png`, x, 0));
  backgroundObjects.push(new Background(`img/5_background/layers/2_second_layer/${imageNumber}.png`, x, 0));
  backgroundObjects.push(new Background(`img/5_background/layers/1_first_layer/${imageNumber}.png`, x, 0));
}

let chickens = [];

for(let i = 0; i < 6; i++) {
  let x = 800 + (i * 650) + Math.random() * 200; // Startwert + (i * Abstand) + zuflligkeit
  chickens.push(new Chicken(x)); 
}

let bottles = [];

for(let i = 0; i < 10; i++ ){
  let x = 300 + (i * 350) + Math.random() * 150; 
  bottles.push(new SalsaBottle(x)); 
}

let clouds = []; // ich brauche 20 Blöcke von Clouds

for(let i = 0; i <= 21; i++) {
  let x = i * 250; 
  clouds.push(new Cloud(x)); 
}


const level1 = new Level(
  chickens,
  new Endboss(),
  bottles, 
  clouds, 
  backgroundObjects,
  5000,  // Länge des Levels
);

/*
bottles = [
    new SalsaBottle(), 
    new SalsaBottle(),
    new SalsaBottle(),
    new SalsaBottle(),
    new SalsaBottle(),
    new SalsaBottle(),
    new SalsaBottle(),
    new SalsaBottle(),
    new SalsaBottle(),
    new SalsaBottle(),
   ]
  */


// Welche Gegner gibt es?
// Welche Coins gibt es?
// Welche Bottles gibt es?
// Welche Backgrounds gibt es?
// Wo endet das Level?

/*
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
    new Background('img/5_background/layers/air.png', 2160, 0),
    new Background('img/5_background/layers/3_third_layer/1.png', 2160, 0),
    new Background('img/5_background/layers/2_second_layer/1.png', 2160, 0),
    new Background('img/5_background/layers/1_first_layer/1.png', 2160, 0),
    new Background('img/5_background/layers/air.png', 2880, 0),
    new Background('img/5_background/layers/3_third_layer/1.png', 2880, 0),
    new Background('img/5_background/layers/2_second_layer/1.png', 2880, 0),
    new Background('img/5_background/layers/1_first_layer/1.png', 2880, 0),
    new Background('img/5_background/layers/air.png', 3600, 0),
    new Background('img/5_background/layers/3_third_layer/1.png', 3600, 0),
    new Background('img/5_background/layers/2_second_layer/1.png', 3600, 0),
    new Background('img/5_background/layers/1_first_layer/1.png', 3600, 0),
    new Background('img/5_background/layers/air.png', 4320, 0),
    new Background('img/5_background/layers/3_third_layer/1.png', 4320, 0),
    new Background('img/5_background/layers/2_second_layer/1.png', 4320, 0),
    new Background('img/5_background/layers/1_first_layer/1.png', 4320, 0),
    new Background('img/5_background/layers/air.png', 5040, 0),
    new Background('img/5_background/layers/3_third_layer/1.png', 5040, 0),
    new Background('img/5_background/layers/2_second_layer/1.png', 5040, 0),
    new Background('img/5_background/layers/1_first_layer/1.png', 5040, 0),
  ],
  // Aufgabe ---> SChleife erstellen und jedes Mal aufssummieren!
*/ 
