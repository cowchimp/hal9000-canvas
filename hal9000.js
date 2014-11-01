function Hal9000(canvasElement) {
	var self = this;
	var gradientConsts = {
		opacity: 0.5,
		minOffset: 0.4,
		maxOffset: 0.8,
		initialOffsetStep: 0.1
	};
	var tickDuration = 100;

	var dimensions = getCanvasDimensions();
	var gradientOffset = gradientConsts.maxOffset;
	var gradientOffsetStep = gradientConsts.initialOffsetStep;
	var animationDirection = false;
	var intervalId;
	var canvas = canvasElement.getContext('2d');

	this.draw = function() {
		loadImage(loadEllipse);
	};

	this.animate = function() {
		intervalId = setInterval(tick, tickDuration);
	};

	this.stop = function() {
		clearInterval(intervalId);
		gradientOffset = gradientConsts.maxOffset;
		reset();
		self.draw();
	};

	function tick() {
		calcOffset();
		reset();
		self.draw();
	}

	function calcOffset() {
		if(animationDirection) {
			gradientOffset += gradientOffsetStep;
		} else {
			gradientOffset -= gradientOffsetStep;
		}
		if(gradientOffset < gradientConsts.minOffset) {
			gradientOffset = gradientConsts.minOffset;
			changeGradientOffsetStep();
			animationDirection = true;
		}
		if(gradientOffset > gradientConsts.maxOffset) {
			gradientOffset = gradientConsts.maxOffset;
			animationDirection = false;
		}
	}

	function changeGradientOffsetStep() {
		var random = Math.floor(Math.random() * (10 - 3)) + 3;
		gradientOffsetStep = random * 0.05;
	}

	function loadEllipse() {
		var gradient = canvas.createRadialGradient(dimensions.centerX,dimensions.centerY,0,dimensions.centerX,dimensions.centerY,dimensions.radius);
		gradient.addColorStop(0, 'rgba(255,255,0,'+gradientConsts.opacity+')');
		gradient.addColorStop(0.07, 'rgba(255,0,0,'+gradientConsts.opacity+')');
		gradient.addColorStop(0.22, 'rgba(255,0,0,'+gradientConsts.opacity+')');
		gradient.addColorStop(gradientOffset, 'rgba(255,0,0,'+0+')');

		canvas.beginPath();
		canvas.fillStyle = gradient;
		canvas.arc(dimensions.centerX, dimensions.centerY, dimensions.radius, 0, 2 * Math.PI);
		canvas.fill();
	}

	function loadImage(callback) {
		var img = new Image();
		img.addEventListener('load', function () {
			canvas.drawImage(img,0,0,dimensions.width,dimensions.height);
			if(typeof callback == 'function') {
				callback();
			}
		});
		img.src = "hal9000.png";
	}

	function reset() {
		canvas.clearRect(0, 0, dimensions.width, dimensions.height);
	}

	function getCanvasDimensions() {
		var dimensions = {
			width: canvasElement.width,
			height: canvasElement.height,
			centerX: canvasElement.width / 2,
			centerY: canvasElement.height / 2
		};
		dimensions.radius = Math.min(canvasElement.width / 2, canvasElement.height / 2);
		return dimensions;
	}
}