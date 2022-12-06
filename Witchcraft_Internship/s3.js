class s3 extends Phaser.Scene {

    constructor ()
    {
        super({ key: "s3" });
    }
  
    preload() {
      this.load.image('s3', 'assets/s3.png')
  
  }
  
  create () {
      this.S2 = this.add.image(0, -8, 's3').setOrigin(0, 0).setScale(0.095);
    
  
      var spaceDown = this.input.keyboard.addKey('SPACE');
      var enterDown = this.input.keyboard.addKey('enter');
      
      spaceDown.on('down', function(){
      this.scene.stop("s3");
      this.scene.start("s4");
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