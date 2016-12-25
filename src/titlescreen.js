var TitleScreen = function () {
  //
};
TitleScreen.prototype.create = function () {
  this.game.stage.backgroundColor = '#000000';

  this.game.camera.reset();

  var text = this.game.add.bitmapText(0, 0, 'font', 'title screen\npress space bro', 8);

  var downKey = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR).onUp.add(function () {
    GameState.Score = 0;

    SoundBank['select'].play();

    this.game.state.start('PreWave', true, false, 0);
  }, this);
};