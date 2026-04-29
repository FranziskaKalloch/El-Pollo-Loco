class ThrowableObject extends MoveableObject {

speedY = 30; 
speedX = 20;

    // Bottles
    // - Methoden -> Throw() 
	//- speedY = 30; 
	//- speedX = 20;
	//- Keyboard braucht eine Taste zum werfen 'D'
	// - in World ein Array für Throwable objects

    constructor() {
        super(); 

    }

    throw() {

    }

}

// Aufgabe:
//	- thow(100,150) x und y koordinate angeben
//	- this.height = ?
//	- this.width = ? 
	
//	- throw(x,y) {
//		this.y = y;
//		this.x = x;
	
//		this.speedY = 30;
//		this.gravity(); 
//		setInterval( () => {
//		this.x += 10; 
//		} 25); 
//		}
//		
		
//		in isAboveGround() {
//		if(!this instanceOf ThrowableObject) ) {
//		return this.y < 100; 
//		}
		
//		checkThrowObjects() {
//			if(this.keyboard.D) {
//				let bottle = new ThrowableObject(this.character.x +100, this.character.y + 100)
//				this.throwableobjects.push(bottle);
				