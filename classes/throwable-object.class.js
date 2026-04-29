class ThrowableObject extends MoveableObject {

speedY; 
speedX = 8; 

    constructor() {
        super(); 
    }

    throw(x,y) {
        this.x = x;
        this.y = y;

        this.speedY = -20; 
         this.gravity(); 
        setInterval(() => {
            this.x += this.speedX;
        }, 1000/60);
       

    }
    // wenn bottle.throw() aufgerufen wird, dann werden dort die Koordinaten reingepackt

   
}

// Aufgabe:
//	- throw(100,150) x und y koordinate angeben
//	- this.height = ?
//	- this.width = ? 
	
		
		
//		in isAboveGround() {
//		if(!this instanceOf ThrowableObject) ) {
//		return this.y < 100; 
//		}
		
//		checkThrowObjects() {
//			if(this.keyboard.D) {
//				let bottle = new ThrowableObject(this.character.x +100, this.character.y + 100)
//				this.throwableobjects.push(bottle);
				