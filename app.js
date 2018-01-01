var game = new Phaser.Game(650, 650, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('background','assets/forestmap.png');
    game.load.spritesheet('moving', 'assets/animation6.png', 108, 140);
    game.load.image('foreground', 'assets/foreground.png');
    game.load.image('ship', 'assets/ship.png');
    game.load.image('enemy', 'assets/enemy.png');
    game.load.image('bullet', 'assets/bullet.png');

}

var player1;
var cursors;
//var moving;

function create() {

    game.physics.startSystem(Phaser.Physics.P2JS);

    game.add.tileSprite(0, 0, 3440, 650, 'background');

    game.world.setBounds(0, 0, 3040, 650);

    player1 = this.moving=game.add.sprite(120, 420, "moving");
      game.physics.enable(player1, Phaser.Physics.ARCADE);
      this.moving.animations.add('still', [8], 1, true);
      this.moving.animations.add('walk', [0,1,2,3,4,5,6,7], 18, true);
      this.speed = 4;


    this.enemy = game.add.group();
    this.enemy.enableBody = true;
    this.enemy.physicsBodyType = Phaser.Physics.ARCADE;

    this.bullets = game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    for (let i = 0; i < 20; i++) {
      let b = this.bullets.create(0, 0, 'bullet');
      b.exists = false;
      b.visible = false;
      b.checkWorldBounds = true;
      b.events.onOutOfBounds.add((bullet) => { bullet.kill(); });
    }


    game.camera.follow(player1);

    //This adds some trees to the front, adding more depth to the game world
    game.add.sprite(0, 0, 'foreground');

    this.highScore = localStorage.getItem('shooterhighscore');
    if (this.highScore === null) {
      localStorage.setItem('shooterhighscore', 0);
      this.highScore = 0;
    }

      this.score = 0;
      var score = game.add.text(500, 20, `Score: ${this.score} \nHighScore: ${this.highScore}`, { font: '20px Arial', fill: '#ffffff' });
      score.fixedToCamera = true;

    this.cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);



}



function update() {

//    player1.body.setZeroVelocity();

  //  if (cursors.up.isDown)
  //  {
  //      player1.body.moveUp(300)
  //  }
  //  else if (cursors.down.isDown)
  //  {
  //      player1.body.moveDown(300);
  //  }

  //  if (cursors.left.isDown)
  //  {
  //      player1.body.velocity.x = -300;
  //  }
  //  else if (cursors.right.isDown)
  //  {
    //    player1.body.moveRight(300);
  //  }
  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
      {
        this.moving.x-=this.speed;
        this.moving.play('walk');
        this.moving.scale.x=-1;
        game.camera.x = player1.x - 600;
        game.camera.y = player1.y - 600;

      }
      else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
      {
        this.moving.x+=this.speed;
        this.moving.play('walk');
        this.moving.scale.x=1;
        game.camera.x = player1.x - 600;
        game.camera.y = player1.y - 600;

      } else
      {
        this.moving.play('still');
      }
}

function render() {

    game.debug.cameraInfo(game.camera, 32, 32);
   // game.debug.spriteCoords(player1, 32, 500);

}
