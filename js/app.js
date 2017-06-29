//TODO: Variables like topmrgin which are sprite attributes, how should they be represented in the class
//TODO: Collision Detection Needs to Happem
//TODO: Clean update bounding box for Player
//TODO: Restrict Player movement at boundaries
//TODO: Winning condition
//TODO: Add more artifacts & Points Scoring capabilities

//*********************** SPRITE ************************************
var Sprite = function(path, isBugSprite){
    if(isBugSprite === true)
    {
        this.rowheight  = 83;
        this.verticalCorrection = 25;
        this.topMargin  = 71;

        this.bugHeight  = 75;
        this.bugWidth   = 101;
    }
    else
    {
        this.rowheight = 83;
        this.verticalCorrection = 33;
        this.topMargin = 60;
    
        this.playerHeight = 78;
        this.playerWidth = 101;

    }
    this.path       = path;
}

//*********************** ENEMY **************************************
// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = new Sprite('images/enemy-bug.png', true);
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.generateLoc();
    
    };

//
Enemy.prototype.generateLoc = function(){

    var randomrow = (Math.floor(Math.random() * 3) + 1);
    
    this.x = 0;
    this.y = this.sprite.rowheight*(randomrow+1)-this.sprite.verticalCorrection-this.sprite.bugHeight;
    console.log("Bug Position "+ this.x + ", "+this.y);
};

Enemy.prototype.computeBounds = function(){
    this.topLeftX = this.x;
    this.topLeftY = this.y + this.sprite.topMargin;
    this.bottomRightX= this.topLeftX + this.sprite.playerWidth;
    this.bottomRightY = this.topLeftY + this.sprite.playerHeight; 
}


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
    this.computeBounds();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite.path), this.x, this.y);
    ctx.beginPath();
    ctx.strokeStyle="red";
    ctx.rect(this.topLeftX, this.topLeftY, this.sprite.bugWidth, this.sprite.bugHeight);
    ctx.stroke();
    //console.log(this.x, this.y, this.bugWidth, this.bugHeight);
};

//***************** PLAYER *********************************************

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = new Sprite('images/char-cat-girl.png', false);
    // initial location
    this.resetPosition();
};

// Generates random position for player bot when it is born
Player.prototype.resetPosition = function(){
  
    var randomcol = (Math.floor(Math.random() * 4) + 1);
   
    this.x = 101 * randomcol;
    this.y = this.sprite.rowheight*6-this.sprite.verticalCorrection-this.sprite.playerHeight;
    console.log("Bug Position "+ this.x + ", "+this.y);
};


Player.prototype.computeBounds = function(){
    this.topLeftX = this.x;
    this.topLeftY = this.y + this.sprite.topMargin;
    this.bottomRightX= this.topLeftX + this.sprite.playerWidth;
    this.bottomRightY = this.topLeftY + this.sprite.playerHeight; 
}

Player.prototype.update = function(dt) {
    this.computeBounds ();
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite.path), this.x, this.y);
    ctx.beginPath();
    ctx.strokeStyle="yellow";
    ctx.rect(this.topLeftX, this.topLeftY, this.sprite.playerWidth, this.sprite.playerHeight);
    ctx.stroke();
    //console.log(this.x, this.y, this.playerWidth, this.playerHeight);
};

Player.prototype.handleInput = function(e) {
    switch (e) {
        case 'left':
            this.x -= 20;
            break;
        case 'right':
            this.x += 20;
            break;
        case 'up':
            this.y -= 25;
            break;
        case 'down':
            this.y += 25;
            break;
    }
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




