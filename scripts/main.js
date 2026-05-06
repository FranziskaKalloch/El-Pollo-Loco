// Menülogik
// Buttons
// Dialoge
// Screens

let startScreen = document.getElementById('startScreen');
let game = document.getElementById('gameContainer'); 
let gameOverScreen = document.getElementById('gameOverScreen'); 
let winScreen = document.getElementById('winScreen'); 
const sound = new Sounds(); 

sound.playStartScreenMusic(); 

function startGame() {
    let startGame = document.getElementById('startButton');
    startGame.addEventListener('click', () => {
        sound.play("click"); 
        startScreen.classList.add('hidden');
        game.classList.remove('hidden');
        sound.stopStartScreenMusic();
        sound.playBackgroundMusic();
        console.log("Start wurde geklickt");
        console.log(document.getElementById("canvas"));
        init(); 
    })
}

startGame(); 