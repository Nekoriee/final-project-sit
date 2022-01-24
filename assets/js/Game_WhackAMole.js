const canvas = document.getElementById("GameWindow"),  canvasLeft = canvas.offsetLeft + canvas.clientLeft,
    canvasTop = canvas.offsetTop + canvas.clientTop;
const context = canvas.getContext("2d");
const background = new Image();
const sprites = new Image();
sprites.src = '/assets/images/Games/WhackAMole/mole_spritesheet.png';
let burrows = [], burrows_c;
let menuButtons= ["normal", "normal"];
const maxMoles = 2; // максимум кротов на экране
let gameId, gameTimerId; // setInterval
let score = 0;
let time = -1;
let gameState;

function ImageFrame(offsetX, offsetY) {
    this.imgOffsetY = offsetY;
    this.imgOffsetX = offsetX;
}

function Animations() {
    this.in = new ImageFrame(256, 0);
    this.out = new ImageFrame(0, 0);
    this.gettingIn = [new ImageFrame(0, 0), new ImageFrame(128, 0), new ImageFrame(256, 0)];
    this.gettingOut = [new ImageFrame(0, 256), new ImageFrame(128, 256), new ImageFrame(0, 0)];
    this.smack = [new ImageFrame(0, 128), new ImageFrame(128, 128), new ImageFrame(256, 0)];
}

function Mole() {
    const thisMole = this;
    const animations = new Animations();
    const blockForMin = 200;
    const blockForMax = 600;
    let animFrame = 0;
    let outDurMax = 3000;
    let outDurMin = 1000;
    let timeId;
    this.timePerFrames = 100;
    this.state = "in";
    this.available = true;


    this.canGetOut = function() {
        if (this.state == "in" && this.available == true) return true;
        else return false;
    }

    this.blockForInterval = function(interval) {
        thisMole.available = false;
        setTimeout(function() {
            thisMole.available = true;
        }, interval)
    }

    this.changeState = function(state) {
        this.state = state;
        animFrame = 0;
    }

    this.getIn = function() {
        this.state = "gettingIn";
        requestAnimationFrame(redraw);

        if (animFrame < 2) {animFrame++; setTimeout(thisMole.getIn, this.timePerFrames);}
        else {
            thisMole.changeState("in");
            thisMole.blockForInterval(Math.round(Math.random() * 1000) % (blockForMax - blockForMin) + blockForMin);
        }
    }

    this.getOut = function() {
        this.state = "gettingOut";
        requestAnimationFrame(redraw);
        if (animFrame < 2) {animFrame++; setTimeout(thisMole.getOut, this.timePerFrames);}
        else {
            thisMole.changeState("out");
            timeId = setTimeout(function() {
                if (thisMole.state == "out") thisMole.getIn();
            }, (Math.round(Math.random() * 10000) % (outDurMax - outDurMin) + outDurMin));
        }
    }

    this.smackIn = function() {
        clearTimeout(timeId);
        thisMole.changeState("in");
        thisMole.blockForInterval(Math.round(Math.random() * 1000) % (blockForMax - blockForMin) + blockForMin);
        requestAnimationFrame(redraw);
    }

    this.draw = function(i, j) {
        switch (this.state) {
            case "gettingOut":
                //draw image frame
                context.drawImage(sprites, animations.gettingOut[animFrame].imgOffsetX, animations.gettingOut[animFrame].imgOffsetY, 128, 128, 87 + j * 238, 217 + i * 146, 128, 128);
                break;
            case "gettingIn":
                //draw image frame
                context.drawImage(sprites, animations.gettingIn[animFrame].imgOffsetX, animations.gettingIn[animFrame].imgOffsetY, 128, 128, 87 + j * 238,  217 + i * 146, 128, 128);
                break;
            case "smack":
                //draw image frame
                context.drawImage(sprites, animations.smack[animFrame].imgOffsetX, animations.smack[animFrame].imgOffsetY, 128, 128, 87 + j * 238,  217 + i * 146, 128, 128);
                break;
            case "in":
                context.drawImage(sprites, animations.in.imgOffsetX, animations.in.imgOffsetY, 128, 128, 87 + j * 238, 217 + i * 146, 128, 128);
                break;
            case "out":
                //draw mole out frame
                context.drawImage(sprites, 0, 0, 128, 128, 87 + j * 238, 217 + i * 146, 128, 128);
                break;
            default: //do nothing
        }
    }

    this.getState = function() {
        return this.state;
    }
}

function finishGame() {
    gameState = "scoreScreen";
    time = "Game Over";
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (burrows[i][j].getState() != "in") burrows[i][j].getIn();
        }
    }
    if (parseInt(localStorage.getItem("Game_WhackAMole.HighScore")) < score) {
        localStorage.setItem("Game_WhackAMole.HighScore", score);
    }
}

function isFinished() {
    if (gameState == "game") return false;
    else return true;
}

function redraw() {
        switch (gameState) {
            case "menu":
                context.drawImage(background, 0, 0);
                context.font = "75px Comic Sans MS";
                context.textAlign = "center";
                context.lineWidth = 8.5;

                switch (menuButtons[0]) {
                    case "hover":
                        context.strokeStyle = "#f7d04e";
                        context.fillStyle = "#80691f";
                        break;
                    default:
                        context.strokeStyle = "#f7d04e";
                        context.fillStyle = "#b0912b";
                }

                context.strokeText("Start Game", 780/2, 400);
                context.fillText("Start Game", 780/2, 400);
                context.font = "50px Comic Sans MS";
                context.lineWidth = 7;

                switch (menuButtons[1]) {
                    case "hover":
                        context.strokeStyle = "#f7d04e";
                        context.fillStyle = "#80691f";
                        break;
                    default:
                        context.strokeStyle = "#f7d04e";
                        context.fillStyle = "#b0912b";
                }

                context.strokeText("Reset Score", 780/2, 500);
                context.fillText("Reset Score", 780/2, 500);
                break;
            default:
                context.drawImage(background, 0, 0);
                context.font = "40px Comic Sans MS";
                context.fillStyle = "black";
                context.textAlign = "left";
                context.fillText("Score: " + score, 20, 760);
                context.textAlign = "right";
                context.fillText("High score: " + localStorage.getItem("Game_WhackAMole.HighScore"), 760, 760);
                context.textAlign = "center";
                context.fillText(time, 780/2, 45);
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        burrows[i][j].draw(i, j);
                    }
                }
        }
    ;
}

function countMoles() {
    let count = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (burrows[i][j].getState() != "in") count++;
        }
    }
    return count;
}

function gameLoop() {
    if (!isFinished()) {
        if (countMoles() < maxMoles) {
            let i, j;

            let interval = setInterval(function() {
                i = Math.round(Math.random() * 10) % 3;
                j = Math.round(Math.random() * 10) % 3;
                if (burrows[i][j].canGetOut()) {
                    clearInterval(interval)
                    burrows[i][j].getOut();
                }
            }, 0)
        }
    }
    else clearInterval(gameId);
}

function startGame() {
    gameState = "game";

    background.src = '/assets/images/Games/WhackAMole/background.png';
    background.onload = function() {
        score = 0;
        time = 60;
        if (localStorage.getItem("Game_WhackAMole.HighScore") == null) localStorage.setItem("Game_WhackAMole.HighScore", "0");

        burrows = [];

        for (let i = 0; i < 3; i++) {
            burrows.push(burrows_c = [])
            for (let j = 0; j < 3; j++) {
                burrows[i].push(null);
            }
        }

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                burrows[i][j] = new Mole();
            }
        }

        redraw();

        gameId = setInterval(gameLoop, 0);
        gameTimerId = setInterval(function() {
            time--;
            if (time == 0) {
                clearInterval(gameTimerId);
                finishGame();
            }
            requestAnimationFrame(redraw);
        }, 1000);
    };

}

function startMenu() {
    gameState = "menu";
    background.src = '/assets/images/Games/WhackAMole/background_menu.png';
    background.onload = function() {
        context.strokeStyle = "#f7d04e";
        context.fillStyle = '#b0912b';
        redraw();
    }
}

canvas.addEventListener('click', function(event) {
    let canvasRect = canvas.getBoundingClientRect();
    let x = event.clientX - canvasRect.left, y = event.clientY - canvasRect.top;
    switch (gameState) {
        case "game":
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (x > (87 + j * 238) && x < ((87 + j * 238) + 128) &&
                        y > (217 + i * 146) && y < (217 + i * 146 + 128)) {
                        if (burrows[i][j].getState() == "out") {
                            burrows[i][j].smackIn();
                            score++;
                        }
                    }

                }
            }
            break;
        case "menu":
            if ((x > 185 && x < 599) && (y > 337 && y < 410)) {
                startGame()
            }
            else if ((x > 245 && x < 537) && (y > 459 && y < 505)) {
                localStorage.setItem("Game_WhackAMole.HighScore", "0");
            }
            break;
        default:
            break;
    }
}, false);

canvas.addEventListener('mousemove', function(event) {
    if (gameState == "menu") {
        let canvasRect = canvas.getBoundingClientRect();
        let x = event.clientX - canvasRect.left, y = event.clientY - canvasRect.top;
        if ((x > 185 && x < 599) && (y > 337 && y < 410)) {
            menuButtons[0] = "hover"
            requestAnimationFrame(redraw);
        }
        else {
            menuButtons[0] = "normal"
            requestAnimationFrame(redraw);
        }
        if ((x > 245 && x < 537) && (y > 459 && y < 505)) {
            menuButtons[1] = "hover"
            requestAnimationFrame(redraw);
        }
        else {
            menuButtons[1] = "normal"
            requestAnimationFrame(redraw);
        }
    }
}, false);

window.onload = function() {
    startMenu()
}