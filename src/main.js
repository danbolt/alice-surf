var Constants = {
  Gravity : 500,
};

var Cat = function (game, x, y) {
  var offset = ~~(Math.random() * 3);

  Phaser.Sprite.call(this, game, x, y, 'test16x16', 6 + 2 * offset);

  this.game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
  this.body.allowGravity = false;

  this.animations.add('cat_dance', [6 + (2 * offset), 7 + (2 * offset)], 3, true);
  this.animations.play('cat_dance');

  this.game.add.existing(this);
};
Cat.prototype = Object.create(Phaser.Sprite.prototype);
Cat.prototype.constructor = Cat;

var Gameplay = function () {
	//
};
Gameplay.prototype.init = function() {
  this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.DOWN);
  this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.UP);
  this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

  this.game.input.gamepad.start();
};
Gameplay.prototype.Gameplay = function() {
  //
};
Gameplay.prototype.create = function() {

  // game logic config
  this.level = 0; // starts at 0 for 'array indexing'
  this.catCount = 0;
  this.game.stage.backgroundColor = '#3b8fb5';

  // physics config
  this.game.physics.arcade.gravity.y = Constants.Gravity;

  // create background
  var background = this.game.add.sprite(0, 120, 'test16x16', 5);
  background.fixedToCamera = true;
  background.width = this.game.width;
  background.height = this.game.height - 120;

  // create map
  this.map = this.game.add.tilemap('level1');
  this.map.addTilesetImage('sheet', 'test16x16_tile');
  this.foreground = this.map.createLayer('Foreground');
  this.foreground.resizeWorld();
  this.map.setCollisionByExclusion([0], true, this.foreground);

  // create cats
  this.cats = this.game.add.group();
  this.map.objects.cats.forEach(function (c) {
    var newCat = new Cat(this.game, c.x, c.y);

    this.cats.addChild(newCat);
    this.cats.addToHash(newCat);
  }, this);

  // input logic
  this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR).onDown.add(function () {
    this.player.body.velocity.y = -100;
  }, this);

  // ui
  this.ui = this.game.add.group();
  this.ui.fixedToCamera = true;
  var levelCounter = this.game.add.bitmapText(8, 8, 'font', 'level: ' + (this.level < 9 ? '0' + (this.level + 1) : (this.level + 1)), 8);
  this.ui.addChild(levelCounter);
  var catCounter = this.game.add.bitmapText(8, 16, 'font', 'cats:  ' + (this.catCount < 10 ? ('0' + (this.catCount)) : (this.catCount)), 8);
  this.catCounter = catCounter;
  this.ui.addChild(catCounter);

  // create a player
  this.player = this.game.add.sprite(48, 128, 'test32x32', 4);
  this.game.physics.arcade.enable(this.player, Phaser.Physics.ARCADE);
  this.player.body.setSize(8, 8);
  this.player.body.offset.x = 16;
  this.player.body.offset.y = 16;
  this.player.update = function () {
    if (this.body.velocity.y < 0) {
      this.frame = 4;
    } else if (this.body.velocity.y > 90) {
      this.frame = 6;
    } else {
      this.frame = 5;
    }
  };

  this.game.camera.follow(this.player);
};
Gameplay.prototype.update = function() {
  this.game.physics.arcade.collide(this.player, this.foreground, null, null, this);
  this.game.physics.arcade.overlap(this.player, this.cats, undefined, function (player, cat) {
    this.catCount++;
    this.catCounter.text = 'cats:  ' + (this.catCount < 10 ? ('0' + (this.catCount)) : (this.catCount));
    cat.kill();

    return false;
  }, this);

  this.player.body.velocity.x = 100;

  // if we bump the ceiling or a wall, the player loses!
  if (this.player.alive && (this.player.body.onWall() || this.player.body.touching.up)) {
    this.player.kill();

    var playerParticle = this.game.add.sprite(this.player.x, this.player.y, 'test32x32', 7);
    this.game.physics.enable(playerParticle, Phaser.Physics.ARCADE);
    playerParticle.body.velocity.set(-200);
    playerParticle.anchor.set(0.5);

    var boardParticle = this.game.add.sprite(this.player.x, this.player.y, 'test32x32', 8);
    this.game.physics.enable(boardParticle, Phaser.Physics.ARCADE);
    boardParticle.body.velocity.set(100, -400);
    boardParticle.anchor.set(0.5);

    var animateLoop = this.game.time.events.loop(200, function () {
      playerParticle.rotation += 90;
      boardParticle.rotation += -90;
    }, this);

    this.game.time.events.add(2000, function () {
      this.game.time.events.remove(animateLoop);

      this.game.state.start('GameOver');
    }, this);
  }
};

var main = function () {
	var game = new Phaser.Game(320, 240);
  game.state.add('Load', Load, false);
  game.state.add('GameOver', GameOver, false);
  game.state.add('TitleScreen', TitleScreen, false);
	game.state.add('Gameplay', Gameplay, false);

	game.state.start('Load');
};