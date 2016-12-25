var soundEffectsToLoad = [
  'surf0',
  'surf1',
  'surf2',
  'cat1',
  'cat2',
  'bip',
  'hurt',
  'select'
];

SoundBank = [];

var Load = function () {
	//
};
Load.prototype.init = function () {
  this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.game.scale.refresh();

  this.game.scale.pageAlignHorizontally = true;
  this.game.scale.pageAlignVertically = true;

  // enable crisp rendering
  this.game.stage.smoothed = false;
  this.game.renderer.renderSession.roundPixels = true;  
  Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
  PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST; //for WebGL
}
Load.prototype.preload = function() {
  // Font is Gamegirl Classic by freakyfonts
  // License is for noncommercial use
  // http://www.fontspace.com/freaky-fonts/gamegirl-classic
  this.game.load.bitmapFont('font', 'asset/font/font.png', 'asset/font/font.json');

  this.game.load.spritesheet('test16x16', 'asset/img/16x16SquareSheet.png', 16, 16);
  this.game.load.spritesheet('test32x32', 'asset/img/16x16SquareSheet.png', 32, 32);
  this.game.load.image('test16x16_tile', 'asset/img/16x16SquareSheet.png');

  this.game.load.image('logo', 'asset/img/logo.png');

  this.game.load.spritesheet('cutscene', 'asset/img/cutscene.png', 320, 128);

  this.game.load.tilemap('level1', 'asset/map/level1.json', undefined, Phaser.Tilemap.TILED_JSON);

  this.game.load.audio('background_melody', 'asset/bgm/bgm.mp3');

  soundEffectsToLoad.forEach(function (sname) {
    this.game.load.audio(sname, 'asset/sfx/' + sname + '.wav');
  }, this);
};
Load.prototype.create = function() {
  this.game.bgmMelody = this.game.add.audio('background_melody', 0.8, true);
  this.game.bgmMelody.play();

	soundEffectsToLoad.forEach(function (sname) {
    SoundBank[sname] = this.game.add.audio(sname, 0.8, false);
  }, this);

 	this.game.state.start('Cutscene');
};