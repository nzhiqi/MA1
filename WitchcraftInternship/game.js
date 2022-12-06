var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 30 * 32,
    height: 20 * 32,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#D0BE9C',
    pixelArt: true,
    scene: [preload, s1, s2, s3, s4, s5, s6, s7, level1, world, level2, level3, level4, gameOver, winningScene]
};

var game = new Phaser.Game(config);
window.game = game;
window.potion8 = 0;
window.potion9 = 0;
window.potion10 = 0;
window.live = 3;