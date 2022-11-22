var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 30 * 32,
    height: 20 * 32,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [world, level1]
};

var game = new Phaser.Game(config);