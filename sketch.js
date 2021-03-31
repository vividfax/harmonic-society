let buttons = [];
let qwerty = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];
let players = [];
let loops = [];

function setup() {

	createCanvas(windowWidth, windowHeight);
	background("#333");

	createButtons();
	buttons[4].status = "inactive";
	buttons[25].status = "inactive";

	createSoundPlayer();
}

function draw() {

	for (let i = 0; i < qwerty.length; i++) {

		buttons[i].drawButton();
	}
}

function keyTyped() {

	for (let i = 0; i < qwerty.length; i++) {

		if (key.toUpperCase() == qwerty[i]) {

			if (buttons[i].status == "inactive") {
				buttons[i].status = "active";
				playSound(i);
			} else if (buttons[i].status == "active") {
				buttons[i].status = "inactive";
				stopSound(i);
			}
		}
	}
}

function createButtons() {

	let padding = 13;

	let startPoint = width/2 - (65+padding) * 10 / 2;
	for (let i = 0; i < 10; i++) {
		buttons[i] = new Button(startPoint + (65+padding) * i, height/2, qwerty[i]);
	}
	startPoint = width/2 - (65+padding) * 9 / 2 - 20;
	for (let i = 10; i < 19; i++) {
buttons[i] = new Button(startPoint + (65+padding) * (i - 10), height/2 + padding + 65, qwerty[i]);
	}
	startPoint = width/2 - (65+padding) * 8 / 2 - 40;
	for (let i = 19; i < 26; i++) {
buttons[i] = new Button(startPoint + (65+padding) * (i - 19), height/2 + padding * 2 + 65 * 2, qwerty[i]);
	}
}

function createSoundPlayer() {

	for (let i = 0; i < qwerty.length; i++) {

		players[i] = new Tone.Player({
			url: "samples/" + qwerty[i] + ".wav",
		}).toMaster();
	}
}

function playSound(i) {

	loops[i] = new Tone.Loop((time) => {

		players[i].start();
		console.log(time);

	}, "1n").start(i%4);
	Tone.Transport.start();
}

function stopSound(i) {

	loops[i].stop();
}
