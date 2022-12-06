class s1 extends Phaser.Scene {

    constructor ()
    {
        super({ key: "s1" });
    }

    preload() {
      this.load.image('s1', 'assets/s1.png')
  
  }
  
  create () {
      this.S1 = this.add.image(0, 0, 's1').setOrigin(0, 0).setScale(0.09);
     
      console.log("*** world scene");
      let map = this.make.tilemap({ key: "world1" });
  
      var spaceDown = this.input.keyboard.addKey('SPACE');
      var enterDown = this.input.keyboard.addKey('enter');
      
      spaceDown.on('down', function(){
      this.scene.stop("s1");
      this.scene.start("s2");
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