class level1 extends Phaser.Scene {
  constructor() {
    super({
      key: "level1",
    });

    // Put global variable here
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


    
    // player animation
    this.load.spritesheet('player', 'assets/player_2.png', {frameWidth: 68, frameHeight: 68});


    // // heart anim
    // this.load.spritesheet('heart', 'assets/heart.png',{ frameWidth:84, frameHeight:84 });

  }

  create() {
    console.log("*** level1 scene");

    //Step 3 - Create the map from main
    //let map = this.make.tilemap({ key: "world1" });
    let map = this.make.tilemap({ key: "level1" });

    
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


    // //add heart object
    // this.anims.create({
    //   key: "heartAnim",
    //   frames: this.anims.generateFrameNumbers("heart", { start: 0, end: 2 }),
    //   frameRate: 5,
    //   repeat: -1,
    //   });
  
    // var heart1 = map.findObject("objectlayer", (obj) => obj.name === "heart1");
    // this.enemy1 = this.physics.add.sprite(heart1.x, heart1.y, 'heart1').play('heartAnim');


    
   
  this.player = this.physics.add.sprite(489, 340, 'player');
  this.player.body.setSize(this.player.width*0.5,this.player.height*0.7)
  window.player = this.player;

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

  // this.add.sprite(100, 100, 'player').play('leftplayer');
  // this.add.sprite(100, 200, 'player').play('rightplayer');
  // this.add.sprite(100, 300, 'player').play('upplayer');
  // this.add.sprite(100, 400, 'player').play('downplayer');

        
    // Add main player here with physics.add.sprite

    // Add time event / movement here

    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool

    // What will collider witg what layers
    //this.physics.add.collider(mapLayer, this.player);

    // create the arrow keys
    //this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    //this.cameras.main.startFollow(this.player);
  } /////////////////// end of create //////////////////////////////

  update() {

    if (this.player.x > 369 && this.player.x < 399 && this.player.y < 616) {
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
    }


     
  } /////////////////// end of update //////////////////////////////
  world(player,tile){
    console.log("world function");
    this.scene.start("world");
  }
} //////////// end of class world ////////////////////////
