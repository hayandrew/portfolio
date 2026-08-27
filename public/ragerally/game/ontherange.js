var OTR = OTR || {};

OTR = {
  canvasName: "game-canvas",
  jCanvas: {},
  canvasSize: {
    width: 0,
    height: 0
  },
  enemyTimer: 0,
  enemyCounter: 0,
  bulletDelay: 0,
  bulletCounter: 0,
  enemyBulletCounter: 0,
  Container: PIXI.Container,
  TextureCache: PIXI.utils.TextureCache,
  autoDetectRenderer: PIXI.autoDetectRenderer,
  loader: PIXI.loader,
  resources: PIXI.loader.resources,
  Sprite: PIXI.Sprite,
Texture: PIXI.Texture,
	BaseTexture: PIXI.BaseTexture,
	Rectangle: PIXI.Rectangle,
  props: {
    bg: {
    },
    actors: {
    },
    projectiles: {
    },
    vfx: {
    },
	sprites: {
	},
	  imgUrls: {
		  clinton: {
			  body: 'resources/sprites/clinton-walk.png',
			  normal: 'resources/heads/clinton.png',
			  hit: 'resources/heads/clinton-hit.png'
		  },
		  sanders: {
			  body: 'resources/sprites/sanders-walk.png',
			  normal: 'resources/heads/sanders.png',
			  hit: 'resources/heads/sanders-hit.png'
		  },
		  kasich: {
			  body: 'resources/sprites/kasich-walk.png',
			  normal: 'resources/heads/kasich.png',
			  hit: 'resources/heads/kasich-hit.png'
		  },
		  trump: {
			  body: 'resources/sprites/trump-walk.png',
			  normal: 'resources/heads/trump.png',
			  hit: 'resources/heads/trump-hit.png'
		  },
		  cruz: {
			  body: 'resources/sprites/cruz-walk.png',
			  normal: 'resources/heads/cruz.png',
			  hit: 'resources/heads/cruz-hit.png'
		  },
		  noah: {
			  body: 'resources/sprites/noah-walk.png',
			  normal: 'resources/heads/noah.png',
			  hit: 'resources/heads/noah-hit.png'
		  }
	  },
	  sounds: {
		  throw: new Audio("resources/audio/swipe.ogg"),
			gameover: new Audio("resources/audio/video-game-ending.ogg"),
		  bernie: [
			  {
				  id:0,
				  sound: new Audio("resources/audio/bernie-sanders-shot-hit-it-doesnt-matter.ogg")
			  },
			  {
				  id:1,
				  sound: new Audio("resources/audio/bernie-sanders-shot-hit-we-are-going-to-get-our-way-no-matter-what.ogg")
			  },
			  {
				  id:2,
				  sound: new Audio("resources/audio/bernie-sanders-shot-miss-enough-with-the-hellos-lets-do-this.ogg")
			  }
		  ],
		  donald: [
			  {
				  id:0,
				  sound: new Audio("resources/audio/donald-trump-shot-hit-son-of-a-bitch.ogg")
			  },
			  {
				  id:1,
				  sound: new Audio("resources/audio/donald-trump-shot-miss-he-s-terrible.ogg")
			  },
			  {
				  id:2,
				  sound: new Audio("resources/audio/donald-trump-shot-miss-i-yiii-yiii.ogg")
			  },
			  {
				  id:3,
				  sound: new Audio("resources/audio/donald-trump-the-hell-outta-here-will-you-please.ogg")
			  },
			  {
				  id:4,
				  sound: new Audio("resources/audio/donald-trump-what-kind-of-people-do-i-have-here.ogg")
			  }
		  ],
		  hillary: [
			  {
				  id:0,
				  sound: new Audio("resources/audio/hillary-clinton-shot-hit-you-re-not-patriotic.ogg")
			  },
			  {
				  id:1,
				  sound: new Audio("resources/audio/hillary-clinton-shot-miss-laughing.ogg")
			  }
		  ],
		  john: [
			  {
				  id:0,
				  sound: new Audio("resources/audio/john-kasich-shot-hit-i-will-be-a-winner-regardless-of-what-happens.ogg")
			  },
			  {
				  id:1,
				  sound: new Audio("resources/audio/john-kasich-shot-miss-come-on-folks.ogg")
			  }
		  ],
		  ted: [
			  {
				  id:0,
				  sound: new Audio("resources/audio/ted-cruz-shot-hit-the-world-is-on-fire-YES.ogg")
			  },
			  {
				  id:1,
				  sound: new Audio("resources/audio/ted-cruz-shot-miss-it-is-now-or-never.ogg")
			  },
			  {
				  id:2,
				  sound: new Audio("resources/audio/ted-cruz-shot-miss-it-s-great-to-be-with-you.ogg")
			  }
		  ],
		  trevor: [
			  {
				  id:0,
				  sound: new Audio("resources/audio/trevor-noah-wow-wow.ogg")
			  }
		  ]
	  }
  },
  scene: {
    player: {
      "life": 3,
      score: 0,
      "originalTint": "",
      "character": ""
    },
		messaging: {
			life: null
		},
    projectiles: [],
    enemyProjectiles: []
  }

};
OTR.commonMethods = {
  init: function(character){
    OTR.jCanvas = $('#' + OTR.canvasName);
    OTR.canvasSize.width = OTR.jCanvas.width();
    OTR.canvasSize.height = OTR.jCanvas.height();

		OTR.scene.player.character = character;

    OTR.stage = new OTR.Container();

    OTR.renderer = OTR.autoDetectRenderer(
      OTR.canvasSize.width,
      OTR.canvasSize.height,
      {
        view: document.getElementById(OTR.canvasName)
      }
    );

    OTR.assets.init();
    OTR.controls.setup();
  },
  utils: {
    incrementScore: function (obj) {
        var score = document.getElementById('score'),
            scoreCount = score.getElementsByTagName('span')[0];

        obj.scene.player.score += 1;
        scoreCount.innerHTML=obj.scene.player.score;
    },
    showGameOver: function() {
			var resp = confirm("Game over! Restart?");
			OTR.props.sounds.gameover.play();
			if (resp){
				location.reload();
			} else {
				window.location = "index.html";
			}
    },
    depthCompare: function(a, b) {
      if (a.z < b.z) return -1;
      if (a.z > b.z) return 1;
      return 0;
    },
		getUrlParameter: function(sParam) {
		    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		        sURLVariables = sPageURL.split('&'),
		        sParameterName,
		        i;

		    for (i = 0; i < sURLVariables.length; i++) {
		        sParameterName = sURLVariables[i].split('=');

		        if (sParameterName[0] === sParam) {
		            return sParameterName[1] === undefined ? true : sParameterName[1];
		        }
		    }
		},
      hitEnemy: function(r1, r2) {

          //Define the variables we'll need to calculate
          var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

          //hit will determine whether there's a collision
          hit = false;

          //Find the center points of each sprite
          r1.centerX = r1.x + r1.width / 2;
          r1.centerY = r1.y + r1.height / 2;
          r2.centerX = r2.x + r2.width / 2;
          r2.centerY = r2.y + r2.height / 2;

          //Find the half-widths and half-heights of each sprite
          r1.halfWidth = r1.width / 2;
          r1.halfHeight = r1.height / 2;
          r2.halfWidth = r2.width / 2;
          r2.halfHeight = r2.height / 2;

          //Calculate the distance vector between the sprites
          vx = r1.centerX - r2.centerX;
          vy = r1.centerY - r2.centerY;

          //Figure out the combined half-widths and half-heights
          combinedHalfWidths = r1.halfWidth + r2.halfWidth;
          combinedHalfHeights = r1.halfHeight + r2.halfHeight;

          //Check for a collision on the x axis
          if (Math.abs(vx) < combinedHalfWidths) {

              //A collision might be occuring. Check for a collision on the y axis
              if (Math.abs(vy) < combinedHalfHeights) {

                  //There's definitely a collision happening
                  hit = true;
                  OTR.commonMethods.utils.incrementScore(OTR);
              } else {

                  //There's no collision on the y axis
                  hit = false;
              }
          } else {

              //There's no collision on the x axis
              hit = false;
          }

          //`hit` will be either `true` or `false`
          return hit;
      },
    hitTestRectangle: function(r1, r2) {

      //Define the variables we'll need to calculate
      var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

      //hit will determine whether there's a collision
      hit = false;

      //Find the center points of each sprite
      r1.centerX = r1.x + r1.width / 2;
      r1.centerY = r1.y + r1.height / 2;
      r2.centerX = r2.x + r2.width / 2;
      r2.centerY = r2.y + r2.height / 2;

      //Find the half-widths and half-heights of each sprite
      r1.halfWidth = r1.width / 2;
      r1.halfHeight = r1.height / 2;
      r2.halfWidth = r2.width / 2;
      r2.halfHeight = r2.height / 2;

      //Calculate the distance vector between the sprites
      vx = r1.centerX - r2.centerX;
      vy = r1.centerY - r2.centerY;

      //Figure out the combined half-widths and half-heights
      combinedHalfWidths = r1.halfWidth + r2.halfWidth;
      combinedHalfHeights = r1.halfHeight + r2.halfHeight;

      //Check for a collision on the x axis
      if (Math.abs(vx) < combinedHalfWidths) {

        //A collision might be occuring. Check for a collision on the y axis
        if (Math.abs(vy) < combinedHalfHeights) {

          //There's definitely a collision happening
          hit = true;
        } else {

          //There's no collision on the y axis
          hit = false;
        }
      } else {

        //There's no collision on the x axis
        hit = false;
      }

      //`hit` will be either `true` or `false`
      return hit;
    }
  },
  createEnemy: function(){
    var enemy = {
        "id": ++OTR.enemyCounter,
        "faction": "",
        "constraint": 600,
        "zIndex": 0,
        "initialX": 0,
        "turnaround": false,
        "obj": null
      },
      avatar = null,
      plusOrMinus = Math.random() < 0.5 ? -1 : 1,
      randomValue = Math.floor((Math.random() * 10) + 1);
    if (randomValue >= 8.5) {
      enemy.person = "clinton";
      enemy.contraint += 20 * randomValue;
      enemy.avatar = OTR.assets.graphic.urls.actors.player;
      enemy.hitsound = OTR.props.sounds.hillary[0];
      enemy.sounds = OTR.props.sounds.hillary;
      enemy.weapon = OTR.assets.graphic.urls.projectiles.pump;
	    enemy.body = OTR.assets.graphic.urls.imgUrls.clinton.body;
	    enemy.head = OTR.assets.graphic.urls.imgUrls.clinton.normal;
	    enemy.hit = OTR.assets.graphic.urls.imgUrls.clinton.hit;
    } else if (randomValue >= 7) {
      enemy.person = "trump";
      enemy.contraint += 20 * randomValue;
      enemy.avatar = OTR.assets.graphic.urls.actors.player;
      enemy.hitsound = OTR.props.sounds.donald[0];
      enemy.sounds = OTR.props.sounds.donald;
      enemy.weapon = OTR.assets.graphic.urls.projectiles.goldbar;
	    enemy.body = OTR.assets.graphic.urls.imgUrls.trump.body;
	    enemy.head = OTR.assets.graphic.urls.imgUrls.trump.normal;
	    enemy.hit = OTR.assets.graphic.urls.imgUrls.trump.hit;
    } else if (randomValue >= 4.5) {
      enemy.person = "sanders";
      enemy.contraint += 20 * randomValue;
      enemy.avatar = OTR.assets.graphic.urls.actors.player;
      enemy.hitsound = OTR.props.sounds.bernie[0];
      enemy.sounds = OTR.props.sounds.bernie;
      enemy.weapon = OTR.assets.graphic.urls.projectiles.money;
	    enemy.body = OTR.assets.graphic.urls.imgUrls.sanders.body;
	    enemy.head = OTR.assets.graphic.urls.imgUrls.sanders.normal;
	    enemy.hit = OTR.assets.graphic.urls.imgUrls.sanders.hit;
    }else if (randomValue >= 3) {
      enemy.person = "kasich";
      enemy.contraint += 20 * randomValue;
      enemy.avatar = OTR.assets.graphic.urls.actors.player;
      enemy.hitsound = OTR.props.sounds.john[0];
      enemy.sounds = OTR.props.sounds.john;
      enemy.weapon = OTR.assets.graphic.urls.projectiles.sausage;
	    enemy.body = OTR.assets.graphic.urls.imgUrls.kasich.body;
	    enemy.head = OTR.assets.graphic.urls.imgUrls.kasich.normal;
	    enemy.hit = OTR.assets.graphic.urls.imgUrls.kasich.hit;
    }else if (randomValue >= 1.5) {
      enemy.person = "cruz";
      enemy.contraint += 20 * randomValue;
      enemy.avatar = OTR.assets.graphic.urls.actors.player;
      enemy.hitsound = OTR.props.sounds.ted[0];
      enemy.sounds = OTR.props.sounds.ted;
      enemy.weapon = OTR.assets.graphic.urls.projectiles.xxxTape;
	    enemy.body = OTR.assets.graphic.urls.imgUrls.cruz.body;
	    enemy.head = OTR.assets.graphic.urls.imgUrls.cruz.normal;
	    enemy.hit = OTR.assets.graphic.urls.imgUrls.cruz.hit;
    }else {
      enemy.person = "noah";
      enemy.contraint += 20 * randomValue;
      enemy.avatar = OTR.assets.graphic.urls.actors.player;
      enemy.hitsound = OTR.props.sounds.trevor[0];
      enemy.sounds = OTR.props.sounds.trevor;
      enemy.weapon = null;
	    enemy.body = OTR.assets.graphic.urls.imgUrls.noah.body;
	    enemy.head = OTR.assets.graphic.urls.imgUrls.noah.normal;
	    enemy.hit = OTR.assets.graphic.urls.imgUrls.noah.hit;
    }
    enemy.contraint += plusOrMinus * 100;
    enemy.fireDelay = 0;
    enemy.fireRate = 200 + (plusOrMinus * 10);

	  var enemyBody = new OTR.Sprite(
		  OTR.resources[enemy.body].texture
	  );
	  var enemyHead = new OTR.Sprite(
		  OTR.resources[enemy.head].texture
	  );
	  enemyHead.position.set(15, -210);
	  var enemyFull = new OTR.Container();

	  enemyBody.width = 2640;
	  enemyBody.height = 500;

	  var headPositions = [];

	  var headPositionsLeft = [
		  { x: 15, y: -210 },
		  { x: 20, y: -190 },
		  { x: 20, y: -195 },
		  { x: 15, y: -220 },
		  { x: 15, y: -210 },
		  { x: 25, y: -195 },
		  { x: 20, y: -197 },
		  { x: 20, y: -225 }
	  ];
	  var headPositionsRight = [
		  { x: 5, y: -210 },
		  { x: 10, y: -190 },
		  { x: 10, y: -195 },
		  { x: 5, y: -220 },
		  { x: 5, y: -210 },
		  { x: 15, y: -195 },
		  { x: 10, y: -197 },
		  { x: 10, y: -225 }
	  ];

	  for(var i = 0; i < 8; i++){
		  var frame = new OTR.Texture(OTR.BaseTexture.fromImage(enemy.body));
		  frame.setFrame(new OTR.Rectangle( (i *330), 0, 330, 500));
		  if(i === 0){
			  enemyBody = new OTR.Sprite(frame);
			  enemyBody.animation = {};
			  enemyBody.animation.frameNumber = 8;
			  enemyBody.animation.frames = [];
			  enemyBody.animation.frameCounter = 0;
		  };
		  enemyBody.animation.frames.push(frame);
	  };
	  enemyBody.animation.looper = setInterval(function(){
		  var frameCounter = enemyBody.animation.frameCounter;
		  enemyBody.setTexture(enemyBody.animation.frames[enemyBody.animation.frameCounter]);
		  enemyBody.animation.frameCounter++;
		  if(enemyBody.animation.frameCounter === enemyBody.animation.frames.length){
			  enemyBody.animation.frameCounter = 0;
		  };
		  if(enemy.turnaround) {
			  enemyBody.scale.x = -1;
			  enemyHead.scale.x = -1;
			  headPositions = headPositionsRight;
				console.log(enemy.turnaround);
		  } else {
			  enemyBody.scale.x = 1;
			  enemyHead.scale.x = 1;
			  headPositions = headPositionsLeft;
		  }
			enemyHead.position.set(headPositions[frameCounter].x, headPositions[frameCounter].y);

	  }, 100);

	  enemyFull.addChild(enemyBody);
	  enemyFull.addChild(enemyHead);
	  enemyFull.scale.x = 0.5;
	  enemyFull.scale.y = 0.5;

    var posY = Math.floor(Math.random() * 100) + 100;
    //enemyFull.width = 330 * 0.5;
    //enemyFull.height = 500 * 0.5;
	  enemyFull.x = Math.round(Math.random()) * (OTR.canvasSize.width - enemyFull.width);
	  enemyFull.initialX = enemyFull.x;
	  enemyFull.y = posY;
	  enemyFull.z = posY;
	  enemyFull.vx = 0;
	  enemyFull.vy = 0;
    enemyFull.scale.x = enemyFull.scale.x * (posY * 0.008);
	  enemyFull.scale.y = enemyFull.scale.y * (posY * 0.008);

    enemy.obj = enemyFull;

    OTR.characters.enemies.push(enemy);
    OTR.stage.addChild(enemy.obj);
    OTR.stage.children.sort(OTR.commonMethods.utils.depthCompare);

	  //OTR.stage.addChild(enemyFull);
	  //this.addSplash(100,200)

  },

	addSplash: function(xpos,ypos) {
		var splash = new OTR.Sprite(
			OTR.resources[OTR.assets.graphic.urls.vfx.splash].texture
		);

		//var splash = OTR.props.vfx.splash;
		splash.width = 200;
		splash.height = 200;

		for(var i = 0; i < 5; i++){
			var frame = new OTR.Texture(OTR.BaseTexture.fromImage(OTR.assets.graphic.urls.vfx.splash));
			frame.setFrame(new OTR.Rectangle( (i*200), 0, 200, 200));
			if(i === 0){
				splash = new OTR.Sprite(frame);
				splash.animation = {};
				splash.animation.frameNumber = 5;
				splash.animation.frames = [];
				splash.animation.frameCounter = 0;
			};
			splash.animation.frames.push(frame);
		};
		splash.animation.looper = setInterval(function(){
			var frameCounter = splash.animation.frameCounter;
			splash.setTexture(splash.animation.frames[splash.animation.frameCounter]);
			splash.animation.frameCounter++;
			if(splash.animation.frameCounter === splash.animation.frames.length){
				splash.animation.frameCounter = 0;
				OTR.stage.removeChild(splash);
				clearInterval(splash.animation.looper);
			};
		}, 100);
		splash.x = xpos - splash.width/2;
		splash.y = ypos - splash.height/2;
    splash.z = 1001;
		OTR.stage.addChild(splash);
	},

  initEnemies: function(){
    if (OTR.enemyTimer % 180 === 0 && OTR.characters.enemies.length < 6){
      OTR.commonMethods.createEnemy();
    }
  },

  update: function(){
		//OTR.scene.messaging.life.text = "LIFE: " + OTR.scene.player.life;
		var life = document.getElementById('life'),
				lifeCount = life.getElementsByTagName('span')[0];

		lifeCount.innerHTML = OTR.scene.player.life;

    if (OTR.scene.player.life <= 0){
      OTR.commonMethods.utils.showGameOver();
      return false;
    }

    OTR.enemyTimer++;
    OTR.bulletDelay++;
    OTR.commonMethods.initEnemies();

    OTR.props.actors.player.x += OTR.props.actors.player.vx;

    OTR.scene.projectiles.forEach(function(projectile){
      var bulletHit = false;

      projectile.timeToLive -= 1;
      projectile.velocity -= projectile.velocity * 0.015;
      projectile.obj.y -= projectile.velocity;

      projectile.obj.width -= projectile.obj.width/80;
      projectile.obj.height -= projectile.obj.height/80;

      if (projectile.timeToLive <= 50){
        projectile.active = true;
      }
      if (projectile.active){
        OTR.characters.enemies.forEach(function(enemy){
          if (OTR.commonMethods.utils.hitEnemy(projectile.obj, enemy.obj)){
            // HIT, remove bullet and enemy
            console.log("HIT")
            enemy.hitsound.sound.play();
            OTR.commonMethods.addSplash(projectile.obj.x, projectile.obj.y);
            OTR.characters.enemies = $.grep(OTR.characters.enemies, function(e){
              return e.id != enemy.id;
            });
            OTR.scene.projectiles = $.grep(OTR.scene.projectiles, function(e){
              return e.id != projectile.id;
            });
            OTR.stage.removeChild(enemy.obj);
            OTR.stage.removeChild(projectile.obj);
            bulletHit = true;

						if (enemy.person === OTR.scene.player.character){
							OTR.props.actors.player.tint = 0xff3300;
			        OTR.scene.player.life--;
						}
          }
        });
      }

      if (projectile.timeToLive <= 0 && !bulletHit){
        OTR.scene.projectiles = $.grep(OTR.scene.projectiles, function(e){
          return e.id != projectile.id;
        });
        OTR.stage.removeChild(projectile.obj);
      }
    });

		OTR.props.actors.player.tint = OTR.scene.player.originalTint;

    OTR.scene.enemyProjectiles.forEach(function(projectile){

      projectile.timeToLive -= 1;
      projectile.velocity += projectile.velocity * 0.001;
      projectile.obj.y += projectile.velocity;

      projectile.obj.width += projectile.obj.width/40;
      projectile.obj.height += projectile.obj.height/40;


      if (OTR.commonMethods.utils.hitTestRectangle(projectile.obj, OTR.props.actors.player)){
        // HIT, remove bullet and enemy
        console.log("PLAYER HIT");
        //enemy.hitsound.sound.play();
				OTR.props.actors.player.tint = 0xff3300;
        OTR.scene.player.life--;
        OTR.scene.enemyProjectiles = $.grep(OTR.scene.enemyProjectiles, function(e){
          return e.id != projectile.id;
        });
        OTR.stage.removeChild(projectile.obj);

      }
/*
      if (projectile.active){
        OTR.characters.enemies.forEach(function(enemy){
          if (OTR.commonMethods.utils.hitTestRectangle(projectile.obj, enemy.obj)){
            // HIT, remove bullet and enemy
            console.log("HIT")
            enemy.hitsound.sound.play();
            OTR.characters.enemies = $.grep(OTR.characters.enemies, function(e){
              return e.id != enemy.id;
            });
            OTR.scene.projectiles = $.grep(OTR.scene.projectiles, function(e){
              return e.id != projectile.id;
            });
            OTR.stage.removeChild(enemy.obj);
            OTR.stage.removeChild(projectile.obj);
            bulletHit = true;
          }
        });
      }
*/
      //if (projectile.timeToLive <= 0){
			if (projectile.obj.y+projectile.obj.height >= OTR.canvasSize.height){
        OTR.scene.enemyProjectiles = $.grep(OTR.scene.enemyProjectiles, function(e){
          return e.id != projectile.id;
        });
        OTR.stage.removeChild(projectile.obj);
      }
    });

    OTR.characters.enemies.forEach(function(enemy){

      if (enemy.weapon){
        enemy.fireDelay++;
        if (enemy.fireDelay >= enemy.fireRate){
          OTR.controls.enemyFireProjectile(enemy);
          enemy.fireDelay = 0;
        }
      }
      if (enemy.initialX > 0 && !enemy.turnaround){
        enemy.obj.x -= 5;
      } else if (!enemy.turnaround) {
        enemy.obj.x += 5;
      }
      if (enemy.initialX > 0 && enemy.turnaround){
        enemy.obj.x += 5;
      } else if (enemy.turnaround) {
        enemy.obj.x -= 5;
      }
      if (enemy.initialX > 0){
        if (enemy.obj.x <= enemy.initialX - enemy.constraint) {
          enemy.turnaround = true;
        } else if (enemy.obj.x >= enemy.initialX) {
          enemy.turnaround = false;
        }
      } else {
        if (enemy.obj.x >= enemy.initialX + enemy.constraint) {
          enemy.turnaround = true;
        } else if (enemy.obj.x <= enemy.initialX) {
          enemy.turnaround = false;
        }
      }
    });

    OTR.renderer.render(OTR.stage);

    requestAnimationFrame(OTR.commonMethods.update);
  }
};

OTR.characters = {
  player: {},
  enemies: []
};
