var PreWave = function () {
  this.level = 0;
  this.catCount = 0;
};
PreWave.prototype.init = function (levelNumber) {
  this.level = levelNumber;
}
PreWave.prototype.create = function () {
  this.game.stage.backgroundColor = '#000000';

  this.game.camera.reset();

  var text = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2 - 32, 'font', 'surfs up!\nwave ' + (this.level + 1) + '\n\nsave the cats', 8);
  text.align = 'center';
  text.anchor.set(0.5);

  var c = new Cat(this.game, this.game.width / 2, this.game.height / 2);

  this.game.time.events.add(3000, function () {
    this.game.state.start('Gameplay', true, false, this.level);
  }, this);
};

var PostWave = function () {
  this.level = 0;
};
PostWave.prototype.init = function (levelNumber, catCount) {
  this.level = levelNumber;
  this.catCount = catCount;
}
PostWave.prototype.create = function () {
  this.game.stage.backgroundColor = '#000000';

  this.game.camera.reset();

  var congratsText = this.game.add.bitmapText(this.game.width / 2, this.game.width / 4, 'font', 'wave ' + (this.level + 1) + ' complete', 8);
  congratsText.align = 'center';
  congratsText.anchor.set(0.5, 0.5);

  var catCountLabel = this.game.add.bitmapText(this.game.width / 4, this.game.height / 2 - 16, 'font', ' cats: \n\nscore: ', 8);

  var scoreValuesLabel = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2 - 16, 'font', this.catCount + '\n\n' + GameState.Score, 8);

  var encouragementText = this.game.add.bitmapText(this.game.width / 2, this.game.height / 4 * 3 - 16, 'font', 'nice!', 8);
  encouragementText.anchor.set(0.5);
  encouragementText.align = 'center';

  this.game.time.events.add(3000, function () {
    this.game.state.start('PreWave', true, false, this.level + 1);
  }, this);
};