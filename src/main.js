var Preload = function () {
	//
};
Preload.prototype.init = function() {
  this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.game.scale.refresh();

  this.game.scale.pageAlignHorizontally = true;
  this.game.scale.pageAlignVertically = true;

  // enable crisp rendering
  this.game.stage.smoothed = false;
  this.game.renderer.renderSession.roundPixels = true;  
  Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
  PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST; //for WebGL

  this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.DOWN);
  this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.UP);
  this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

  this.game.input.gamepad.start();
};
Preload.prototype.preload = function() {
  // Font is Gamegirl Classic by freakyfonts
  // License is for noncommercial use
  // http://www.fontspace.com/freaky-fonts/gamegirl-classic
  this.game.load.bitmapFont('font', 'asset/font/font.png', 'asset/font/font.json');

  this.game.load.spritesheet('test16x16', 'asset/img/16x16SquareSheet.png', 16, 16);
  this.game.load.image('test16x16_tile', 'asset/img/16x16SquareSheet.png');

  this.game.load.tilemap('level1', 'asset/map/level1.json', undefined, Phaser.Tilemap.TILED_JSON);
};
Preload.prototype.create = function() {

  this.game.stage.backgroundColor = '#333333';

  // create a player
  this.player = this.game.add.sprite(64, 128, 'test16x16', 3);
  this.game.physics.arcade.enable(this.player, Phaser.Physics.ARCADE);

  // create map
  this.map = this.game.add.tilemap('level1');
  this.map.addTilesetImage('sheet', 'test16x16_tile');
  this.foreground = this.map.createLayer('Foreground');
  this.map.setCollisionByExclusion([0], true, this.foreground);
};
Preload.prototype.update = function() {
  this.game.physics.arcade.collide(this.player, this.foreground);

  this.player.animations.play((this.player.body.velocity.x < 0 ? 'l' : 'r') + (this.player.body.velocity.y < 0 ? 'u' : 'd'));
};

var main = function () {
	var game = new Phaser.Game(320, 240);
	game.state.add('Preload', Preload, false);

	game.state.start('Preload');
};