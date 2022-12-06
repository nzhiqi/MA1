class s7 extends Phaser.Scene {

    constructor ()
    {
        super({ key: "s7" });
    }
  
    preload() {
      this.load.image('s7', 'assets/s7.png')
  
  }
  
  create () {
      this.S7 = this.add.image(-15, -8, 's7').setOrigin(0, 0).setScale(0.095);
    
  
      var spaceDown = this.input.keyboard.addKey('SPACE');
      var enterDown = this.input.keyboard.addKey('enter');
      
      spaceDown.on('down', function(){
      this.scene.stop("s7");
      this.player = {};
        this.player.x= 451;
        this.player.y=255.8;
        this.scene.start("level1", {player: this.player});
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