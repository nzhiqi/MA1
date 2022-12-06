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
    
  
      var spaceDown = this.input.keyboard.addKey('SPACE');
    //   var enterDown = this.input.keyboard.addKey('enter');
      
      spaceDown.on('down', function(){
      this.scene.stop("winningScene");
      this.scene.start("level1");
      }, this );
  
    //   enterDown.on('down', function(){
    //     console.log("skip tutorial");
    //     this.player = {};
    //     this.player.x= 451;
    //     this.player.y=255.8;
    //     this.scene.start("level4", {player: this.player});
    //     }, this );
  
  }
    
  }