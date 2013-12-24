(function() {

	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');

	canvas.width = window.innerWidth;
	canvas.height = 225;//window.innerHeight;
	canvas.style.cssText = 'position:fixed;top:0;right:0;left:0;z-index:99999;';

	/**
	 * Objects
	**/

	var nbFlakes = 55;
	var snowFlakes = [];

	init();

	/**
	 * Functions
	**/

	function init() {
		document.body.appendChild( canvas );

		var flake = new Image();
		flake.src = 'https://raw.github.com/jmpp/snowflakes/master/flocon.png';
		flake.onload = function() {
				
			var s, fc, sc;
			for (var i = 0; i < nbFlakes; i++) {
				s = rand(2, 10);
				fc = 'hsla(0,0%,45%,'+s/10+')';
				sc = 'hsla(0,0%,55%,'+s/10+')';
				snowFlakes.push({
					img : flake,
					x : rand(0, canvas.width),
					y : rand(0, canvas.height),
					w : flake.width,
					h : flake.height,
					scale : rand(.2, .6),
					// fillColor : fc,
					// strokeColor : sc,
					alpha : 1,
					direction : Math.PI/3,
					rotation : 0,
					rotationSpeed : rand(-1 * s * .2 * .008 , s * .2 * .008),
					wave : 0,
					speed : s * .2
				});
			}

			requestAnimFrame( run );
		}
	}

	function update() {
		for (var i = 0, c = snowFlakes.length; i < c; i++) {
			var s = snowFlakes[i];

			// console.log(s.alpha);

			s.alpha = (canvas.height - s.y) / canvas.height;
			// s.wave += .004;
			s.rotation += s.rotationSpeed;
			// s.x += Math.cos(s.wave);
			s.y += Math.sin(s.direction) * s.speed;

			if (s.x + (s.w * s.scale) > canvas.width)		s.x = - s.w * s.scale;
			if (s.y + (s.h * s.scale) > canvas.height)		s.y = - s.h * s.scale;
			if (s.x + (s.w * s.scale) < 0)					s.x = canvas.width;
			if (s.y + (s.h * s.scale) < 0)					s.y = canvas.height;
		}
	}

	function render() {
		// ctx.fillStyle = 'rgba(0,0,0,.7)';
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.lineWidth = 2;
		ctx.shadowBlur = 7;
		var scaleFactor;
		for (var i = 0, c = snowFlakes.length; i < c; i++) {
			var s = snowFlakes[i];

			ctx.globalAlpha = s.alpha;
			// ctx.fillStyle = s.fillColor;
			// ctx.strokeStyle = s.strokeColor;
			// ctx.shadowColor = '#fff';
			// ctx.beginPath();
			// ctx.arc(s.x, s.y, s.size, 0, Math.PI*2, true);
			// ctx.fill();
			// ctx.stroke();
			// ctx.closePath();

			//scaleFactor = s.size;//s.size/10;
			ctx.save();
			ctx.translate(s.x + s.w*.5, s.y + s.h*.5);
			ctx.scale(s.scale, s.scale);
			ctx.rotate(s.rotation);
			ctx.drawImage(s.img, - s.w*.5, - s.h*.5);
			ctx.restore();

			// ctx.fillStyle = 'red';
			// ctx.fillRect(s.x, s.y, 2, 2);
		}
		ctx.globalAlpha = 1;
		ctx.shadowBlur = 0;
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