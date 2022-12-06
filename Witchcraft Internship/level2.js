class level2 extends Phaser.Scene {
  constructor() {
    super({
      key: "level2",
    });

    // Put global variable here
  }
  init(data){
    this.player= data.player;
    this.inventory= data.inventory;
  }
  preload() {
    this.load.tilemapTiledJSON("level2", "assets/friendhouse.tmj");

    this.load.image("generic", "assets/1_Generic_32x32.png");
    this.load.image("halloween", "assets/halloween32x32.png");
    this.load.image("livingroom", "assets/2_LivingRoom_32x32.png");

    // // object anim
    this.load.spritesheet('health', 'assets/health.png',{ frameWidth:68, frameHeight:68 });
    this.load.spritesheet('potion1', 'assets/potion1.png',{ frameWidth:67, frameHeight:67 });
    this.load.spritesheet('potion2', 'assets/potion2.png',{ frameWidth:67, frameHeight:67 });
    this.load.spritesheet('potion3', 'assets/potion3.png',{ frameWidth:67, frameHeight:67 });
    this.load.image('live', 'assets/live.png')

  }

  create() {
    console.log("*** level2 scene");

    //Step 3 - Create the map from main
    //let map = this.make.tilemap({ key: "world1" });
    let map = this.make.tilemap({ key: "level2" });

    this.healingSnd = this.sound.add("healing");
    this.collectSnd = this.sound.add("collect");
    this.biteSnd = this.sound.add("bite");

    let genericTiles = map.addTilesetImage("Generic32x32", "generic");
    let halloweenTiles = map.addTilesetImage("halloween32x32", "halloween");
    let livingroomTiles = map.addTilesetImage("LivingRoom32x32", "livingroom");


    let tilesArray = [
      genericTiles, halloweenTiles, livingroomTiles
    ]

    // Step 6  Load in layers by layer

    this.ground = map.createLayer("ground",tilesArray,0,0);
    this.floor = map.createLayer("floor",tilesArray,0,0);
    this.wall2 = map.createLayer("wall2",tilesArray,0,0);
    this.wall = map.createLayer("wall",tilesArray,0,0);
    this.object = map.createLayer("object",tilesArray,0,0);


    // object anim
    this.anims.create({
        key: "health",
        frames: this.anims.generateFrameNumbers("health", { start: 0, end: 4 }),
        frameRate: 3,
        repeat: -1,
        });
        
    this.anims.create({
        key: "potion1",
        frames: this.anims.generateFrameNumbers("potion1", { start: 0, end: 4 }),
        frameRate: 3,
        repeat: -1,
        });  

    this.anims.create({
        key: "potion2",
        frames: this.anims.generateFrameNumbers("potion2", { start: 0, end: 4 }),
        frameRate: 3,
        repeat: -1,
        });  
  
        this.anims.create({
            key: "potion3",
            frames: this.anims.generateFrameNumbers("potion3", { start: 0, end: 4 }),
            frameRate: 3,
            repeat: -1,
            });  
          

  this.player = this.physics.add.sprite(this.player.x, this.player.y, 'player');
  //this.player = this.physics.add.sprite(80, 596, 'player');
  this.player.body.setSize(this.player.width*0.5,this.player.height*0.7)
  window.player = this.player;
  this.player.setCollideWorldBounds(true);//don't go out of the this.map

  this.object.setCollisionByExclusion(-1, true) 
  this.wall.setCollisionByExclusion(-1, true) 
  this.wall2.setCollisionByExclusion(-1, true) 

  // this.physics.add.collider(this.object1, this.object2, this.object3, this.wall, this.player);
  this.physics.add.collider(this.object, this.player);
  this.physics.add.collider(this.wall2, this.player);
  this.physics.add.collider(this.wall, this.player);
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
this.enemy2 = this.physics.add.sprite(216,488,"downenemy").play('downenemy').setScale(0.6);
this.enemy3 = this.physics.add.sprite(670,593,"leftenemy").play('leftenemy').setScale(0.6);

this.physics.add.overlap(
  this.player,
  [this.enemy1,this.enemy2,this.enemy3],
  this.enemyCaught,
  null,
  this
);

this.health = this.physics.add.sprite(80,119,'health').play('health').setScale(0.7);
this.potion1 = this.physics.add.sprite(333,453,'potion1').play('potion1').setScale(0.7);
this.potion2 = this.physics.add.sprite(734,151,'potion2').play('potion2').setScale(0.7);
this.potion3 = this.physics.add.sprite(895,426,'potion3').play('potion3').setScale(0.7);
this.physics.add.overlap(this.player,this.potion1,this.collectpotion1,null,this)
this.physics.add.overlap(this.player,this.potion2,this.collectpotion2,null,this)
this.physics.add.overlap(this.player,this.potion3,this.collectpotion3,null,this)
this.physics.add.overlap(this.player,this.health,this.collecthealth,null,this)
  } /////////////////// end of create //////////////////////////////

  update() {

    if (this.player.x > 49 && this.player.x < 111 && this.player.y > 615 && this.player.y < 617) {
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
            y: 593,
          },
          {
            y: 488,
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

    collectpotion1(player,potion1)
{
  this.collectSnd.play();

  console.log('collect potion1');
  potion1.disableBody(true,true);

  // window.kuih= window.kuih + 10;
  console.log("potion1:", window.potion1);

  // this.kuihScore.setText('kuih:'+window.kuih);
}

collectpotion2(player,potion2)
{
  this.collectSnd.play();

  console.log('collect potion2');
  potion2.disableBody(true,true);

  // window.kuih= window.kuih + 10;
  console.log("potion2:", window.potion2);

  // this.kuihScore.setText('kuih:'+window.kuih);
}

collectpotion3(player,potion3)
{
  this.collectSnd.play();

  console.log('collect potion2');
  potion3.disableBody(true,true);

  // window.kuih= window.kuih + 10;
  console.log("potion3:", window.potion3);

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
    this.player.x= 208;
    this.player.y=788;
    this.player.dir = "downplayer";
    this.scene.start("world", {player: this.player});
  }
} //////////// end of class world ////////////////////////
