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
      this.scene.start("world");
      }, this );

      this.loseSnd.play();

  
//       enterDown.on('down', function(){
//         console.log("skip tutorial");
//         this.player = {};
//         this.player.x= 489;
//         this.player.y=378;
//         this.scene.start("world", {player: this.player});
//         }, this );
  
  }
    
  }
