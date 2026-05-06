// Menülogik
// Buttons
// Dialoge
// Screens
// ruft init() nur beim Startbutton async function (params) {

let startScreen = document.getElementById('startScreen');
let game = document.getElementById('gameContainer'); 
let gameOverScreen = document.getElementById('gameOverScreen'); 
let winScreen = document.getElementById('winScreen'); 


function startGame() {
    let startGame = document.getElementById('startButton');
    startGame.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        game.classList.remove('hidden');
        init(); 
    })
}

startGame(); 