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
    this.x = 4700;
    this.groundY = -10;
    this.y = this.groundY; 
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
    this.gravity(); 
  }

state = 'walking'; 
leftLimit = 4600;
rightLimit = 4800; 
movingRight = false; 

lastAttack = 0; 
attackCooldown = 3000; 

deadAnimationStarted = false; 
deadAnimationFinished = false; 
deadFrameCounter = 0; 

isActivated = false; 


animate() {
    setInterval(() => {   
      this.checkActivation(); 
      if(!this.isActivated) {
        this.updateImages(); 
        return
      }

      this.checkAttackRange(); 
      this.moveDuringAttack(); 
      this.moveBox(); 
      this.updateImages(); 
    }, 100);
  }

updateImages() {
  if (this.isDead()) {
    this.playDeadAnimation();
    return;
  }
  if(this.state === 'hurt' && !this.isHurt()) {
    this.state = 'walking';
  }
  
  this.playLoopAnimation();
}

playLoopAnimation() {
  let currentImages;
  if(this.state === 'dead') {
    currentImages = this.imagesDead;
  } else if(this.state === 'hurt') {
    currentImages = this.imagesHurt;
  } else if(this.state === 'attack') {
    currentImages = this.imagesAttack;
  } else if(this.state === 'alert') {
    currentImages = this.imagesAlert;
  } else {
    currentImages = this.imagesWalking;
  }

  let imageIndex = this.currentImage % currentImages.length;
  let path = currentImages[imageIndex];
  this.img = this.imageCache[path];
  this.currentImage++;

  if (this.state === 'attack' && this.currentImage >= this.imagesAttack.length) {
    this.state = 'walking';
    this.currentImage = 0;
  }
}

checkActivation() {
  if(this.world.character.x > 3800) {
    this.isActivated = true; 
  } 
  console.log(
  'Pepe x:', this.world.character.x,
  'Boss x:', this.x,
  'Boss aktiv:', this.isActivated
);
}

playDeadAnimation() {
  let currentImages = this.imagesDead; 
      if (!this.deadAnimationStarted) {
      this.currentImage = 0;
      this.deadAnimationStarted = true;
      this.deadFrameCounter = 0;
    }
    let imageIndex = Math.min(this.currentImage, currentImages.length - 1);
    let path = currentImages[imageIndex];
    this.img = this.imageCache[path];

    // langsamer abspielen
    this.deadFrameCounter++;
      if (this.deadFrameCounter % 5 === 0 && this.currentImage < currentImages.length - 1) {
        this.currentImage++;
    }
    if (this.currentImage >= currentImages.length - 1) {
      this.deadAnimationFinished = true;
  }
  }

  moveBox() {
      if(this.state === 'attack') { // Dann bleibt der boss während der Attacke stehen
        return; 
      }
      if(!this.movingRight) {
        this.x -= this.speed;
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

  checkAttackRange() {
    let distance = this.x - this.world.character.x; // Unterschied zwischen Boss und Character (500 - 300 = Abstand 200)
    if(distance < 400 && // Pepe ist nah genug
      this.state === 'walking' && // Boss ist bereit
      Date.now() - this.lastAttack > this.attackCooldown &&
      !this.isAboveGround() && // Boss steht am Boden 
      Math.random() < 0.7) { 
      this.attack(); 
    }
// 1. Character holen -> hier die world verlinken und in world einen Endboss erstellen und die world mitgeben
// 2. Distanz berechnen ---> endboss.x - character.x
// 3. prüfen: nah genug? distance < Schwellenwert
// 4. prüfen: greift er gerade schon an?
// 5. wenn nicht → attack()
  }

  attack() {
  this.state = 'attack';
  this.lastAttack = Date.now(); 
  this.currentImage = 0;
  this.speedY = -30; // nach oben
  // 1. Attack-Sprung bauen
  //  * nur wenn state === "attack"
  //  * Boss springt nach links
  //  * währenddessen keine Box-Bewegung
//2. Danach Alert-Zone
  //  * wenn Pepe im letzten Levelabschnitt ist
  //  * Boss spielt kurz Alert
  //  * danach wieder Walking oder Attack
}

moveDuringAttack() {
    if(this.state === 'attack') {
      this.x -= 20; // nach vorne zu Pepe 
    }
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