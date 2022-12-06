class level3 extends Phaser.Scene {
  constructor() {
    super({
      key: "level3",
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
    this.load.tilemapTiledJSON("level3", "assets/flowershop.tmj");

    // Step 2 : Preload any images here
    //this.load.image("building", "assets/Buildings32x32.png");
    //this.load.image("street", "assets/Street32x32.png");
    this.load.image("generic", "assets/1_Generic_32x32.png");
    this.load.image("grocerystore", "assets/16_Grocery_store_32x32.png");
    this.load.image("halloween", "assets/halloween32x32.png");
    this.load.image("livingroom", "assets/2_LivingRoom_32x32.png");

    // // object anim
    this.load.spritesheet('potion5', 'assets/potion4.png',{ frameWidth:67, frameHeight:67 });
    this.load.spritesheet('potion6', 'assets/potion5.png',{ frameWidth:67, frameHeight:67 });
    this.load.spritesheet('potion4', 'assets/potion6.png',{ frameWidth:67, frameHeight:67 });
    this.load.spritesheet('potion7', 'assets/potion7.png',{ frameWidth:67, frameHeight:67 });


  }

  create() {
    console.log("*** level3 scene");

    //Step 3 - Create the map from main
    //let map = this.make.tilemap({ key: "world1" });
    let map = this.make.tilemap({ key: "level3" });

    this.healingSnd = this.sound.add("healing");
    this.collectSnd = this.sound.add("collect");
    this.biteSnd = this.sound.add("bite");

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    //let buildingTiles = map.addTilesetImage("Buildings32x32", "building");
    //let streetTiles = map.addTilesetImage("Street32x32", "street");
    let genericTiles = map.addTilesetImage("Generic32x32", "generic");
    let grocerystoreTiles = map.addTilesetImage("grocerystore32x32", "grocerystore");
    let halloweenTiles = map.addTilesetImage("halloween32x32", "halloween");
    let livingroomTiles = map.addTilesetImage("LivingRoom32x32", "livingroom");


    // Step 5  create an array of tiles
    // let tilesArray = [
    //   buildingTiles,
    //   streetTiles,
    // ];
    let tilesArray = [
      genericTiles, grocerystoreTiles, halloweenTiles, livingroomTiles
    ]

    // Step 6  Load in layers by layer

    this.ground = map.createLayer("ground",tilesArray,0,0);
    this.wall2 = map.createLayer("wall2",tilesArray,0,0);
    this.wall = map.createLayer("wall",tilesArray,0,0);
    this.floor = map.createLayer("floor",tilesArray,0,0);
    this.object = map.createLayer("object",tilesArray,0,0);
    this.object2 = map.createLayer("object2",tilesArray,0,0);


    // object anim
        
    this.anims.create({
        key: "potion5",
        frames: this.anims.generateFrameNumbers("potion5", { start: 0, end: 4 }),
        frameRate: 5,
        repeat: -1,
        });  

    this.anims.create({
        key: "potion6",
        frames: this.anims.generateFrameNumbers("potion6", { start: 0, end: 4 }),
        frameRate: 5,
        repeat: -1,
        });  
  
        this.anims.create({
            key: "potion4",
            frames: this.anims.generateFrameNumbers("potion4", { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1,
            });  
            
        this.anims.create({
            key: "potion7",
            frames: this.anims.generateFrameNumbers("potion7", { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1,
            });  
           // Player animation
   
  this.player = this.physics.add.sprite(this.player.x, this.player.y, 'player');
  //this.player = this.physics.add.sprite(615, 602, 'player');
  this.player.body.setSize(this.player.width*0.5,this.player.height*0.7)
  window.player = this.player;
  this.player.setCollideWorldBounds(true);//don't go out of the this.map


  this.object.setCollisionByExclusion(-1, true) 
  this.object2.setCollisionByExclusion(-1, true) 
  this.wall.setCollisionByExclusion(-1, true) 
  this.wall2.setCollisionByExclusion(-1, true) 

  // this.physics.add.collider(this.object1, this.object2, this.object3, this.wall, this.player);
  this.physics.add.collider(this.object, this.player);
  this.physics.add.collider(this.object2, this.player);
  this.physics.add.collider(this.wall2, this.player);
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


this.enemy1 = this.physics.add.sprite(574,255,"downenemy").play('downenemy').setScale(0.6);
this.enemy2 = this.physics.add.sprite(431,413,"downenemy").play('downenemy').setScale(0.6);
this.enemy3 = this.physics.add.sprite(670,593,"leftenemy").play('leftenemy').setScale(0.6);

this.physics.add.overlap(
  this.player,
  [this.enemy1,this.enemy2,this.enemy3],
  this.enemyCaught,
  null,
  this
);

this.potion5 = this.physics.add.sprite(333,453,'potion5').play('potion5').setScale(0.7);
this.potion6 = this.physics.add.sprite(668,205,'potion6').play('potion6').setScale(0.7);
this.potion4 = this.physics.add.sprite(789,456,'potion4').play('potion4').setScale(0.7);
this.potion7 = this.physics.add.sprite(241,183,'potion7').play('potion7').setScale(0.7);
this.physics.add.overlap(this.player,this.potion5,this.collectpotion5,null,this)
this.physics.add.overlap(this.player,this.potion6,this.collectpotion6,null,this)
this.physics.add.overlap(this.player,this.potion4,this.collectpotion4,null,this)
this.physics.add.overlap(this.player,this.potion7,this.collectpotion7,null,this)
  } /////////////////// end of create //////////////////////////////

  update() {

    if (this.player.x > 561 && this.player.x < 655 && this.player.y > 615 && this.player.y < 617) {
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

  collectpotion5(player,potion5)
{
  this.collectSnd.play();

  console.log('collect potion5');
  potion5.disableBody(true,true);

  // window.kuih= window.kuih + 10;
  console.log("potion5:", window.potion5);

  // this.kuihScore.setText('kuih:'+window.kuih);
}

collectpotion6(player,potion6)
{
  this.collectSnd.play();

  console.log('collect potion6');
  potion6.disableBody(true,true);

  // window.kuih= window.kuih + 10;
  console.log("potion6:", window.potion6);

  // this.kuihScore.setText('kuih:'+window.kuih);
}

collectpotion4(player,potion4)
{
  this.collectSnd.play();

  console.log('collect potion4');
  potion4.disableBody(true,true);

  // window.kuih= window.kuih + 10;
  console.log("potion4:", window.potion4);

  // this.kuihScore.setText('kuih:'+window.kuih);
}

collectpotion7(player,potion7)
{
  this.collectSnd.play();

  console.log('collect potion7');
  potion7.disableBody(true,true);

  // window.kuih= window.kuih + 10;
  console.log("potion7:", window.potion7);

  // this.kuihScore.setText('kuih:'+window.kuih);
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
  
  }
    }

    enemy1() {
      console.log("downenemy");
      this.tweens.timeline({
        targets: this.enemy1,
        ease: "Linear",
        loop: -1, // loop forever
        duration: 1000,
        tweens: [
          {
            x: 465,
          },
          {
            x: 574,
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
            y: 583,
          },
          {
            y: 413,
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
            y: 400,
          },
          {
            y: 593,
          },
        ],
      });
    }

  world(player,tile){
    console.log("world function");
    this.player.x= 785;
    this.player.y=847;
    this.player.dir = "downplayer";
    this.scene.start("world", {player: this.player});
  }
} //////////// end of class world ////////////////////////
