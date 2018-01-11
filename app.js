
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
          game.load.spritesheet('spider2', 'assets/spiderSpritesheet2.png', 420, 525 );
          game.load.spritesheet('spider3', 'assets/spiderSpritesheet3.png', 420, 675 );
          game.load.image('gameover', 'assets/gameoverscreen2.png');
          game.load.image('gamewin', 'assets/youwin.png');
          game.load.image('gameStartScreen', 'assets/gameStartScreen.png');
          game.load.audio('gamesoundtrack', 'assets/gamesoundtrack1.mp3');
          game.load.audio('fire', 'assets/shootsound.mp3');
      },

         create: function ()
        {

          var player1;
          var cursors;
          //THE MAP
          this.game.physics.startSystem(Phaser.Physics.ARCADE);
          game.add.tileSprite(0, 0, 3440, 650, 'background');
          game.world.setBounds(0, 0, 3040, 650);
          //THE STARTSCREEN
          this.gameStartScreen = game.add.sprite(0, 0, 'gameStartScreen');
          //THE MUSIC
          this.soundtrack = game.add.audio('gamesoundtrack', 0.8);
          this.fireSound = game.add.audio('fire', 0.1);
          //START FUNCTION
          game.input.onDown.add(this.beginning, this);
          //CAT ANIMATION
          this.gameStart = this.cat1 = game.add.sprite(73, -40, 'cat');
          this.gameStart.enableBody = true;
          game.physics.arcade.enable(this.gameStart);
          this.gameStart.physicsBodyType = Phaser.Physics.ARCADE;
          this.gameStart.collideWorldBounds = true;
          this.cat1.animations.add('start', [0,1,2,3,4,5], 7);
          //CAT AT THE END
          this.gameEnd = this.cat = game.add.sprite(2700, -30, 'cat');
          this.gameEnd.enableBody = true;
          game.physics.arcade.enable(this.gameEnd);
          this.gameEnd.physicsBodyType = Phaser.Physics.ARCADE;
          this.gameEnd.collideWorldBounds = true;
          this.cat.animations.add('end', [0], 1, true);
          //This code creates the player and animations for running and walking
          this.player1 = this.spritesheet =game.add.sprite(120, 420, "spritesheet");
          this.player1.enableBody = true;
          game.physics.arcade.enable(this.player1);
          this.player1.physicsBodyType = Phaser.Physics.ARCADE;
          this.player1.collideWorldBounds = true;
          this.spritesheet.animations.add('still', [8], 1, true);
          this.spritesheet.animations.add('walk', [0,1,2,3,4,5,6,7], 18, true);
          this.spritesheet.animations.add('shoot', [9], 1, true);
          this.speed = 4;
          //FIRST SPIDER
          this.greyspider = this.spider =game.add.sprite(1000, -100, 'spider');
          this.greyspider.enableBody = true;
          game.physics.arcade.enable(this.greyspider);
          this.greyspider.physicsBodyType = Phaser.Physics.ARCADE;
          this.spider.animations.add('spidermove', [0,1,2,3,4,3,2,1], 4, true);
          this.spider.healthPoints = 100;
          //SECOND SPIDER
          this.greyspider2 = this.spider2 =game.add.sprite(1780, -100, 'spider2');
          this.greyspider2.enableBody = true;
          game.physics.arcade.enable(this.greyspider2);
          this.greyspider2.physicsBodyType = Phaser.Physics.ARCADE;
          this.spider2.animations.add('spidermove2', [3,4,3,2,1,0,1,2], 4, true);
          this.spider2.healthPoints = 100;
          //THIRD SPIDER
          this.greyspider3 = this.spider3 =game.add.sprite(2580, 0, 'spider3');
          this.greyspider3.enableBody = true;
          game.physics.arcade.enable(this.greyspider3);
          this.greyspider3.physicsBodyType = Phaser.Physics.ARCADE;
          this.spider3.animations.add('spidermove3', [1,2,3,4,3,2,1,0], 4, true);
          this.spider3.healthPoints = 100;
          //BULLETS
          this.bullets = game.add.group();
          this.bullets.enableBody = true;
          this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
          this.bullets.lifespan = 2;
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
          //This counts the high score
          this.highScore = localStorage.getItem('shooterhighscore');
          if (this.highScore === null) {
            localStorage.setItem('shooterhighscore', 0);
            this.highScore = 0;
          }
          //This displays a score and determines the font, size and colour
          this.score = 0;
          this.scoreDisplay = game.add.text(20, 20, `Score: ${this.score} \nHighScore: ${this.highScore}`, { font: '25px Calibra', fill: '#ffffff' });
          this.scoreDisplay.fixedToCamera = true;

          this.cursors = game.input.keyboard.createCursorKeys();
          game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        },

        //shooting mechanism
        fire: function () {
         if (game.time.now > this.bulletTime) {


            let bullet = this.bullets.getFirstExists(false);
            if (bullet) {
              bullet.reset(this.player1.x + (this.player1.width - 35), this.player1.y + 30);
              bullet.body.velocity.x = + 500;
              bullet.body.velocity.y = - 700;
              this.bulletTime = game.time.now + 200;

            }
          }
        },

      //sound and visuals for shooting
      shoot: function(){
        //console.log("animation");7
        //this.spritesheet.x+=this.speed;
        this.spritesheet.play('shoot');
        this.spritesheet.scale.x=1;
      },
      //kills spider when hit
      hit: function (bullet, greyspider) {
          this.score = this.score + 50;
          this.greyspider.kill();
          this.scoreDisplay.text = `Score: ${this.score} \nHighScore: ${this.highScore}`;
    },
    //kills spider when hit
    hit2: function (bullet, greyspider2) {
        this.score = this.score + 50;
        this.greyspider2.kill();
        this.scoreDisplay.text = `Score: ${this.score} \nHighScore: ${this.highScore}`;
  },
  //kills spider when hit
    hit3: function (bullet, greyspider3) {
      this.score = this.score + 50;
      this.greyspider3.kill();
      this.scoreDisplay.text = `Score: ${this.score} \nHighScore: ${this.highScore}`;
    },
    //START SCREEN
    beginning: function() {
      this.gameStartScreen.kill();
      this.soundtrack.play();
      this.cat1.animations.play('start');
      },
      //KILLS PLAYER WHEN THEY COLLIDE WITH AN ENEMY
      player1GotHit: function () {
        console.log('you died!');
        this.player1.kill();
        game.state.start('gameover');
      },
      //PLAYER WINS AND MOVES ON TO NEXT GAME
      player1Win: function () {
        console.log('you win!');
        this.player1.kill();
        game.state.start('gamewin');

      },
      //FINISHES BOTH GAMES
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
      game.physics.arcade.overlap(this.bullets, this.greyspider2, this.hit2, null, this);
      game.physics.arcade.overlap(this.greyspider2, this.player1, this.player1GotHit, null, this);
      game.physics.arcade.overlap(this.player1, this.gameEnd, this.player1Win, null, this);
      game.physics.arcade.overlap(this.greyspider3, this.player1, this.player1GotHit, null, this);
      game.physics.arcade.overlap(this.bullets, this.greyspider3, this.hit3, null, this);

      //THIS ALLOWS THE CAMERA AND PLAYER TO MOVE LEFT WHEN THE LEFT ARROW IS HELD DOWN
      if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
          {
            this.spritesheet.x-=this.speed;
            this.spritesheet.play('walk');
            this.spritesheet.scale.x=-1;
            game.camera.x = this.player1.x - 200;
            game.camera.y = this.player1.y - 200;
      //THIS ALLOWS THE CAMERA AND PLAYER TO MOVE RIGHT WHEN THE RIGHT ARROW IS HELD DOWN
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
              this.fireSound.play();
            }
            else
          {
            this.spritesheet.play('still');
            this.spider.play('spidermove');
            this.spider2.play('spidermove2');
            this.spider3.play('spidermove3');
          }
        },

      render: function () {

        //game.debug.cameraInfo(game.camera, 32, 32);
      //  game.debug.spriteCoords(this.player1, 32, 500);

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

  //LOADS MINI GAME AFTER PLAYER WINS
  const gamewinState = {
    preload: function () {
      game.load.image('gamewin', 'assets/youwin.png');
    },
    create: function () {
      const gameOverImg = game.cache.getImage('gamewin');
      game.sound.stopAll();
      game.add.sprite(
        game.camera.centerX - gameOverImg.width / 2,
        game.camera.centerY - gameOverImg.height / 2,
        'gamewin');
      game.input.onDown.add(() => { game.state.start('mini'); });
    }
  };
  //CODE FOR MINI GAME
  const miniState = {

  create: function () {
    game.add.tileSprite(0, 0, 650, 650, 'background2');
    game.world.setBounds(0, 0, 650, 650);

    this.minigamesoundtrack = game.add.audio('minigamesoundtrack');7
    this.moveright = game.add.audio('moveright.mp3');
    this.moveleft = game.add.audio('moveleft.mp3');

    this.minigamesoundtrack.play();

    this.ship = game.add.sprite(400, 550, 'ship');
    game.physics.enable(this.ship, Phaser.Physics.ARCADE);

    this.aliens = game.add.group();
    this.aliens.enableBody = true;
    this.aliens.physicsBodyType = Phaser.Physics.ARCADE;

    for (let i = 0; i < 48; i++) {
      let c = this.aliens.create(20 + (i % 8) * 80, 80 + Math.floor(i / 8) * 60, 'enemy');
      c.body.immovable = true;
    }

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

    this.bulletTime = 0;

    this.highScore = localStorage.getItem('invadershighscore');
    if (this.highScore === null) {
      localStorage.setItem('invadershighscore', 0);
      this.highScore = 0;
    }

    this.score = 0;
    this.scoreDisplay = game.add.text(200, 20, `Score: ${this.score} \nHighScore: ${this.highScore}`, { font: '30px Arial', fill: '#ffffff' });

    this.fireSound = game.add.audio('fire', '0.1');

    this.cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
  },

  fire1: function () {
    if (game.time.now > this.bulletTime) {
      this.fireSound.play();
      let bullet = this.bullets.getFirstExists(false);
      if (bullet) {
        bullet.reset(this.ship.x + (this.ship.width / 2), this.ship.y - (this.ship.height + 5));
        bullet.body.velocity.y = -300;
        this.bulletTime = game.time.now + 150;
      }
    }
  },

  gameOver: function () {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('invadershighscore', this.highScore);
    }
    game.sound.stopAll();
    game.state.start('gameover');
  },

  hit: function (bullet, enemy) {
    this.score = this.score + 10;
    bullet.kill();
    enemy.kill();
    if (this.aliens.countLiving() === 0) {
      this.score = this.score + 100;
      this.gameOver();
    }
    this.scoreDisplay.text = `Score: ${this.score} \nHighScore: ${this.highScore}`;
  },

  preload: function () {
    game.load.image('background2','assets/minigamemap.png');
    game.load.image('ship', 'assets/spaceCat.png');
    game.load.image('enemy', 'assets/spaceSpider1.png');
    game.load.image('bullet', 'assets/bullet.png');
    game.load.audio('minigamesoundtrack', 'assets/minigamesoundtrack1.mp3');
    game.load.audio('moveright', 'assets/moveright.mp3');
    game.load.audio('move;eft', 'assets/moveleft.mp3');
  },

  shipGotHit: function (alien, ship) {
    this.ship.kill();
    game.sound.stopAll();

  },

  update: function () {

    game.physics.arcade.overlap(this.bullets, this.aliens, this.hit, null, this);
    game.physics.arcade.overlap(this.aliens, this.ship, this.shipGotHit, null, this);

    this.ship.body.velocity.x = 0;
    this.aliens.forEach(
      (alien) => {
        alien.body.position.y = alien.body.position.y + 0.1;
        if (alien.y + alien.height > game.height) { this.gameOver(); }
      }
    );

    if (this.cursors.left.isDown) {
      this.moveleft.play();
      this.ship.body.velocity.x = -300;
    } else if (this.cursors.right.isDown) {
      this.moveright.play();
      this.ship.body.velocity.x = 300;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.fire1();
    }
  }
};

const gameover1State = {
  preload: function () {
    game.load.image('gameover', 'assets/gameoverscreen3.png');
  },
  create: function () {
    game.sound.stopAll();
    const gameOverImg = game.cache.getImage('gameover');
    game.add.sprite(
      game.world.centerX - gameOverImg.width / 2,
      game.world.centerY - gameOverImg.height / 2,
      'gameover');
    game.input.onDown.add(() => { game.state.start('main'); });
  }
};


  const game = new Phaser.Game(650, 650);
  game.state.add('main', mainState);
  game.state.add('gameover', gameoverState);
  game.state.add('gamewin', gamewinState);
  game.state.add('mini', miniState);
  game.state.start('main');
