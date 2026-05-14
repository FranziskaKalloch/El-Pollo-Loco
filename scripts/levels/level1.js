let level1;

function initLevel() {
  let backgroundObjects = setBackgroundObjects();
  let enemies = setEnemies();
  let bottles = setBottles();
  let clouds = setClouds();

  level1 = new Level(enemies, bottles, clouds, backgroundObjects, 5000);
}

function setBackgroundObjects() {
  let backgroundObjects = [];

  for (let i = 0; i < 7; i++) {
    let x = i * 720;
    let imageNumber = i % 2 === 0 ? 1 : 2;
    backgroundObjects.push(new Background("img/5_background/layers/air.png", x, 0));
    backgroundObjects.push(new Background(`img/5_background/layers/3_third_layer/${imageNumber}.png`, x, 0));
    backgroundObjects.push(new Background(`img/5_background/layers/2_second_layer/${imageNumber}.png`, x, 0));
    backgroundObjects.push(new Background(`img/5_background/layers/1_first_layer/${imageNumber}.png`, x, 0));
  }
  return backgroundObjects;
}

  function setEnemies() {
    let enemies = [];

    for (let i = 0; i < 10; i++) {
      let x = 800 + i * 600 + Math.random() * 300;

      if (Math.random() < 0.5) {
        enemies.push(new Chicken(x));
      } else {
        enemies.push(new SmallChicken(x));
      }
    }

    return enemies;
  }

  function setBottles() {
    let bottles = [];

    for (let i = 0; i < 10; i++) {
      let x = 300 + i * 350 + Math.random() * 150;
      bottles.push(new SalsaBottle(x));
    }

    bottles.push(new SalsaBottle(4000));
    bottles.push(new SalsaBottle(4250));
    bottles.push(new SalsaBottle(4450));

    return bottles;
  }

  function setClouds() {
    let clouds = [];

    for (let i = 0; i <= 21; i++) {
      let x = i * 250;
      clouds.push(new Cloud(x));
    }

    return clouds;
  }
