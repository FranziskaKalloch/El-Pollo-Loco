class ThrowableObject extends MoveableObject {

speedY = 30; 
speedX = 20;

    constructor() {
        super(); 
    }

    throw(x,y) {
        this.x = x;
        this.y = y;
    }
    // wenn bottle.throw() aufgerufen wird, dann werden dort die Koordinaten reingepackt

   
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
				