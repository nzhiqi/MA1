class winningScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: "winningScene" });
    }
  
    preload() {
      this.load.image('winningScene', 'assets/win.jpg')
  
  }
  
  create () {
      this.winningScene = this.add.image(-30, -8, 'winningScene').setOrigin(0, 0).setScale(0.095);
      // window.music.stop();
      this.winSnd = this.sound.add("win");
    
  
      var spaceDown = this.input.keyboard.addKey('SPACE');
    //   var enterDown = this.input.keyboard.addKey('enter');
      
      spaceDown.on('down', function(){
      this.scene.stop("winningScene");
      this.scene.start("world");
      }, this );

      this.winSnd.play();
  
//       enterDown.on('down', function(){
//         console.log("skip tutorial");
//         this.player = {};
//         this.player.x= 489;
//         this.player.y=378;
//         this.scene.start("world", {player: this.player});
//         }, this );
  
  }
    
  }
