var GameOver = function () {
  //
};
GameOver.prototype.create = function () {
  this.game.stage.backgroundColor = '#000000';

  this.game.camera.reset();

  var text = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2, 'font', 'crash! game over!\n\n\n\nyour score was ' + GameState.Score + '\n\n\n\npress space to return\n\nto the title screen', 8);
  text.anchor.set(0.5);
  text.align = 'center';

  var downKey = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR).onUp.add(function () {
    SoundBank['select'].play();

    this.game.state.start('TitleScreen');
  }, this);
};