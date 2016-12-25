var Cutscene = function () {
  this.dialogue = [
    'Alice! We need your help!',
    'Surfs up and the cats are in\ndanger!',
    'You need to save them! That\'s\ntotally my last executive\norder as prez. Good luck!',
  ];
};
Cutscene.prototype.create = function () {
  this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.DOWN);
  this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.UP);
  this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
  
  this.cutsceneImage = this.game.add.sprite(0, 24, 'cutscene', 0);

  this.index = 0;

  var logoText = this.game.add.bitmapText(32, 128 + 24 + 24, 'font', '', 8);
  logoText.maxWidth = (this.game.width - 64);
  this.logoText = logoText;

  var skipText = this.game.add.bitmapText(this.game.width, this.game.height - 8, 'font', 'press esc to skip', 8);
  skipText.align = 'right';
  skipText.anchor.x = 1;
  this.game.input.keyboard.addKey(Phaser.KeyCode.ESC).onDown.add(function () { this.game.state.start('TitleScreen'); }, this);

  this.playText();
};
Cutscene.prototype.playText = function () {
  var bipCounter = 0;
  var logoLoop = this.game.time.events.loop(100, function () {
    if (bipCounter === this.dialogue[this.index].length + 1) {
      this.game.time.events.remove(logoLoop);

      //boop

      this.index++;

      if (this.index === this.dialogue.length) {
        this.game.time.events.add(2000, function () {
          this.game.state.start('TitleScreen');
        }, this);
      } else {
        this.game.time.events.add(800, function () {
          this.cutsceneImage.frame = this.index;
          this.playText();
        }, this);
      }

      return;
    }

    //bip
    if (this.dialogue[this.index] !== ' ') {
      SoundBank['bip'].play(undefined, undefined, 0.6);
    }

    this.logoText.text = this.dialogue[this.index].substring(0, bipCounter);

    bipCounter++;
  }, this);
};
