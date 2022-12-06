class level4 extends Phaser.Scene {
  constructor() {
    super({
      key: "level4",
    });

    // Put global variable here
  }

  init(data){
    this.player= data.player;
    this.inventory= data.inventory;
  }

  preload() {
    // Step 1, load JSON
    //this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");
    this.load.tilemapTiledJSON("level4", "assets/museum.tmj");

    // Step 2 : Preload any images here
    //this.load.image("building", "assets/Buildings32x32.png");
    //this.load.image("street", "assets/Street32x32.png");
    this.load.image("generic", "assets/1_Generic_32x32.png");
    this.load.image("grocerystore", "assets/16_Grocery_store_32x32.png");
    this.load.image("halloween", "assets/halloween32x32.png");
    this.load.image("livingroom", "assets/2_LivingRoom_32x32.png");
    this.load.image("museum", "assets/museum32x32.png");


    
    // player animation
    this.load.spritesheet('player', 'assets/player_2.png', {frameWidth: 68, frameHeight: 68});


    // audio
    this.load.audio("healing", "assets/healing.mp3");
    this.load.audio("collect", "assets/collect.mp3");

    // // object anim
    this.load.spritesheet('health', 'assets/health.png',{ frameWidth:68, frameHeight:68 });
    this.load.spritesheet('potion8', 'assets/potion8.png',{ frameWidth:67, frameHeight:67 });
    this.load.spritesheet('potion9', 'assets/potion9.png',{ frameWidth:67, frameHeight:67 });
    this.load.spritesheet('potion10', 'assets/potion10.png',{ frameWidth:67, frameHeight:67 });


  }

  create() {
    console.log("*** level4 scene");

    //Step 3 - Create the map from main
    //let map = this.make.tilemap({ key: "world1" });
    let map = this.make.tilemap({ key: "level4" });

    this.healingSnd = this.sound.add("healing");
    this.collectSnd = this.sound.add("collect");
    this.biteSnd = this.sound.add("bite");

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    //let buildingTiles = map.addTilesetImage("Buildings32x32", "building");
    //let streetTiles = map.addTilesetImage("Street32x32", "street");
    let genericTiles = map.addTilesetImage("generic32x32", "generic");
    let grocerystoreTiles = map.addTilesetImage("grocerystore32x32", "grocerystore");
    let halloweenTiles = map.addTilesetImage("halloween32x32", "halloween");
    let livingroomTiles = map.addTilesetImage("livingroom32x32", "livingroom");
    let museumTiles = map.addTilesetImage("museum32x32", "museum");


    // Step 5  create an array of tiles
    // let tilesArray = [
    //   buildingTiles,
    //   streetTiles,
    // ];
    let tilesArray = [
      genericTiles, grocerystoreTiles, halloweenTiles, livingroomTiles, museumTiles
    ]

    // Step 6  Load in layers by layer

    this.ground = map.createLayer("ground",tilesArray,0,0);
    this.floor = map.createLayer("floor",tilesArray,0,0);
    this.wall = map.createLayer("wall",tilesArray,0,0);
    this.wall2 = map.createLayer("wall2",tilesArray,0,0);
    this.object1 = map.createLayer("object1",tilesArray,0,0);
    this.object2 = map.createLayer("object2",tilesArray,0,0);


    // object anim
    this.anims.create({
        key: "health",
        frames: this.anims.generateFrameNumbers("health", { start: 0, end: 4 }),
        frameRate: 5,
        repeat: -1,
        });
        
    this.anims.create({
        key: "potion8",
        frames: this.anims.generateFrameNumbers("potion8", { start: 0, end: 4 }),
        frameRate: 5,
        repeat: -1,
        });  

    this.anims.create({
        key: "potion9",
        frames: this.anims.generateFrameNumbers("potion9", { start: 0, end: 4 }),
        frameRate: 5,
        repeat: -1,
        });  
  
        this.anims.create({
            key: "potion10",
            frames: this.anims.generateFrameNumbers("potion10", { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1,
            });  
          
     
    this.player = this.physics.add.sprite(this.player.x, this.player.y, 'player');
    //this.player = this.physics.add.sprite(384.6, 602.8, 'player');
    this.player.body.setSize(this.player.width*0.5,this.player.height*0.7)
    window.player = this.player;
  this.player.setCollideWorldBounds(true);//don't go out of the this.map

  this.object1.setCollisionByExclusion(-1, true) 
  this.object2.setCollisionByExclusion(-1, true) 
  this.wall.setCollisionByExclusion(-1, true) 
  this.wall2.setCollisionByExclusion(-1, true) 

  // this.physics.add.collider(this.object1, this.object2, this.object3, this.wall, this.player);
  this.physics.add.collider(this.object1, this.player);
  this.physics.add.collider(this.object2, this.player);
  this.physics.add.collider(this.wall, this.player);
  this.physics.add.collider(this.wall2, this.player);
  //window.player=this.player;

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

//enemy
this.time.addEvent({
  delay:500,
  callback: this.enemy1,
  callbackScope: this,
  loop:false,

});

this.time.addEvent({
  delay:500,
  callback: this.enemy2,
  callbackScope: this,
  loop:false,

});

this.time.addEvent({
  delay:1000,
  callback: this.enemy3,
  callbackScope: this,
  loop:false,

});


this.enemy1 = this.physics.add.sprite(150,500,"leftenemy").play('leftenemy').setScale(0.6);
this.enemy2 = this.physics.add.sprite(111,111,"downenemy").play('downenemy').setScale(0.6);
this.enemy3 = this.physics.add.sprite(561,237,"downenemy").play('downenemy').setScale(0.6);

this.physics.add.overlap(
  this.player,
  [this.enemy1,this.enemy2,this.enemy3],
  this.enemyCaught,
  null,
  this
);

this.health = this.physics.add.sprite(798,362,'health').play('health').setScale(0.7);
this.potion8 = this.physics.add.sprite(255,351,'potion8').play('potion8').setScale(0.7);
this.potion9 = this.physics.add.sprite(78,256,'potion9').play('potion9').setScale(0.7);
this.potion10 = this.physics.add.sprite(675,456,'potion10').play('potion10').setScale(0.7);
this.physics.add.overlap(this.player,this.potion8,this.collectpotion8,null,this)
this.physics.add.overlap(this.player,this.potion9,this.collectpotion9,null,this)
this.physics.add.overlap(this.player,this.potion10,this.collectpotion10,null,this)
this.physics.add.overlap(this.player,this.health,this.collecthealth,null,this)
  } /////////////////// end of create //////////////////////////////

  update() {

    if(window.potion10 >= 10)
 {
   this.scene.start("winningScene");
 }

    if (this.player.x > 337 && this.player.x < 431 && this.player.y > 615 && this.player.y < 617) {
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
  collectpotion8(player,potion8)
  {
    this.collectSnd.play();
  
    console.log('collect potion8');
    potion8.disableBody(true,true);
  
    window.potion8= window.potion8 + 10;
    console.log("potion8:", window.potion8);
  
    // this.kuihScore.setText('kuih:'+window.kuih);
  }
  
  collectpotion9(player,potion9)
  {
    this.collectSnd.play();
  
    console.log('collect potion9');
    potion9.disableBody(true,true);
  
    window.potion9= window.potion9 + 10;
    console.log("potion9:", window.potion9);
  
    // this.kuihScore.setText('kuih:'+window.kuih);
  }
  
  collectpotion10(player,potion10)
  {
    this.collectSnd.play();
  
    console.log('collect potion10');
    potion10.disableBody(true,true);
  
    window.potion10= window.potion10 + 10;
    console.log("potion10:", window.potion10);
  
    // this.kuihScore.setText('kuih:'+window.kuih);
  }
  
  collecthealth(player,health)
  {
    this.healingSnd.play();
  
    console.log('collect health');
    window.live = window.live+1
    health.disableBody(true,true);
  
    // window.kuih= window.kuih + 10;
    
    window.heart++;
    console.log("live: ", window.live)
    if (window.live > 3){
        window.live = 3;
    }
  
    if (window.live == 3) {
      this.livepng1.setVisible(true);
        this.livepng2.setVisible(true);
        this.livepng3.setVisible(true);
    } 
     else if (window.live == 2) {
      this.livepng1.setVisible(false);
      this.livepng2.setVisible(true);
      this.livepng3.setVisible(true);
    } 
     else if (window.live == 1) {
      this.livepng1.setVisible(false);
      this.livepng2.setVisible(false);
      this.livepng3.setVisible(true);
    }
    
    // this.kuihScore.setText('kuih:'+window.kuih);
  }

  world(player,tile){
    console.log("world function");
    this.player.x= 399;
    this.player.y=1100;
    this.player.dir = "downplayer";
    this.scene.start("world", {player: this.player});
  }

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
    // console.log("Jump to gameOver");
    //   this.gameOver();
  }
    }

    enemy1() {
      console.log("leftenemy");
      this.tweens.timeline({
        targets: this.enemy1,
        ease: "Linear",
        loop: -1, // loop forever
        duration: 1000,
        tweens: [
          {
            x: 49,
          },
          {
            x: 137,
          },
        ],
      });
    }
  
    enemy2() {
      console.log("downenemy");
      this.tweens.timeline({
        targets: this.enemy2,
        ease: "Linear",
        loop: -1, // loop forever
        duration: 1000,
        tweens: [
          {
            y: 218,
          },
          {
            y: 111,
          },
        ],
      });
    }
  
    enemy3() {
      console.log("downenemy");
      this.tweens.timeline({
        targets: this.enemy3,
        ease: "Linear",
        loop: -1, // loop forever
        duration: 1000,
        tweens: [
          {
            x: 687,
          },
          {
            x: 561,
          },
        ],
      });
    }
} //////////// end of class world ////////////////////////
