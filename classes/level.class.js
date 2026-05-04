class Level {
  enemies;
  endboss; 
  clouds;
  backgroundObjects;

  constructor(enemies, endboss, bottles, clouds, backgroundObjects, levelEndX) {
    this.enemies = enemies;
    this.endboss = endboss; 
    this.bottles = bottles; 
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.levelEndX = levelEndX;
}
}
