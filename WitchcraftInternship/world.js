class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });
  }

  init(data){
    this.player= data.player
    this.inventory= data.inventory
  }
  preload() {
    this.load.tilemapTiledJSON("world", "assets/worldmap.tmj");

    this.load.image("house", "assets/house1.png");
    this.load.image("pipoya", "assets/pipoya.png");
    this.load.image("plants", "assets/plants.png");
    this.load.image("trees", "assets/trees-green.png");
    this.load.image("tuxmon", "assets/tuxmon-32x32.png");
    this.load.image("house3", "assets/house3.png");
    this.load.image("myhouse", "assets/myhouse.png");
    this.load.image("friendhouse2", "assets/friendhouse2.png");
  }

  create() {
    console.log("*** world scene");

    let map = this.make.tilemap({ key: "world" });

    //sound effects
    this.healingSnd = this.sound.add("healing");
    this.collectSnd = this.sound.add("collect");
    this.biteSnd = this.sound.add("bite");
    // this.completelevel = this.sound.add("finish");

    let houseTiles = map.addTilesetImage("house32x32", "house");
    let pipoyaTiles = map.addTilesetImage("pipoya32x32", "pipoya");
    let plantsTiles = map.addTilesetImage("plants32x32", "plants");
    let treesTiles = map.addTilesetImage("trees32x32", "trees");
    let tuxmonTiles = map.addTilesetImage("tuxmon32x32", "tuxmon");
    let house3Tiles = map.addTilesetImage("house332x32", "house3");
    let friendhouse2Tiles = map.addTilesetImage("friendhouse232x32", "friendhouse2");
    let myhouseTiles = map.addTilesetImage("myhouse32x32", "myhouse");


    let tilesArray = [
      houseTiles, pipoyaTiles, plantsTiles, treesTiles, tuxmonTiles, house3Tiles, friendhouse2Tiles, myhouseTiles
    ]

    // Step 6  Load in layers by layer

    this.ground = map.createLayer("ground",tilesArray,0,0);
    this.stairs = map.createLayer("stairs",tilesArray,0,0);
    this.slider = map.createLayer("slider",tilesArray,0,0);
    this.object = map.createLayer("object",tilesArray,0,0);

    this.physics.world.bounds.width= this.ground.width;
    this.physics.world.bounds.height= this.ground.height;

    // //add heart object
    
   
  this.player = this.physics.add.sprite(this.player.x, this.player.y, 'player');
  //this.player = this.physics.add.sprite(485, 442, 'player');
  this.player.body.setSize(this.player.width*0.5,this.player.height*0.7)
  window.player = this.player;
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

  this.slider.setCollisionByExclusion(-1, true) 
  this.object.setCollisionByExclusion(-1, true) 

  // this.physics.add.collider(this.object1, this.object2, this.object3, this.wall, this.player);
  this.physics.add.collider(this.slider, this.player);
  this.physics.add.collider(this.object, this.player);
  
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);

//     //enemy
// this.time.addEvent({
//   delay:1000,
//   callback: this.enemy1,
//   callbackScope: this,
//   loop:false,

// });

// this.time.addEvent({
//   delay:1000,
//   callback: this.enemy2,
//   callbackScope: this,
//   loop:false,

// });

// this.time.addEvent({
//   delay:1000,
//   callback: this.enemy3,
//   callbackScope: this,
//   loop:false,

// });


this.enemy1 = this.physics.add.sprite(451,607,"upenemy").play('upenemy').setScale(0.9);
this.enemy2 = this.physics.add.sprite(315,773,"rightenemy").play('rightenemy').setScale(0.9);
this.enemy3 = this.physics.add.sprite(609,1137,"leftenemy").play('leftenemy').setScale(0.9);

this.physics.add.overlap(
  this.player,
  [this.enemy1,this.enemy2,this.enemy3],
  this.enemyCaught,
  null,
  this
);

this.health = this.physics.add.sprite(206,1156,'health').play('health').setScale(0.7);
this.physics.add.overlap(this.player,this.health,this.collecthealth,null,this)
  } /////////////////// end of create //////////////////////////////

  update() {

//     if (this.player.x > 465 && this.player.x < 494 && this.player.y > 330 && this.player.y < 345) {
//       console.log("Jump to level1")
//       this.level1();
//     }

    if (this.player.x > 183 && this.player.x < 227 && this.player.y > 759.8 && this.player.y < 765) {
      console.log("Jump to level2")
      this.level2();
    }

    if (this.player.x > 718 && this.player.x < 751 && this.player.y > 791 && this.player.y < 799) {
      console.log("Jump to level3")
      this.level3();
    }

    if (this.player.x > 372 && this.player.x < 415 && this.player.y > 1079 && this.player.y < 1081) {
      console.log("Jump to level4")
      this.level4();
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

  // overlap1(health, player){
  //   console.log("health overlap player")
  //   // play collect sound
  //   this.healingSnd.play();
  //   health.disableBody( true, true);
  // }

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

    enemy1() {
      console.log("upenemy");
      this.tweens.timeline({
        targets: this.enemy1,
        ease: "Linear",
        loop: -1, // loop forever
        duration: 1000,
        tweens: [
          {
            x: 403,
          },
          {
            x: 559,
          },
        ],
      });
    }
  
    enemy2() {
      console.log("rightenemy");
      this.tweens.timeline({
        targets: this.enemy2,
        ease: "Linear",
        loop: -1, // loop forever
        duration: 1000,
        tweens: [
          {
            y: 840,
          },
          {
            y: 760,
          },
        ],
      });
    }
  
    enemy3() {
      console.log("leftenemy");
      this.tweens.timeline({
        targets: this.enemy3,
        ease: "Linear",
        loop: -1, // loop forever
        duration: 1000,
        tweens: [
          {
            y: 1186,
          },
          {
            y: 1075,
          },
        ],
      });
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
  // collectHealth(player, health){
  //   console.log("health collected");

  //   // this.healSnd.play();

  //   health.disableBody (true, true);
    
  //   // deduct live
  //   window.health++;
  //   console.log("health: ", window.health);
  //   if (window.health > 3){
  //       window.health = 3;
  //   }

  //   if (window.health == 3) {
  //     this.health3.setVisible(true);
  //   } 
  //    else if (window.health == 2) {
  //     this.health2.setVisible(true);
  //   } 
  //    else if (window.health == 1) {
  //     this.health1.setVisible(true);
  //   }
  // }

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

  world(player,tile){
    console.log("world function");
    this.player.x= 489;
    this.player.y= 442;
    this.scene.start("world", {player: this.player});
  }

//   level1(player,tile){
//     console.log("level1 function");
//     this.player.x= 382;
//     this.player.y=602;
//     this.scene.start("level1", {player: this.player});
//   }

  level2(player,tile){
    console.log("level2 function");
    this.player.x= 72.9;
    this.player.y=600;
    this.player.dir = "upplayer";
    this.scene.start("level2", {player: this.player});
  }

  level3(player,tile){
    console.log("level3 function");
    this.player.x= 604;
    this.player.y=594;
    this.player.dir = "upplayer";
    this.scene.start("level3", {player: this.player});
  }

  level4(player,tile){
    console.log("level4 function");
    this.player.x= 386;
    this.player.y=597;
    this.player.dir = "upplayer";
    this.scene.start("level4", {player: this.player});
  }

} //////////// end of class world ////////////////////////
