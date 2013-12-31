(function() {

	/**
	 * Config
	**/

	var nbFlakes = 30;
	var snowFlakes = [];
	var flakesLoaded = 0;
	var domElements = [];
	var HEIGHT = 225;

	// Audio element
	// > Awesome sound in courtesy of "MrBulbamike" : https://www.youtube.com/watch?v=WlhXiXs_A_Y
	// ---

	if (!document.getElementById('happynewyear2014audio'))
	{
		var audio = document.createElement('audio');
		audio.id = "happynewyear2014audio";
		audio.autoplay = true;

		var sourceMP3 = document.createElement('source');
		var sourceOGG = document.createElement('source');
		var sourceWAV = document.createElement('source');

		sourceMP3.src = 'https://raw.github.com/jmpp/snowflakes/master/audio/Auld-Lang-Syne-8-Bit-cutted.mp3';
		sourceOGG.src = 'https://raw.github.com/jmpp/snowflakes/master/audio/Auld-Lang-Syne-8-Bit-cutted.ogg';
		sourceWAV.src = 'https://raw.github.com/jmpp/snowflakes/master/audio/Auld-Lang-Syne-8-Bit-cutted.wav';

		audio.appendChild( sourceMP3 );
		audio.appendChild( sourceOGG );
		audio.appendChild( sourceWAV );

		document.body.appendChild(audio);
	}	

	// Creating DOM flakes elements before initializing...
	// ---

	for (var i = 0; i < nbFlakes; i++) {
		var flake = new Image();
		flake.src = 'https://raw.github.com/jmpp/snowflakes/master/flocon.png';
		flake.style.position = 'fixed';
		flake.style.zIndex = '9999';
		flake.onload = (function() {
			domElements.push(this)
			if (++flakesLoaded === nbFlakes)
				init();
		}).bind(flake);
	};

	/**
	 * Functions
	**/

	function init() {
		
		var s, fc, sc;
		for (var i = 0; i < domElements.length; i++) {
			s = rand(2, 10);
			fc = 'hsla(0,0%,45%,'+s/10+')';
			sc = 'hsla(0,0%,55%,'+s/10+')';
			snowFlakes.push({
				img : domElements[i],
				x : rand(0, window.innerWidth),
				y : rand(0, HEIGHT),
				w : flake.width,
				h : flake.height,
				scale : rand(.2, .6),
				alpha : 1,
				direction : Math.PI/3,
				rotation : 0,
				rotationSpeed : rand(-1 * s * .2 * .008 , s * .2 * .008),
				speed : s * .2
			});

			document.body.appendChild(domElements[i]);
		}

		requestAnimFrame( run );
	}

	function update() {
		for (var i = 0, c = snowFlakes.length; i < c; i++) {
			var s = snowFlakes[i];

			s.alpha = (HEIGHT - s.y) / HEIGHT;
			s.rotation += s.rotationSpeed;
			s.y += Math.sin(s.direction) * s.speed;

			if (s.x + (s.w * s.scale) > window.innerWidth)		s.x = - s.w * s.scale;
			if (s.y + (s.h * s.scale) > HEIGHT)		s.y = - s.h * s.scale;
			if (s.x + (s.w * s.scale) < 0)					s.x = window.innerWidth;
			if (s.y + (s.h * s.scale) < 0)					s.y = HEIGHT;
		}
	}

	function render() {
		var scaleFactor;
		for (var i = 0, c = snowFlakes.length; i < c; i++) {
			var s = snowFlakes[i];

			s.img.style.opacity = s.alpha;
			s.img.style.webkitTransform = 'scale('+s.scale+','+s.scale+') rotate('+(s.rotation*180/Math.PI)+'deg)';
			s.img.style.mozTransform = 'scale('+s.scale+','+s.scale+') rotate('+(s.rotation*180/Math.PI)+'deg)';
			s.img.style.msTransform = 'scale('+s.scale+','+s.scale+') rotate('+(s.rotation*180/Math.PI)+'deg)';
			s.img.style.transform = 'scale('+s.scale+','+s.scale+') rotate('+(s.rotation*180/Math.PI)+'deg)';
			s.img.style.left = s.x + 'px';
			s.img.style.top = s.y + 'px';
		}
	}

	function run( t ) {
		update();
		render();

		requestAnimFrame( run );
	}

	function rand(a,b) {
		return (Math.random() * (b-a)) + a;
	}

	// shim layer with setTimeout fallback
	window.requestAnimFrame = (function(){
	  return  window.requestAnimationFrame       ||
	          window.webkitRequestAnimationFrame ||
	          window.mozRequestAnimationFrame    ||
	          function( callback ){
	            window.setTimeout(callback, 1000 / 60);
	          };
	})();

})();