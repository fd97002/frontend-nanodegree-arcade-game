
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.generateLoc();
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

//
Enemy.prototype.generateLoc = function(){
    var rowheight = 83;
    var verticalCorrection = 25;
    var topMargin = 71;
    var randomrow = (Math.floor(Math.random() * 3) + 1);
    
    this.bugHeight = 75;
    this.bugWidth = 101;

    this.x = 0;
    this.y = rowheight*(randomrow+1)-verticalCorrection-this.bugHeight;
    this.trueY= this.y + topMargin;
    console.log("Bug Position "+ this.x + ", "+this.y);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (100 * dt);
    if(this.x > 506)
    {
        console.log("Bug Position "+ this.x + ", "+this.y);
        this.generateLoc();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.strokeStyle="red";
    ctx.rect(this.x, this.trueY, this.bugWidth, this.bugHeight);
    ctx.stroke();
    //console.log(this.x, this.y, this.bugWidth, this.bugHeight);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // initial location
    this.generateLoc();
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-cat-girl.png';
};

// Generates random position for player bot when it is born
Player.prototype.generateLoc = function(){
    var rowheight = 83;
    var verticalCorrection = 33;
    var topMargin = 60;
    
    this.playerHeight = 78;
    this.playerWidth = 101;

    var randomcol = (Math.floor(Math.random() * 5) + 1);
   
    this.x = 101 * randomcol;
    this.y = rowheight*6-verticalCorrection-this.playerHeight;
    this.trueY= this.y + topMargin;
    console.log("Bug Position "+ this.x + ", "+this.y);
};

Player.prototype.update = function(dt) {

};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //ctx.strokeStyle="red";
    //ctx.rect(this.x, this.trueY, this.playerWidth, this.playerHeight);
    //ctx.stroke();
    //console.log(this.x, this.y, this.playerWidth, this.playerHeight);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy0 = new Enemy();
var enemy1 = new Enemy();

var allEnemies = [enemy0];

// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


