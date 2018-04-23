// Enemies function constructor 
var Enemy = function(x, y, speed) {
    // declare proprties for Enemy object
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x =this.x + this.speed * dt;

    // when off canvas, reset position of enemy
    if (this.x > 505) {
        this.x = -10;
        this.speed = 100 + (Math.random()*200); //Math.floor(Math.random() * 256);
    }

    // Check for collision between player and enemies
    if((player.x +60 > this.x)&&(this.x> player.x -60)&&(player.y +30 > this.y)&&(this.y > player.y -30))
        {
        player.x = 200;
        player.y = 380;

        // make something after collision between player and enemies
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function () {
        document.querySelector('body').style.backgroundColor = 'white';
        }, 200);
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player function constructor 
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-pink-girl.png';
};

// Update the player position
Player.prototype.update = function() 
{
    // Prevent player from moving off canvas 
    if (this.y > 380)
    {
        this.y = 380;
    }
    if (this.x > 400)
    {
        this.x = 400;
    }
    if (this.x < 0) 
    {
        this.x = 0;
    }

    // Check for player reaching top of canvas and win the game
    if (this.y < 0) 
    {
       document.querySelector('body').style.cssText = 'background-image: url("images/Star.png"); background-repeat: repeat; background-position: right top;';
          this.x = 200;
          this.y = 380; 
        document.querySelector('body').style.backgroundColor = 'white';
        setTimeout(function (){
        if(!confirm("Great You Win! \n Do you want to play again?"))
        {
            return;
        }
        }, 300);
    }
};
// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// move the player on the screen as the keypress
Player.prototype.handleInput = function(Press) {
    switch (Press) {
        case 'left':
            this.x = this.x - this.speed; //+ 50;
            break;
        case 'up':
            this.y = this.y - this.speed; //+ 30;
            break;
        case 'right':
            this.x = this.x + this.speed; //+ 50;
            break;
        case 'down':
            this.y = this.y + this.speed; //+ 30;
            break;
    }
};

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(200, 380, 50);

//create a new 3 enemie objects and push them to allEnemies array
var firstEnemy = new Enemy(0, 65, 100);
var secondEnemy = new Enemy(0, 150, 320);
var thirdEnemy = new Enemy(0, 215, 400);
allEnemies.push(firstEnemy);
allEnemies.push(secondEnemy);
allEnemies.push(thirdEnemy);

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
