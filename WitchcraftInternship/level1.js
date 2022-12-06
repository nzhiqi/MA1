class level1 extends Phaser.Scene {
  constructor() {
    super({
      key: "level1",
    });

    // Put global variable here
  }
  init(data){
    this.player= data.player;
    // this.inventory= data.inventory;
  }
  preload() {
    // Step 1, load JSON
    //this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");
    this.load.tilemapTiledJSON("level1", "assets/witchroom.tmj");

    // Step 2 : Preload any images here
    //this.load.image("building", "assets/Buildings32x32.png");
    //this.load.image("street", "assets/Street32x32.png");
    this.load.image("generic", "assets/1_Generic_32x32.png");
    this.load.image("grocerystore", "assets/16_Grocery_store_32x32.png");
    this.load.image("halloween", "assets/halloween32x32.png");
    this.load.image("livingroom", "assets/2_LivingRoom_32x32.png");
    this.load.image("logcabin", "assets/logcabin32x32.png");
    this.load.image("museum", "assets/museum32x32.png");

    this.load.spritesheet('matilda', 'assets/matilda.png', {frameWidth: 68, frameHeight: 68});

  }

  create() {
    console.log("*** level1 scene");

    
    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    //let buildingTiles = map.addTilesetImage("Buildings32x32", "building");
    //let streetTiles = map.addTilesetImage("Street32x32", "street");
    let genericTiles = map.addTilesetImage("generic32x32", "generic");
    let grocerystoreTiles = map.addTilesetImage("grocerystore32x32", "grocerystore");
    let halloweenTiles = map.addTilesetImage("halloween32x32", "halloween");
    let livingroomTiles = map.addTilesetImage("livingroom32x32", "livingroom");
    let logcabinTiles = map.addTilesetImage("logcabin32x32", "logcabin");
    let museumTiles = map.addTilesetImage("museum32x32", "museum");


    // Step 5  create an array of tiles
    // let tilesArray = [
    //   buildingTiles,
    //   streetTiles,
    // ];
    let tilesArray = [
      genericTiles, grocerystoreTiles, halloweenTiles, livingroomTiles, logcabinTiles, museumTiles
    ]

    // Step 6  Load in layers by layer

    this.ground = map.createLayer("ground",tilesArray,0,0);
    this.staircase = map.createLayer("staircase",tilesArray,0,0);
    this.object1 = map.createLayer("object1",tilesArray,0,0);
    this.wall = map.createLayer("wall",tilesArray,0,0);
    this.object2 = map.createLayer("object2",tilesArray,0,0);
    this.object3 = map.createLayer("object3",tilesArray,0,0);

 this.player = this.physics.add.sprite(this.player.x, this.player.y, 'player');
  // this.player = this.physics.add.sprite(451, 255.8, 'player');
  this.player.body.setSize(this.player.width*0.5,this.player.height*0.7)
  window.player = this.player;

  this.matilda = this.physics.add.sprite(510, 200, 'matilda');
  this.matilda.body.setSize(this.matilda.width*0.8,this.matilda.height*0.7)
  window.matilda = this.matilda;

  this.object1.setCollisionByExclusion(-1, true) 
  this.object2.setCollisionByExclusion(-1, true) 
  this.object3.setCollisionByExclusion(-1, true) 
  this.wall.setCollisionByExclusion(-1, true) 

  // this.physics.add.collider(this.object1, this.object2, this.object3, this.wall, this.player);
  this.physics.add.collider(this.object1, this.player);
  this.physics.add.collider(this.object2, this.player);
  this.physics.add.collider(this.object3, this.player);
  this.physics.add.collider(this.wall, this.player);
  //window.player=this.player;

  this.player.setCollideWorldBounds(true);//don't go out of the this.map

  this.livepng1 = this.add.image (791,35,'live').setScrollFactor(0).setVisible(true).setScale(0.2);
  this.livepng2 = this.add.image (851,35,'live').setScrollFactor(0).setVisible(true).setScale(0.2);
  this.livepng3 = this.add.image (911,35,'live').setScrollFactor(0).setVisible(true).setScale(0.2);

  if ( window.live === 3) {
    this.livepng1.setVisible(true);
    this.livepng2.setVisible(true);
    this.livepng3.setVisible(true);

} else if ( window.live === 2) {
  this.livepng1.setVisible(true);
  this.livepng2.setVisible(true);
  this.livepng3.setVisible(false);

} else if ( window.live === 1) {
  this.livepng1.setVisible(true);
  this.livepng2.setVisible(false);
  this.livepng3.setVisible(false);
  
  } else if (window.key === 0) {
    this.livepng1.setVisible(false);
    this.livepng2.setVisible(false);
    this.livepng3.setVisible(false);

}
  } /////////////////// end of create //////////////////////////////

  update() {

    if (this.player.x > 342 && this.player.x < 431 && this.player.y > 615 && this.player.y < 617) {
      console.log("Jump to world")
      this.world();
    }

    this.cursors = this.input.keyboard.createCursorKeys();

    if (this.cursors.left.isDown)
    {
        console.log("left")
        this.player.setVelocityX(-160);
        this.player.anims.play('leftplayer', true);
    }
    else if (this.cursors.right.isDown)
    {
        console.log("right")
        this.player.setVelocityX(160);
        this.player.anims.play('rightplayer', true);
    }
    else if (this.cursors.up.isDown)
    {
        this.player.setVelocityY(-160);
        this.player.anims.play('upplayer', true);
    }
    else if (this.cursors.down.isDown)
    {
        this.player.setVelocityY(160);
        this.player.anims.play('downplayer', true);
    }
    else
    {
      this.player.setVelocity(0);
      this.player.stop();
    }


     
  } /////////////////// end of update //////////////////////////////

  
  //Function jump to room1
  enemyCaught(player,enemy){

    console.log("enemyCaught");

    this.biteSnd.play();

    this.cameras.main.shake(50);

    window.live = window.live-1

    enemy.disableBody(true, true);

    console.log("live: ", window.live)

    if ( window.live === 3) {
      this.livepng1.setVisible(true);
      this.livepng2.setVisible(true);
      this.livepng3.setVisible(true);
  
  } else if ( window.live === 2) {
    this.livepng1.setVisible(false);
    this.livepng2.setVisible(true);
    this.livepng3.setVisible(true);
  
  } else if ( window.live === 1) {
    this.livepng1.setVisible(false);
    this.livepng2.setVisible(false);
    this.livepng3.setVisible(true);
    
    } else if (window.key === 0) {
      this.livepng1.setVisible(false);
      this.livepng2.setVisible(false);
      this.livepng3.setVisible(false);
  
  }
  if (window.live == 0){
    this.scene.start("gameOver");
  
  }
    }

  world(player,tile){
    console.log("world function");
    this.player.x= 489;
    this.player.y=378;
    this.player.dir = "downplayer";
    this.scene.start("world", {player: this.player});
  }
} //////////// end of class world ////////////////////////
