class Endboss extends MoveableObject {
  imagesWalking = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
  ];
  imagesAlert = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ]

  imagesAttack = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ]

  imagesHurt = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ]

  imagesDead = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ]


  constructor(world) {
    super();
    this.world = world; // Der Endboss bekommt die Welt von außen übergeben, damit wir auf die Elemente dort zugreifen können ---> hier wollen wir den character holen
    this.x = 700;
    this.y = -15; 
    this.width = 350;
    this.height = 500;
    this.speed = 2; 
    this.loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
    this.loadImages(this.imagesWalking)
    this.loadImages(this.imagesAlert); 
    this.loadImages(this.imagesAttack);
    this.loadImages(this.imagesHurt);  
    this.loadImages(this.imagesDead)
    this.animate(); 
  }

isAlert = false;
isAttacking = false;
isKilled = false;
leftLimit = 500;
rightLimit = 1000; 
movingRight = false; 


animate() {
    setInterval(() => {   
     // this.checkAttackRange(); 
      this.moveBox(); 
      this.updateImages(); 
    }, 100);
  }

updateImages() {
  if (this.isDead()) {
    this.playDeadAnimation();
    return;
  } else {
    this.playLoopAnimation();
  }
}

playLoopAnimation() {
  let currentImages;
  if (this.isHurt()) {
    currentImages = this.imagesHurt;
  } else if (this.isAttacking) {
    currentImages = this.imagesAttack;
  } else if (this.isAlert) {
    currentImages = this.imagesAlert;
  } else {
    currentImages = this.imagesWalking;
  }
  let imageIndex = this.currentImage % currentImages.length;
  let path = currentImages[imageIndex];
  this.img = this.imageCache[path];
  this.currentImage++;

  if (this.isAttacking && this.currentImage >= this.imagesAttack.length) {
    this.isAttacking = false;
    this.isAlert = true;
    this.currentImage = 0;
  }
}

   playDeadAnimation() {
    let currentImages = this.imagesDead[0]; 
    // Start der DeadAnimation 

  }

  moveBox() {
      if(!this.movingRight) {
        this.x -= this.speed;
        console.log('Boss bewegt sich');
      } else {
        this.x += this.speed; 
      }
      if(this.x >= this.rightLimit) {
        this.movingRight = false; 
      }
      if(this.x <= this.leftLimit) {
        this.movingRight = true; 
      }
  }

  alert() {
  }

  checkAttackRange() {
    let distance = this.x - this.world.character.x; // Unterschied zwischen Boss und Character (500 - 300 = Abstand 200)
    if(distance < 200 && !this.isAttacking) {
      this.attack(); 
    }


// 1. Character holen -> hier die world verlinken und in world einen Endboss erstellen und die world mitgeben
// 2. Distanz berechnen ---> endboss.x - character.x
// 3. prüfen: nah genug? distance < Schwellenwert
// 4. prüfen: greift er gerade schon an?
// 5. wenn nicht → attack()
  }

  attack() {
  this.isAttacking = true;
  this.isAlert = false;
  this.currentImage = 0;
}

  //isHurt() und isDead() wird von MoveableObject geerbt

}


// Zugriff auf Pepe
// -- der Endboss muss wissen, wo der Character ist!

// Distanz berechnen
// .. Unterschied zwischen den x-Werten
// -- also wie weit ist Pepe vom Boss entfernt

// Entscheidung 
// ... wenn Distanz < x dann attack() 
// --- attack() darf nicht dauerhaft gespammt werden 