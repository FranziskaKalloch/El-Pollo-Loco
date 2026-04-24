class Statusbar extends DrawableObject {

    imagesHealth = [
        "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png",
    ]; 

    percentage = 100; // das letzte Bild 
    x = 20;
    y = 10; 
    width = 250;
    height = 80; 
    

    constructor() {
        super(); 
        this.loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png')
        this.loadImages(this.imagesHealth); 
       // this.setHealthBar(100); // bei 100 fängt es an 
    }


    }

   // function setHealthBar(percentage) {
   //      this.percentage = this.rightImage;  // ein Zahl zwischen 0 und 5 ermitteln 
   //      // richtige Bild setzen
        
        

   //    function   rightImage() {
        // welches der 6 Bilder so genommen werden? 
    //    if(this.percentage == 100) {
    //        return 5; // Das 5. Bild
     //   } else if(this.percentage) { //Bild > 80
    //        return 4;
    //    }
        // und so weiter

        // jetzt soll noch das richtige Bild geladen werden 
