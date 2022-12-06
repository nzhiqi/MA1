class s2 extends Phaser.Scene {

    constructor ()
    {
        super({ key: "s2" });
    }
  
    preload() {
      this.load.image('s2', 'assets/s2.png')
  
  }
  
  create () {
      this.S2 = this.add.image(0, -8, 's2').setOrigin(0, 0).setScale(0.095);
    
      //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "level1" });

    // audio play
    this.music = this.sound
    .add("bgmusic",{
        loop : true,
    })
    .setVolume(0.4);
    this.bgmusic = this.music;
    this.music.play();
  
      var spaceDown = this.input.keyboard.addKey('SPACE');
      var enterDown = this.input.keyboard.addKey('enter');
      
      spaceDown.on('down', function(){
      this.scene.stop("s2");
      this.scene.start("s3");
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