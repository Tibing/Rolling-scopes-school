// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 280;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

var explosions = [];
var snowflakes = [];
var bullets = [];
var enemyBullets = [];
var aliens = [];
var meteorites = [];
var ufo1 = [];
var ufo2 = [];
var ufo3 = [];
var ufo4 = [];
var ufo5 = [];
var ufo6 = [];
var freelifes = [];

var lastFire = Date.now();
var lastEnemiesFire = Date.now();
var gameTime = 0;
var lastTime;

// Speed in pixels per second
var playerSpeed = 300;
var bulletSpeed = 500;
var snowflakesSpeed = 70;
var alienSpeed = 100;
var freelifesSpeed = 60;
var meteoriteSpeed = 90;
var ufoSpeed = [200, 250, 100, 150, 300, 110];

var ufoCount = [10, 9, 6, 9, 6, 8];
var alienCount = 8;
var score = 0;
var progress = 0;
var lifesCount;

var h2 = document.createElement('h2');
h2.setAttribute('id', 'level');
document.getElementById('wrapper').insertBefore(h2, document.getElementById('wrapper').firstChild);
var ufo1CountEl = document.getElementById('ufo1Count');
var ufo2CountEl = document.getElementById('ufo2Count');
var ufo3CountEl = document.getElementById('ufo3Count');
var ufo4CountEl = document.getElementById('ufo4Count');
var ufo5CountEl = document.getElementById('ufo5Count');
var ufo6CountEl = document.getElementById('ufo6Count');
var alienCountEl = document.getElementById('alienCount');
var levelEl = document.getElementById('level');
var instructionEl = document.getElementById('levelInstructions');
var scoreEl = document.getElementById('score');
var lifesCountEl = document.getElementById('lifesCount');
var progressEl = document.getElementById('progress');
var progressValue = progressEl.getAttribute('value') ;
var progressValueEl = document.getElementById('progressValue');

var isFinished;
var isMissionComplete = [true, true, true, true, true, true, true]; 
var upDirection;
var isGameOver;
var isFirstPlay = true;
var random  = Math.random() * 30;
var changeDirection = true;
var level = 1;
var next;

var nextLevelValue = [];
nextLevelValue.push(ufoCount[0] + ufoCount[1]); //mission of level 1
nextLevelValue.push(ufoCount[0] + ufoCount[2] + ufoCount[3]); // ... level 2
nextLevelValue.push(ufoCount[2] + ufoCount[3] + ufoCount[4]); // ... level 3
nextLevelValue.push(ufoCount[2] + ufoCount[3] + ufoCount[4] + ufoCount[5] + alienCount); // ... level 4


var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

// The main game loop
function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    update(dt);
    render();

    lastTime = now;
    requestAnimFrame(main);
};

function init() {
    document.getElementById('play').addEventListener('click', function() {
        isFirstPlay = false;
        document.getElementById('introduction').style.display = 'none';
        reset();
    });

    document.getElementById('play-again').addEventListener('click', function() {
        if (level === 4 && !isGameOver) {
            level = 1;
            isFirstPlay = true;
            isGameOver = true;
            document.getElementById('game-over').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
            document.getElementById('status').innerHTML = 'GAME OVER';
            document.getElementById('congratulations').innerHTML = '';
        }
        reset();
    });

    document.getElementById('next').addEventListener('click', function() {
        level++;
        reset();
    });

    reset();
    lastTime = Date.now();
    main();
}

resources.load([
    'img/sprites.png',
    'img/sky.jpg',
    'img/cosmos.jpg',
    'img/airplane2.png',
    'img/snowflake.png',
    'img/alien.png',
    'img/ufo1.png',
    'img/ufo2.png',
    'img/ufo3.png',
    'img/ufo4.png',
    'img/ufo5.png',
    'img/ufo6.png',
    'img/rocket.png',
    'img/life.png',
    'img/planet.jpg',
    'img/meteorite.png',
    'img/bullet.png'
]);
resources.onReady(init);

var player = {
    pos: [0, 0],
    sprite: new Sprite('img/airplane2.png', [0, 0], [129, 84], 80, [0, 1])
};


// Update game objects
function update(dt) {
    gameTime += dt;
    if (!(isGameOver)) {
        handleInput(dt);
        updateEntities(dt);
        if((level === 3 || level === 4) && Math.random() < dt / 20) {
             freelifes.push({
                    pos: [Math.random() * (canvas.width - 39),
                            0],
                    sprite: new Sprite('img/life.png', [0, 0], [32, 32])
                });
        }

        if (!isMissionComplete[0]) {
            if(Math.random() < dt) {
                ufo1.push({
                    pos: [canvas.width,
                          Math.random() * (canvas.height - 64)],
                    sprite: new Sprite('img/ufo1.png', [0, 0], [64, 64])
                });
            }
        }

        if (!isMissionComplete[1]) {
            if(Math.random() < dt / 3) {
                ufo2.push({
                    pos: [canvas.width,
                          Math.random() * (canvas.height - 64)],
                    sprite: new Sprite('img/ufo2.png', [0, 0], [64, 64])
                });
            }
        }

        if (!isMissionComplete[2]) {
            if(Math.random() < 0.02) {
                ufo3.push({
                    pos: [Math.random() * (canvas.width - 64),
                            0],
                    endPos: Math.random() * (canvas.height - 64),
                    sprite: new Sprite('img/ufo3.png', [0, 0], [64, 64], 19, [0, 1])
                });
                upDirection = false;
            }
        }

        if (!isMissionComplete[3]) {
            if(Math.random() < dt / 3) {
                ufo4.push({
                    pos: [canvas.width,
                          Math.random() * (canvas.height - 64)],
                    sprite: new Sprite('img/ufo4.png', [0, 0], [64, 64])
                });
            }
        }

        if (!isMissionComplete[4]) {
            if(Math.random() < dt / 3) {
                ufo5.push({
                    pos: [canvas.width,
                          Math.random() * (canvas.height - 64)],
                    sprite: new Sprite('img/ufo5.png', [0, 0], [64, 64], 19, [0, 1])
                });
            }
        }

        if (!isMissionComplete[5] || !isMissionComplete[6]) {
            if(Math.random() < dt / 5) {
                ufo6.push({
                    pos: [canvas.width,
                          Math.random() * (canvas.height - 64)],
                    sprite: new Sprite('img/ufo6.png', [0, 0], [64, 64])
                });
            }
        }

        if (level === 2) {
            if(Math.random() < dt) {
                 snowflakes.push({
                        pos: [Math.random() * (canvas.width - 39),
                              0],
                        sprite: new Sprite('img/snowflake.png', [0, 0], [16, 16], 1, [0], 'vertical')
                    });
            }
        }

        if (level === 3) {
            if(Math.random() < dt / 8) {
                meteorites.push({
                    pos: [Math.random() * (canvas.width - 64),
                            0],
                    isCollides: false,
                    sprite: new Sprite('img/meteorite.png', [0, 0], [128, 128])
                });
            }
        }

        checkCollisions();
    }

    ufo1CountEl.innerHTML = ufoCount[0];
    ufo2CountEl.innerHTML = ufoCount[1];
    ufo3CountEl.innerHTML = ufoCount[2];
    ufo4CountEl.innerHTML = ufoCount[3];
    ufo5CountEl.innerHTML = ufoCount[4];
    ufo6CountEl.innerHTML = ufoCount[5];
    alienCountEl.innerHTML = alienCount;
    progressEl.setAttribute('value', progressValue.toFixed());
    progressValueEl.innerHTML = progressValue.toFixed();
    levelEl.innerHTML = 'Level ' + level;
    scoreEl.innerHTML = score;
    if (lifesCount < 0) {
        lifesCount = 0;
    }
    lifesCountEl.innerHTML = lifesCount;
    if (progressValue >= 99) {
        startNextLevel();
    }

    if (level === 1) {
        instructionEl.innerHTML = 'The UFOs try to grab your planet.' + 
                                   'Please, don\'t be scared and try to shoot your enemy.';
    } else if (level === 2) {
        instructionEl.innerHTML = 'Be carefull, because aliens are getting angry.' +
                                  'Now they can take your life by their guns.';
    } else if (level === 3) {
        instructionEl.innerHTML = 'Great, you are the best defender of all ever lived.' +
                                  'So now you will check yourself in space. ' +
                                  'Be better, stronge and faster, because it\'s getting more dangerous.';
    } else {
        instructionEl.innerHTML = 'So now is your hardest mission: you need to ' + 
                                  'catch some aliens for experiments. Do it or die hard!';
    }
};

function handleInput(dt) {
    if(input.isDown('DOWN') || input.isDown('s')) {
        player.pos[1] += playerSpeed * dt;
    }

    if(input.isDown('UP') || input.isDown('w')) {
        player.pos[1] -= playerSpeed * dt;
    }

    if(input.isDown('LEFT') || input.isDown('a')) {
        player.pos[0] -= playerSpeed * dt;
    }

    if(input.isDown('RIGHT') || input.isDown('d')) {
        player.pos[0] += playerSpeed * dt;
    }

    if(input.isDown('SPACE') &&
       !isGameOver &&
       Date.now() - lastFire > 200) {
        var x = player.pos[0] + player.sprite.size[0] / 1.2;
        var y = player.pos[1] + player.sprite.size[1] / 2;

        bullets.push({ pos: [x, y],
                       sprite: new Sprite('img/bullet.png', [0, 0], [18, 8]) 
        });
        
        lastFire = Date.now();
    }
}

function updateUfo(ufo, n, dt, direction) {
    if (ufo.length) {
        for(var i = 0; i < ufo.length; i++) {
            if (n === 4) {
                if (changeDirection) {
                    random--;
                    ufo[i].pos[1] -= ufoSpeed[n] * dt;
                    ufo[i].pos[0] -= ufoSpeed[n] * dt;
                    if (random < 0) {
                        changeDirection = false;
                        random = Math.random() * 100;
                    }
                } else {
                    random--;
                    ufo[i].pos[1] += ufoSpeed[n] * dt;
                    ufo[i].pos[0] -= ufoSpeed[n] * dt;
                    if (random < 0) {
                        changeDirection = true;
                        random = Math.random() * 100;
                    }
                }
            } else if (direction === 'vertical') {
                if (ufo[i].pos[1] > Math.random() * (canvas.height - 64)) {
                    upDirection = true;
                }
                if (upDirection) {
                    ufo[i].pos[1] -= ufoSpeed[n] * dt;
                } else {
                    ufo[i].pos[1] += ufoSpeed[n] * dt;
                }
            } else {
                ufo[i].pos[0] -= ufoSpeed[n] * dt;
            }
            ufo[i].sprite.update(dt);

            // add bullets
            if (((level === 2 && (n === 0 || n === 3)) || 
                ((level === 3 || level === 4) && (n === 4 || n === 3))) &&
                Math.random() < 0.1)  {
                var x = ufo[i].pos[0] - ufo[i].sprite.size[0] / 3;
                var y = ufo[i].pos[1] + ufo[i].sprite.size[1] / 2;
                if (!isGameOver && (Math.random() < 0.03 || (n === 3 && changeDirection && Math.random() < 0.05))) {
                    enemyBullets.push({
                        pos: [x, y],
                       sprite: new Sprite('img/sprites.png', [0, 39], [18, 8]) 
                    });
                    lastEnemiesFire = Date.now();
                }
             }
            removeOffscreenEntity(ufo[i], i, ufo, direction);
        }
    }
}

function removeOffscreenEntity (entity, i, entities, direction) {
    if (direction === 'vertical') {
        if(entity.pos[0] < 0 || entity.pos[0] > canvas.width ||
           entity.pos[1] > canvas.height) {
            entities.splice(i, 1);
            i--;
        }
    } else if(entity.pos[1] < 0 || entity.pos[1] > canvas.height ||
       entity.pos[0] > canvas.width) {
        entities.splice(i, 1);
        i--;
    }
}

function updateEntities(dt) {
    // Update the player sprite animation
    player.sprite.update(dt);

    // Update all the bullets
    for(var i=0; i<bullets.length; i++) {
        var bullet = bullets[i];
        bullet.pos[0] += bulletSpeed * dt;

        removeOffscreenEntity(bullet, i, bullets);
    }

    for(var i=0; i<enemyBullets.length; i++) {
        var bullet = enemyBullets[i];
        bullet.pos[0] -= bulletSpeed * dt;

        removeOffscreenEntity(bullet, i, enemyBullets);
    }

    // Update all the ufo1
    updateUfo(ufo1, 0, dt);

    // Update all the ufo2
    updateUfo(ufo2, 1, dt);
    
    // Update all the ufo3
    updateUfo(ufo3, 2, dt, 'vertical');

    // Update all the ufo4
    updateUfo(ufo4, 3, dt);

    // Update all the ufo5
    updateUfo(ufo5, 4, dt);

    // Update all the ufo6
    updateUfo(ufo6, 5, dt);

    // Update all the aliens
    for(var i = 0; i < aliens.length; i++) {
        aliens[i].pos[1] += alienSpeed * dt;
        aliens[i].sprite.update(dt);

        removeOffscreenEntity(aliens[i], i, aliens, 'vertical')
    }

    // Update all the freelifes
    for(var i = 0; i < freelifes.length; i++) {
        freelifes[i].pos[1] += freelifesSpeed * dt;
        freelifes[i].sprite.update(dt);

        removeOffscreenEntity(freelifes[i], i, freelifes, 'vertical')
    }

    // Update all the freelifes
    for(var i = 0; i < meteorites.length; i++) {
        meteorites[i].pos[0] -= meteoriteSpeed * dt;
        meteorites[i].pos[1] += meteoriteSpeed * dt;
        meteorites[i].sprite.update(dt);

        removeOffscreenEntity(meteorites[i], i, meteorites, 'vertical')
    }
    
    // Update all the explosions
    for(var i = 0; i < explosions.length; i++) {
        explosions[i].sprite.update(dt);

        // Remove if animation is done
        if(explosions[i].sprite.done) {
            explosions.splice(i, 1);
            i--;
        }
    }

     // Update all the snowflakes
    for(var i=0; i<snowflakes.length; i++) {
        snowflakes[i].pos[1] += snowflakesSpeed * dt;
        snowflakes[i].sprite.update(dt);

        removeOffscreenEntity (snowflakes[i], i, snowflakes, 'vertical')
    }
}

// Collisions
function collides(x, y, r, b, x2, y2, r2, b2) {
    return !(r <= x2 || x > r2 ||
             b <= y2 || y > b2);
}

function boxCollides(pos, size, pos2, size2) {
    return collides(pos[0], pos[1],
                    pos[0] + size[0], pos[1] + size[1],
                    pos2[0], pos2[1],
                    pos2[0] + size2[0], pos2[1] + size2[1]);
}

function addExplosions(pos) {
    explosions.push({
        pos: pos,
        sprite: new Sprite('img/sprites.png',
                           [0, 117],
                           [39, 39],
                           16,
                           [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                           null,
                           true)
    });  
}

function checkCollisionsWithBullets(entity, id) {
    if (entity.length) {
        for(var i = 0; i < entity.length; i++) {
            var pos = entity[i].pos;
            var size = entity[i].sprite.size;

            for(var j = 0; j < bullets.length; j++) {
                var pos2 = bullets[j].pos;
                var size2 = bullets[j].sprite.size;

                if(boxCollides(pos, size, pos2, size2)) {
                    // Remove the enemy
                    if (id !== 'meteorites' && id !== 'lifes') {
                        entity.splice(i, 1);
                        if (entity.length) {
                            i--;
                        }
                    }
                    if (id !== 'bullets' && id !== 'lifes' && id !== 'meteorites' && id !== 'aliens') {
                        score += 10;
                        if (ufoCount[id] === 0) {
                            isMissionComplete[id] = true;
                        } else {
                            progressValue += 100 / nextLevelValue[level-1];
                            ufoCount[id]--;
                        }
        
                        // Add an explosion
                        if (id === 5) {
                                aliens.push({
                                    pos: [pos[0],
                                          pos[1]],
                                    sprite: new Sprite('img/alien.png', [0, 0], [64, 64])
                                });
                        }
                        if (id !== 'aliens' && id !== 'lifes') {
                            addExplosions(pos);
                        } 
                        
                    }

                    // Remove the bullet and stop this iteration
                    bullets.splice(j, 1);
                    break;
                }
            }

            if(entity.length && boxCollides(pos, size, player.pos, player.sprite.size) && 
                ((id !== 'meteorites') || 
                (id === 'meteorites' && !entity[i].isCollides))) {
                if (id !== 'meteorites') {
                    entity.splice(i, 1);
                    if (entity.length) {
                        i--;
                    }
                } else {
                    entity[i].isCollides = true;
                }

                if (id !== 'aliens' && id !== 'lifes') {
                    lifesCount--;
                }
                if (id !== 'bullets' && id !== 'aliens' && id !== 'lifes' && id !== 'meteorites') {
                    addExplosions(pos); 
                }
                if (id === 'aliens') {
                    if (alienCount === 0) {
                        isMissionComplete[isMissionComplete.length - 1] = true;
                    } else {
                        progressValue += 100 / nextLevelValue[level-1];
                        alienCount--;
                    }
                } else if (id === 'lifes') {
                    lifesCount++;
                }
                if (!lifesCount) {
                    gameOver();
                }
            }
        }
    }
}

function checkCollisions() {

    checkPlayerBounds();

    checkCollisionsWithBullets(ufo1, 0);

    checkCollisionsWithBullets(ufo2, 1);

    checkCollisionsWithBullets(ufo3, 2);
    
    checkCollisionsWithBullets(ufo4, 3);

    checkCollisionsWithBullets(ufo5, 4);

    checkCollisionsWithBullets(ufo6, 5);

    checkCollisionsWithBullets(enemyBullets, 'bullets');

    checkCollisionsWithBullets(aliens, 'aliens');

    checkCollisionsWithBullets(freelifes, 'lifes')

    checkCollisionsWithBullets(meteorites, 'meteorites');
}

function checkPlayerBounds() {
    // Check bounds
    if(player.pos[0] < 0) {
        player.pos[0] = 0;
    } else if (player.pos[0] > canvas.width - player.sprite.size[0]) {
        player.pos[0] = canvas.width - player.sprite.size[0];
    }

    if(player.pos[1] < 0) {
        player.pos[1] = 0;
    } else if(player.pos[1] > canvas.height - player.sprite.size[1]) {
        player.pos[1] = canvas.height - player.sprite.size[1];
    }
}

// Draw everything
function render() {
    if (level === 1) {
        ctx.fillStyle = ctx.createPattern(resources.get('img/sky.jpg'), 'repeat');
        if (isFirstPlay) {
            document.getElementById('introduction').style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
        }
    } else if (level === 2) {
        ctx.fillStyle = '#3232ff';
    } else if (level === 3) {
        ctx.fillStyle = ctx.createPattern(resources.get('img/planet.jpg'), 'repeat');
    } else if (level === 4) {
        ctx.fillStyle = ctx.createPattern(resources.get('img/cosmos.jpg'), 'repeat');
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if(!isGameOver && !next && !isFinished && !isFirstPlay) {
        renderEntity(player);
        renderEntities(bullets);
        renderEntities(explosions);
        renderEntities(snowflakes);
        renderEntities(enemyBullets);
        renderEntities(aliens);
        renderEntities(freelifes);
        renderEntities(meteorites);
        renderEntities(ufo1, 'ufo1');
        renderEntities(ufo2);
        renderEntities(ufo3);
        renderEntities(ufo4);
        renderEntities(ufo5);
        renderEntities(ufo6);
    }
};

function renderEntities(list, id) {
    for(var i=0; i<list.length; i++) {
        renderEntity(list[i], id);
    }    
}

function renderEntity(entity, id) {
    ctx.save();
    ctx.translate(entity.pos[0], entity.pos[1]);
    if (id === 'ufo1') {
        ctx.rotate(-0.5); 
    }
    entity.sprite.render(ctx);
    ctx.restore();
}

function startNextLevel() {
    if (level === 4) {
        document.getElementById('status').innerHTML = 'It\'s OK, you won';
        document.getElementById('congratulations').innerHTML = 'So, you are really awsome guy or this game so easy :|' +
                                                                '<br>If it was cool, proov this by click the button "Play Again")';
        document.getElementById('game-over').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
        isFinished = true;
    } else {
        if (level === 1) {
            document.getElementById('next-level-h1').innerHTML = 'Not bad, but it was easy,<br> so play the next level';
        } else if (level === 2) {
            document.getElementById('next-level-h1').innerHTML = 'Look\'s like you are the master';
        } else if (level === 3) {
            document.getElementById('next-level-h1').innerHTML = 'Hmmm, is this your first try?';
        }
        document.getElementById('next-level').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
        next = true;
    }
}

function gameOver() {
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    isGameOver = true;
}

function reset() {
    if (isGameOver) {
        document.getElementById('game-over').style.display = 'none';
        isGameOver = false;
        score = 0;
        gameTime = 0;
    } 
    if (next) {
        document.getElementById('next-level').style.display = 'none';
        next = false;
    }
    if (level === 1) {
        player = {
            pos: [0, 0],
            sprite: new Sprite('img/airplane2.png', [0, 0], [129, 84], 80, [0, 1])
        };
        isFinished = false;
        if (!isFirstPlay) {
            isMissionComplete = [false, false, true, true, true, true, true];
        }
        document.getElementById('ufo1').style.display = 'block';
        document.getElementById('ufo2').style.display = 'block';
        document.getElementById('ufo3').style.display = 'none';
        document.getElementById('ufo4').style.display = 'none';
        document.getElementById('ufo5').style.display = 'none';
        document.getElementById('ufo6').style.display = 'none';
        document.getElementById('alien').style.display = 'none';
    } else if (level === 2) {
        document.getElementById('ufo1').style.display = 'block';
        document.getElementById('ufo2').style.display = 'none';
        document.getElementById('ufo3').style.display = 'block';
        document.getElementById('ufo4').style.display = 'block';
        isMissionComplete = [false, true, false, false, true, true, true];
    } else if (level === 3) {
        player = {
            pos: [0, 0],
            sprite: new Sprite('img/rocket.png', [0, 0], [128, 68])
        };
        document.getElementById('ufo1').style.display = 'none';
        document.getElementById('ufo3').style.display = 'block';
        document.getElementById('ufo4').style.display = 'block';
        document.getElementById('ufo5').style.display = 'block';
        isMissionComplete = [true, true, false, false, false, true, true];
    } else if (level === 4) {
        player = {
            pos: [0, 0],
            sprite: new Sprite('img/rocket.png', [0, 0], [128, 68])
        };
        document.getElementById('ufo1').style.display = 'none';
        document.getElementById('ufo3').style.display = 'block';
        document.getElementById('ufo4').style.display = 'block';
        document.getElementById('ufo5').style.display = 'block';
        document.getElementById('ufo6').style.display = 'block';
        document.getElementById('alien').style.display = 'block';
        isMissionComplete = [true, true, false, false, false, false, false];
    } 
    document.getElementById('overlay').style.display = 'none';

    lifesCount = 5;
    ufo1 = [];
    ufo2 = [];
    ufo3 = [];
    ufo4 = [];
    ufo5 = [];
    ufo6 = [];
    ufoCount = [10, 9, 6, 9, 6, 8];
    alienCount = 8;
    bullets = [];
    aliens = [];
    freelifes = [];
    meteorites = [];
    snowflakes = [];
    enemyBullets = [];
    explosions = [];
    progressValue = 0;

    player.pos = [50, canvas.height / 2];
};