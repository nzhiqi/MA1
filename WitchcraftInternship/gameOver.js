class gameOver extends Phaser.Scene {

    constructor ()
    {
        super({ key: "gameOver" });
    }
  
    preload() {
      this.load.image('gameOver', 'assets/lose.jpg')
  
  }
  
  create () {
      this.gameOver = this.add.image(-30, -8, 'gameOver').setOrigin(0, 0).setScale(0.095);
      this.loseSnd = this.sound.add("lose");
    
  
      var spaceDown = this.input.keyboard.addKey('SPACE');
    //   var enterDown = this.input.keyboard.addKey('enter');
      
      spaceDown.on('down', function(){
      this.scene.stop("gameOver");
      this.scene.start("level1");
      }, this );

      this.loseSnd.play();

  
    //   enterDown.on('down', function(){
    //     console.log("skip tutorial");
    //     this.player = {};
    //     this.player.x= 451;
    //     this.player.y=255.8;
    //     this.scene.start("level4", {player: this.player});
    //     }, this );
  
  }
    
  }