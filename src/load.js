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

var Preload = function () {
  //
};
Preload.prototype.init = function () {
  this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.game.scale.refresh();

  this.game.scale.pageAlignHorizontally = true;
  this.game.scale.pageAlignVertically = true;

  // enable crisp rendering
  this.game.stage.smoothed = false;
  this.game.renderer.renderSession.roundPixels = true;  
  Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
  PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST; //for WebGL
};
Preload.prototype.preload = function () {
  // Font is Gamegirl Classic by freakyfonts
  // License is for noncommercial use
  // http://www.fontspace.com/freaky-fonts/gamegirl-classic
  this.game.load.bitmapFont('font', 'asset/font/font.png', 'asset/font/font.json');
};
Preload.prototype.create = function () {
  var loadingText = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2, 'font', 'loading!\n\nplease wait!', 8);
  loadingText.align = 'center';
  loadingText.anchor.set(0.5);

  this.game.state.start('Load', false);
};

var Load = function () {
	//
};
Load.prototype.init = function () {
}
Load.prototype.preload = function() {

  this.game.load.spritesheet('test16x16', 'asset/img/16x16SquareSheet.png', 16, 16);
  this.game.load.spritesheet('test32x32', 'asset/img/16x16SquareSheet.png', 32, 32);
  this.game.load.image('test16x16_tile', 'asset/img/16x16SquareSheet.png');

  this.game.load.image('logo', 'asset/img/logo.png');

  this.game.load.spritesheet('cutscene', 'asset/img/cutscene.png', 320, 128);

  this.game.load.tilemap('level1', 'asset/map/level1.json', undefined, Phaser.Tilemap.TILED_JSON);
  this.game.load.tilemap('level2', 'asset/map/level2.json', undefined, Phaser.Tilemap.TILED_JSON);
  this.game.load.tilemap('level3', 'asset/map/level3.json', undefined, Phaser.Tilemap.TILED_JSON);
  this.game.load.tilemap('level4', 'asset/map/level4.json', undefined, Phaser.Tilemap.TILED_JSON);
  this.game.load.tilemap('level5', 'asset/map/level5.json', undefined, Phaser.Tilemap.TILED_JSON);

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