let qwerty = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];

let buttons = [];
let players = [];
let loops = [];

let histories = [];

function setup() {

	createCanvas(windowWidth, windowHeight);
	textFont("Nunito");
	frameRate(24);

	createButtons();
	buttons[4].status = "inactive";
	buttons[25].status = "inactive";

	createSoundPlayer();

	background("#0C6F64");
	drawNoise("#4D958F");
	drawNoise("#93BDBE");

	for (let i = 0; i < Object.keys(resources).length - 1; i++) {
		let arr = []
		for (let j = 0; j < width; j++) {
			arr.push(0);
		}
		histories.push(arr);
	}
}

function draw() {

	// strokeWeight(1);
	// setGradient(0,0, width, height, "#A3C7C9", "#00685C");
	updatePixels();

	// drawResources();
	drawWaves();

	if (resources.score != 0) {

		fill(colors.light);
		noStroke();
		textSize(40);
		textAlign(CENTER, CENTER);
		let score = resources.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		text(score, width/2, height/4);
	}
	for (let i = 0; i < qwerty.length; i++) {

		if (buttons[i].status != getButtonStatus(i) && getButtonStatus(i) == "disabled") {
			stopSound(i);
		}
		buttons[i].status = getButtonStatus(i);

		if (buttons[i].status == "active") {
			manageResources(i);
		}
		buttons[i].drawButton();
	}
}

function drawWaves() {

	strokeWeight(1);
	fill("rgba(255, 255, 255, 0.1)");
	stroke('rgba(255,255, 255, 0.5)');

	for (let i = 0; i < histories.length - 1; i++) {

		histories[i].push(resources[Object.keys(resources)[i]]);
		let resource = histories[i];

		beginShape();

		for (let i = 0; i < resource.length; i+= 1) {
			vertex(i, map(resource[i], 0, height*2, height, 0))
		}
		vertex(width, height);
		vertex(0, height);
		endShape();

		if (resource.length > width) {
			resource.splice(0,1);
		}
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
		buttons[i] = new Button(startPoint + (65+padding) * i + padding/2, height/2, qwerty[i]);
	}
	startPoint = width/2 - (65+padding) * 9 / 2 - 20;
	for (let i = 10; i < 19; i++) {
buttons[i] = new Button(startPoint + (65+padding) * (i - 10) + padding/2, height/2 + padding + 65, qwerty[i]);
	}
	startPoint = width/2 - (65+padding) * 8 / 2 - 20;
	for (let i = 19; i < 26; i++) {
buttons[i] = new Button(startPoint + (65+padding) * (i - 19) + padding/2, height/2 + padding * 2 + 65 * 2, qwerty[i]);
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
		// console.log(time);

	// }, "1n").start(i % 4);
	// }, "1n").start(int(random(0, 4))/2);
	}, "1n").start(random(0, 2));
	Tone.Transport.start();
}

function stopSound(i) {

	if (loops[i] != undefined) {
		loops[i].stop();
	}
}

function drawResources() {

	strokeWeight(1);
	fill(255);
	textAlign(LEFT, CENTER);
	textSize(12);
	text(JSON.stringify(resources), 50, 50);
}

function drawNoise(a) {

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {

			if (y/height < random()) {
				set(x, y, color(a));
			}
		}
	}
	updatePixels();
}

function setGradient(x, y, w, h, c1, c2) {

	strokeWeight(1);

    for (let i = y; i <= y + h; i++) {
		let inter = map(i, y, y + h, 0, 1);
		let c = colorLerp(c1, c2, inter);
		stroke(c);
		line(x, i, x + w, i);
	}
}

function colorLerp(a, b, amount) {

    let ah = parseInt(a.replace(/#/g, ""), 16),
        ar = ah >> 16,
        ag = ah >> 8 & 0xff,
        ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ""), 16),
        br = bh >> 16,
        bg = bh >> 8 & 0xff,
        bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return "#" + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}
