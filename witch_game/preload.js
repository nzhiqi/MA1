class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });

    // Put global variable here
  }

  preload() {
    // Step 1, load JSON
    //this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");
    this.load.tilemapTiledJSON("world", "assets/worldmap.tmj");

    // Step 2 : Preload any images here
    //this.load.image("building", "assets/Buildings32x32.png");
    //this.load.image("street", "assets/Street32x32.png");
    this.load.image("house", "assets/house1.png");
    this.load.image("pipoya", "assets/pipoya.png");
    this.load.image("plants", "assets/plants.png");
    this.load.image("trees", "assets/trees-green.png");
    this.load.image("tuxmon", "assets/tuxmon-32x32.png");
    
    // player animation
    this.load.spritesheet('player', 'assets/player_2.png', {frameWidth: 68, frameHeight: 68});
    this.load.spritesheet('enemy', 'assets/enemy.png', {frameWidth: 68, frameHeight: 68});



    // // heart anim
    // this.load.spritesheet('heart', 'assets/heart.png',{ frameWidth:84, frameHeight:84 });

  }

  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    //let map = this.make.tilemap({ key: "world1" });
    let map = this.make.tilemap({ key: "world" });

    
    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    //let buildingTiles = map.addTilesetImage("Buildings32x32", "building");
    //let streetTiles = map.addTilesetImage("Street32x32", "street");
    let houseTiles = map.addTilesetImage("house32x32", "house");
    let pipoyaTiles = map.addTilesetImage("pipoya32x32", "pipoya");
    let plantsTiles = map.addTilesetImage("plants32x32", "plants");
    let treesTiles = map.addTilesetImage("trees32x32", "trees");
    let tuxmonTiles = map.addTilesetImage("tuxmon32x32", "tuxmon");


    // Step 5  create an array of tiles
    // let tilesArray = [
    //   buildingTiles,
    //   streetTiles,
    // ];
    let tilesArray = [
      houseTiles, pipoyaTiles, plantsTiles, treesTiles, tuxmonTiles
    ]

    // Step 6  Load in layers by layer

    this.ground = map.createLayer("ground",tilesArray,0,0);
    this.stairs = map.createLayer("stairs",tilesArray,0,0);
    this.slider = map.createLayer("slider",tilesArray,0,0);
    this.object = map.createLayer("object",tilesArray,0,0);

    // //add heart object
    // this.anims.create({
    //   key: "heartAnim",
    //   frames: this.anims.generateFrameNumbers("heart", { start: 0, end: 2 }),
    //   frameRate: 5,
    //   repeat: -1,
    //   });
  
    // var heart1 = map.findObject("objectlayer", (obj) => obj.name === "heart1");
    // this.enemy1 = this.physics.add.sprite(heart1.x, heart1.y, 'heart1').play('heartAnim');


    // Player animation
    this.anims.create({
      key: 'leftplayer',
      frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
      frameRate: 5,
      repeat: -1
  });

  this.anims.create({
      key: 'upplayer',
      frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
      frameRate: 5,
      repeat: -1
  });

  this.anims.create({
      key: 'rightplayer',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
      frameRate: 5,
      repeat: -1
  });

  this.anims.create({
      key: 'downplayer',
      frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
      frameRate: 5,
      repeat: -1
  });
   
  this.player = this.physics.add.sprite(485, 442, 'player');
  this.player.body.setSize(this.player.width*0.5,this.player.height*0.7)
  window.player = this.player;


  // Enemy animation
  this.anims.create({
    key: 'leftenemy',
    frames: this.anims.generateFrameNumbers('enemy', { start: 10, end: 12 }),
    frameRate: 5,
    repeat: -1
});

this.anims.create({
    key: 'upenemy',
    frames: this.anims.generateFrameNumbers('enemy', { start: 4, end: 6 }),
    frameRate: 5,
    repeat: -1
});

this.anims.create({
    key: 'rightenemy',
    frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
    frameRate: 5,
    repeat: -1
});

this.anims.create({
    key: 'downenemy',
    frames: this.anims.generateFrameNumbers('enemy', { start: 7, end: 9 }),
    frameRate: 5,
    repeat: -1
});
 
this.time.addEvent({
  delay: 0,
  callback: this.moveDownUp,
  callbackScope: this,
  loop: false,
});

this.enemy = this.physics.add.sprite(489, 442, 'enemy').setScale(0.7)
this.enemy.body.setSize(this.enemy.width*0.5,this.enemy.height*0.7)
window.enemy = this.enemy;


  // var heart1 = map.findObject("Object Layer 1", (obj) => obj.name === "in witch");

  this.slider.setCollisionByExclusion(-1, true) 
  this.object.setCollisionByExclusion(-1, true) 

  // this.physics.add.collider(this.object1, this.object2, this.object3, this.wall, this.player);
  this.physics.add.collider(this.slider, this.player);
  this.physics.add.collider(this.object, this.player);

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

    if (this.player.x > 472 && this.player.x < 494 && this.player.y > 333 && this.player.y < 345) {
      console.log("Jump to level1")
      this.level1();
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


  moveDownUp() {
    console.log("moveDownUp");
    this.tweens.timeline({
      targets: this.enemy,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 2000,
      tweens: [
        {
          y: 400,
        },
        {
          y: 180,
        },
      ],
    });
  }

  level1(player,tile){
    console.log("level1 function");
    this.scene.start("level1");
  }

} //////////// end of class world ////////////////////////
