var game = new Phaser.Game(650, 650, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('background','assets/forestmap.png');
    game.load.image('playerimage','assets/character3.png');
    game.load.spritesheet('moving', 'assets/animation6.png', 108, 140);

}

var player1;
var cursors;
//var moving;

function create() {

    game.physics.startSystem(Phaser.Physics.P2JS);

    game.add.tileSprite(0, 0, 4094, 650, 'background');

    game.world.setBounds(0, 0, 4094, 650);

    player1 = this.moving=game.add.sprite(120, 450, "moving");
      this.moving.animations.add('still', [8], 1, true);
      this.moving.animations.add('walk', [0,1,2,3,4,5,6,7], 22, true);
      this.speed = 4;

//    player1 = game.add.sprite(0, 0, 'playerimage');

  //  game.physics.p2.enable(player1);

    game.camera.follow(player1);



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
