var GameOver = function () {
  //
};
GameOver.prototype.create = function () {
  this.game.stage.backgroundColor = '#000000';

  this.game.camera.reset();

  var text = this.game.add.bitmapText(0, 0, 'font', 'game over bro\nyour score was great\npress space to go back to title', 8);

  var downKey = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR).onUp.add(function () {
    this.game.state.start('TitleScreen');
  }, this);
};