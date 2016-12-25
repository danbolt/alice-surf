var TitleScreen = function () {
  //
};
TitleScreen.prototype.create = function () {
  this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.DOWN);
  this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.UP);
  this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
  
  this.game.stage.backgroundColor = '#000000';

  this.game.camera.reset();

  var logo = this.game.add.sprite(this.game.width / 2, this.game.height / 4 + 16, 'logo');
  logo.anchor.set(0.5, 0.5);

  var text = this.game.add.bitmapText(this.game.width / 2, this.game.height / 3 * 2, 'font', 'merry christmas alice!\nlove daniel\n\n\npress space to play', 8);
  text.align = 'center';
  text.anchor.set(0.5);

  var downKey = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR).onUp.add(function () {
    GameState.Score = 0;

    SoundBank['select'].play();

    this.game.state.start('PreWave', true, false, 0);
  }, this);
};