class preload extends Phaser.Scene {
  constructor() {
    super({
      key: "preload"
    });
  }

  preload() {
    //player
    this.load.spritesheet('player', 'assets/player_2.png', {frameWidth: 68, frameHeight: 68});
    //enemy
    this.load.spritesheet('enemy', 'assets/enemy.png', {frameWidth: 68, frameHeight: 68});
    this.load.image('s1', 'assets/s1.png')
    this.load.image('live', 'assets/live.png')


    this.load.image("generic", "assets/1_Generic_32x32.png");
    this.load.image("grocerystore", "assets/16_Grocery_store_32x32.png");
    this.load.image("halloween", "assets/halloween32x32.png");
    this.load.image("livingroom", "assets/2_LivingRoom_32x32.png");
    this.load.image("logcabin", "assets/logcabin32x32.png");
    this.load.image("museum", "assets/museum32x32.png");

    // this.load.atlas('zLeft','assets/zLeft.png','assets/zLeft.json');
    // this.load.atlas('zRight','assets/zRight.png','assets/zRight.json');
    // this.load.atlas('zUp','assets/zUp.png','assets/zUp.json');
    // this.load.atlas('zDown','assets/zDown.png','assets/zDown.json');
    this.load.spritesheet('health', 'assets/health.png',{ frameWidth:68, frameHeight:68 });

    // this.load.atlas('Vaccine','assets/Vaccine.png','assets/Vaccine.json');
    // this.load.atlas('Life','assets/Life.png','assets/Life.json');

    // this.load.atlas('Lee-Left','assets/Lee-Left.png','assets/Lee-Left.json'); 
    // this.load.atlas('Lee-Right','assets/Lee-Right.png','assets/Lee-Right.json');
    // this.load.atlas('Lee-Up','assets/Lee-Up.png','assets/Lee-Up.json');
    // this.load.atlas('Lee-Down','assets/Lee-Down.png','assets/Lee-Down.json');

    // this.load.image("shooting", "assets/shooting.png");
    // this.load.image("Entry", "assets/entrySign.png");

    // this.load.image('startScene','assets/startScene.png');
    this.load.audio("healing", "assets/healing.mp3");
        this.load.audio("collect", "assets/collect.mp3");
        this.load.audio("bite", "assets/bite.mp3");
        this.load.audio("bgmusic", "assets/bgmusic.mp3");
        this.load.audio("win","assets/win.mp3");
        this.load.audio("lose","assets/lose.mp3");

    // this.load.audio("BGmusic","assets/BGmusic.wav");
    // this.load.audio("gameOver","assets/gameOver.wav");
    // this.load.audio("Win","assets/Win.wav");
    // this.load.audio("shooting","assets/shooting.wav");
    // this.load.audio("vaccine","assets/vaccine.wav");
    // this.load.audio("heart","assets/heart.wav");
    // this.load.audio("zombieHurt","assets/zombieHurt.wav");
    // this.load.audio("hurt","assets/hurt.wav");

  }/////////////////// end of preload //////////////////////////////

  create() {
    console.log("*** preload scene");

    this.S1 = this.add.image(0, 0, 's1').setOrigin(0, 0).setScale(0.09);
    console.log("*** world scene");
      let map = this.make.tilemap({ key: "world1" });
    //Background music
    // window.music = this.sound
    //   .add("BGmusic", {
    //     loop: true,
    //   })
    //   .setVolume(0.1);
    //   window.music.play();

    // this.anims.create({
    //   key:'FaroNPC',
    //   frames:[
    //     {key:'Faro',frame:'NPC1'},
    //     {key:'Faro',frame:'NPC2'},
    //     {key:'Faro',frame:'NPC4'},
    //     {key:'Faro',frame:'NPC3'},
    //   ],
    //   frameRate:2,
    //   repeat:-1
    // })   

    //player
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
      frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8}),
      frameRate: 5,
      repeat: -1
  });

  // Enemy animation
  this.anims.create({
    key: 'leftenemy',
    frames: this.anims.generateFrameNumbers('enemy', { start: 12, end: 15 }),
    frameRate: 5,
    repeat: -1
});

this.anims.create({
    key: 'upenemy',
    frames: this.anims.generateFrameNumbers('enemy', { start: 4, end: 7 }),
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
    frames: this.anims.generateFrameNumbers('enemy', { start: 8, end: 11 }),
    frameRate: 5,
    repeat: -1
});

  //heart
  this.anims.create({
    key: "health",
    frames: this.anims.generateFrameNumbers("health", { start: 0, end: 4 }),
    frameRate: 5,
    repeat: -1,
    });
    // this.add.image(0, 0, 'startScene').setOrigin(0, 0).setScale(0.24);
    // console.log("This is startScene");

    var spaceDown = this.input.keyboard.addKey('SPACE');

// On spacebar event, call the world scene        
spaceDown.on('down', function(){
  console.log("Go to s2");
  this.scene.start("s2");
  }, this );



  }/////////////////// end of create //////////////////////////////

}//////////// end of preload page ////////////////////////