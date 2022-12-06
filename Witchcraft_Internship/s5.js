class s5 extends Phaser.Scene {

    constructor ()
    {
        super({ key: "s5" });
    }
  
    preload() {
      this.load.image('s5', 'assets/s5.png')
  
  }
  
  create () {
      this.S5 = this.add.image(-15, -8, 's5').setOrigin(0, 0).setScale(0.095);
    
  
      var spaceDown = this.input.keyboard.addKey('SPACE');
      var enterDown = this.input.keyboard.addKey('enter');
      
      spaceDown.on('down', function(){
      this.scene.stop("s5");
      this.scene.start("s6");
      }, this );
  
      enterDown.on('down', function(){
        console.log("skip tutorial");
        this.player = {};
        this.player.x= 451;
        this.player.y=255.8;
        this.scene.start("level1", {player: this.player});
        }, this );
  
  }
    
  }