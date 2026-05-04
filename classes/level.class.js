class Level {
  enemies;
  endboss; 
  clouds;
  backgroundObjects;

  constructor(enemies, bottles, clouds, backgroundObjects, levelEndX) {
    this.enemies = enemies;
    this.bottles = bottles; 
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.levelEndX = levelEndX;
}
}
