class Character extends MoveAbleObject {
  imageCache = [];
  imageWalks = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];

  constructor() {
    super();
    this.loadImage('img/2_character_pepe/2_walk/W-21.png');
  }

  jump() {}
}
