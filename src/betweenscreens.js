var PreWave = function () {
  this.level = 0;
};
PreWave.prototype.init = function (levelNumber) {
  this.level = levelNumber;
}
PreWave.prototype.create = function () {
  this.game.stage.backgroundColor = '#000000';

  this.game.camera.reset();

  var text = this.game.add.bitmapText(50, 100, 'font', 'surfs up!\n\nlevel ' + (this.level + 1) + '\n\nsave the cats', 8);

  this.game.time.events.add(3000, function () {
    this.game.state.start('Gameplay', true, false, this.level);
  }, this);
};

var PostWave = function () {
  this.level = 0;
};
PostWave.prototype.init = function (levelNumber) {
  this.level = levelNumber;
}
PostWave.prototype.create = function () {
  this.game.stage.backgroundColor = '#000000';

  this.game.camera.reset();

  var text = this.game.add.bitmapText(10, 50, 'font', 'level ' + (this.level + 1) + ' complete', 8);

  this.game.time.events.add(3000, function () {
    this.game.state.start('PreWave', true, false, this.level + 1);
  }, this);
};