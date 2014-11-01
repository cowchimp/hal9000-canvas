document.addEventListener('DOMContentLoaded', function(){
	var canvasElement = document.getElementById('hal9000');
	var hal9000 = new Hal9000(canvasElement);

	hal9000.draw();
	speak();

	function speak() {
		if(!window.speechSynthesis) {
			hal9000.animate();
			return;
		}

		var msg = new window.SpeechSynthesisUtterance(getText());
		msg.rate = 0.7;
		msg.onstart = hal9000.animate.bind(hal9000);
		msg.onend = hal9000.stop.bind(hal9000);
		window.speechSynthesis.speak(msg);
	}

	function getText() {
		return 'It was the best of times.\
			it was the worst of times.\
			it was the age of wisdom.\
			it was the age of foolishness.\
			it was the epoch of belief.\
			it was the epoch of incredulity.\
			it was the season of Light.\
			it was the season of Darkness.\
			it was the spring of hope.\
			it was the winter of despair.';
	}
});