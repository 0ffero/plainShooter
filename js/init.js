vars.DEBUG && console.log('Initialising...');
var config = {
    type: Phaser.WEBGL, title: consts.appName, banner: false, url: window.location.href,
    backgroundColor: consts.canvas.colour, disableContextMenu: true,
    height: consts.canvas.height, width: consts.canvas.width,
    fps: { target: 60 },
    physics: {
        default: 'matter',
        matter: { debug: vars.DEBUG, gravity: { y: 0 } }
    },
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: consts.canvas.width, height: consts.canvas.height },
    scene: { preload: preload, create: create, update: update,
        pack: {
            files: [
                { type: 'image', key: 'loadingScreen', url: 'loadingScreen.png'}
            ]
        }
    }
};
vars.game.Phaser = new Phaser.Game(config);

/*
█████ ████  █████ █      ███  █████ ████  
█   █ █   █ █     █     █   █ █   █ █   █ 
█████ ████  ████  █     █   █ █████ █   █ 
█     █   █ █     █     █   █ █   █ █   █ 
█     █   █ █████ █████  ███  █   █ ████  
*/
function preload() {
    vars.game.Scene = this;
    vars.intro.init();
    vars.init('PRELOAD');
};



/*
█████ ████  █████ █████ █████ █████ 
█     █   █ █     █   █   █   █     
█     ████  ████  █████   █   ████  
█     █   █ █     █   █   █   █     
█████ █   █ █████ █   █   █   █████ 
*/
function create() {
    vars.init('CREATE'); // build the phaser objects, scenes etc
    vars.intro.addStartButton();
    vars.init('STARTAPP');
};

function update() {
    let gV = vars.game;

    if (vars.UI.layers.playerIntroText) { // intro text is still running
        vars.UI.layers.playerIntroText.container.update();
        return;
    };

    if (!gV.player1 && !gV.player2) return;

    let alive = 0; gV.player1.alive && alive++; (gV.player2 && gV.player2.alive) && alive++;
    if (!alive) return;

    gV.level && gV.level.update();
};