class s6 extends Phaser.Scene {

    constructor ()
    {
        super({ key: "s6" });
    }
  
    preload() {
      this.load.image('s6', 'assets/s6.png')
  
  }
  
  create () {
      this.S6 = this.add.image(-15, -8, 's6').setOrigin(0, 0).setScale(0.095);
    
  
      var spaceDown = this.input.keyboard.addKey('SPACE');
      var enterDown = this.input.keyboard.addKey('enter');
      
      spaceDown.on('down', function(){
      this.scene.stop("s6");
      this.scene.start("s7");
      }, this );
  
      enterDown.on('down', function(){
        console.log("skip tutorial");
        this.player = {};
        this.player.x= 489;
        this.player.y=378;
        this.scene.start("world", {player: this.player});
        }, this );
  
  
  }
    
  }