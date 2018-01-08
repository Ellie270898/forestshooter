//var game = new Phaser.Game(650, 650, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });
const mainState =
{
        preload: function ()
       {

          game.load.spritesheet('cat', 'assets/catSpritesheet.png', 650, 650)
          game.load.image('bullet', 'assets/bullet.png');
          game.load.image('background','assets/forestmap.png');
          game.load.spritesheet('spritesheet', 'assets/animation7.png', 108, 140);
          game.load.image('foreground', 'assets/foreground.png');
          game.load.image('greyspider', 'assets/greyspider2.png');
          game.load.spritesheet('spider', 'assets/spiderSpritesheet.png', 600, 725 );
          game.load.spritesheet('spider2', 'assets/spiderSpritesheet.png', 600, 725 );
          game.load.image('gameover', 'assets/gameoverscreen2.png');
          game.load.image('gamewin', 'assets/gamewinscreen.png');
      },


    //var spritesheet;

         create: function ()
        {

          var player1;
          var cursors;

          this.game.physics.startSystem(Phaser.Physics.ARCADE);

          game.add.tileSprite(0, 0, 3440, 650, 'background');

          game.world.setBounds(0, 0, 3040, 650);

          this.gameEnd = this.cat = game.add.sprite(2700, -30, 'cat');
          this.gameEnd.enableBody = true;
          game.physics.arcade.enable(this.gameEnd);
          this.gameEnd.physicsBodyType = Phaser.Physics.ARCADE;
          this.gameEnd.collideWorldBounds = true;
          this.cat.animations.add('end', [0], 1, true);


          this.player1 = this.spritesheet =game.add.sprite(120, 420, "spritesheet");
          this.player1.enableBody = true;
          game.physics.arcade.enable(this.player1);
          this.player1.physicsBodyType = Phaser.Physics.ARCADE;
          this.player1.collideWorldBounds = true;
          this.spritesheet.animations.add('still', [8], 1, true);
          this.spritesheet.animations.add('walk', [0,1,2,3,4,5,6,7], 18, true);
          this.spritesheet.animations.add('shoot', [9], 1, true);
          this.speed = 4;


          this.greyspider = this.spider =game.add.sprite(1000, -100, 'spider');
          //game.physics.arcade.enable(this.greyspider);
          this.greyspider.enableBody = true;
          game.physics.arcade.enable(this.greyspider);
          this.greyspider.physicsBodyType = Phaser.Physics.ARCADE;
          this.spider.animations.add('spidermove', [0,1,2,3,4,3,2,1], 4, true);
          this.spider.healthPoints = 100;




          this.bullets = game.add.group();
          this.bullets.enableBody = true;
          this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
          this.bullets.lifespan = 2.5;


            for (let i = 0; i < 20; i++) {
              let b = this.bullets.create(0, 0, 'bullet');
              b.exists = false;
              b.visible = false;
              b.checkWorldBounds = true;
              b.events.onOutOfBounds.add((bullet) => { bullet.kill(); });
        }



          this.bulletTime = 0;

        //This tells the camera to follow the player
          game.camera.follow(player1);

        //This adds some trees to the front, adding more depth to the game world
          game.add.sprite(0, 0, 'foreground');

          this.highScore = localStorage.getItem('shooterhighscore');
          if (this.highScore === null) {
            localStorage.setItem('shooterhighscore', 0);
            this.highScore = 0;
          }

          this.score = 0;
          this.scoreDisplay = game.add.text(500, 20, `Score: ${this.score} \nHighScore: ${this.highScore}`, { font: '20px Arial', fill: '#ffffff' });
          this.scoreDisplay.fixedToCamera = true;

          this.cursors = game.input.keyboard.createCursorKeys();
          game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);



        },

        fire: function () {
         if (game.time.now > this.bulletTime) {
          //  this.fireSound.play();

            let bullet = this.bullets.getFirstExists(false);
            if (bullet) {
              bullet.reset(this.player1.x + (this.player1.width - 30), this.player1.y + 40);
              bullet.body.velocity.x = + 800;
              this.bulletTime = game.time.now + 200;
              //this.bullet.lifespan = 25;

            }
          }
        },



      shoot: function(){
        //console.log("animation");7
        //this.spritesheet.x+=this.speed;
        this.spritesheet.play('shoot');
        this.spritesheet.scale.x=1;
      },

      hit: function (bullet, greyspider) {
          this.score = this.score + 50;
          this.greyspider.kill();
          this.scoreDisplay.text = `Score: ${this.score} \nHighScore: ${this.highScore}`;

          //this.bullets.kill();
    },
    //},


    //function hitgreyspider() {
      //console.log('you encounter an greyspider');
      //this.foundSound.play();
    //}

      player1GotHit: function () {
        console.log('you died!');
        //this.explosion.reset(this.player1.x + (this.player1.width / 2), this.player1.y + (this.player1.height / 2));
        this.player1.kill();
        game.state.start('gameover');

      },

      player1Win: function () {
        console.log('you win!');
        //this.explosion.reset(this.player1.x + (this.player1.width / 2), this.player1.y + (this.player1.height / 2));
        this.player1.kill();
        game.state.start('gamewin');

      },







      gameover: function () {
        if (this.score > this.highScore) {
          this.highScore = this.score;
          localStorage.setItem('shooterhighscore', this.highScore);
        }
        game.state.start('gameover');
      },

      update: function () {

      game.physics.arcade.overlap(this.bullets, this.greyspider, this.hit, null, this);
      game.physics.arcade.overlap(this.greyspider, this.player1, this.player1GotHit, null, this);
      game.physics.arcade.overlap(this.player1, this.gameEnd, this.player1Win, null, this);


      //this.player1.body.velocity.x = 0;
    //  this.player1.body.velocity.y = 0;

    //  this.player1.body.velocity.x = 0;



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
            this.spritesheet.x-=this.speed;
            this.spritesheet.play('walk');
            this.spritesheet.scale.x=-1;
            game.camera.x = this.player1.x - 200;
            game.camera.y = this.player1.y - 200;

          }
          else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
          {
            this.spritesheet.x+=this.speed;
            this.spritesheet.play('walk');
            this.spritesheet.scale.x=1;
            game.camera.x = this.player1.x - 200;
            game.camera.y = this.player1.y - 200;
            //this.greyspider2.x = + 200
            //this.greyspider2.y = + 200;
          }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
              //console.log("shoot");
              this.shoot();
              this.fire();
          } else
          {
            this.spritesheet.play('still');
            this.spider.play('spidermove');
          }
        },


      render: function () {

        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(this.player1, 32, 500)
      //  game.debug.text("Time until event: " + game.time.events.duration, 32, 32);

      },

}

  const gameoverState = {
    preload: function () {
      game.load.image('gameover', 'assets/gameoverscreen3.png');
    },
    create: function () {
      const gameOverImg = game.cache.getImage('gameover');
      game.add.sprite(
        game.camera.centerX - gameOverImg.width / 2,
        game.camera.centerY - gameOverImg.height / 2,
        'gameover');
      game.input.onDown.add(() => { game.state.start('main'); });
    }
  };


  const gamewinState = {
    preload: function () {
      game.load.image('gamewin', 'assets/gamewinscreen.png');
    },
    create: function () {
      const gameOverImg = game.cache.getImage('gamewin');
      game.add.sprite(
        game.camera.centerX - gameOverImg.width / 2,
        game.camera.centerY - gameOverImg.height / 2,
        'gamewin');
      game.input.onDown.add(() => { game.state.start('main'); });
    }
  };
  const game = new Phaser.Game(650, 650);
  game.state.add('main', mainState);
  game.state.add('gameover', gameoverState);
  game.state.add('gamewin', gamewinState);
  game.state.start('main');
