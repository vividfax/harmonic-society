let qwerty = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];

let buttons = [];

let players1 = [];
let players2 = [];
let players3 = [];
let players4 = [];

let loops1 = [];
let loops2 = [];
let loops3 = [];
let loops4 = [];

let histories = [];

function setup() {

	createCanvas(windowWidth, windowHeight);
	textFont("Nunito");
	frameRate(24);

	createButtons();
	buttons[4].status = "inactive";
	buttons[25].status = "inactive";

	createSoundPlayers();
	Tone.Transport.bpm.value = 80;

	background("#388981");
	drawNoise("#79AEAC");

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

	drawWaves();
	// drawResources();

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
			stopSounds(i);
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
	stroke("rgba(255,255, 255, 0.5)");

	for (let i = 0; i < histories.length; i++) {

		histories[i].push(resources[Object.keys(resources)[i]]);
		let resource = histories[i];

		if(i == histories.length - 1) {
			stroke("#FFDF8E");
		}
		beginShape();

		for (let i = 0; i < resource.length; i += 1) {
			vertex(i + 1, map(resource[i], 0, height * 4, height, 0) + 1);
		}
		vertex(width + 1, height + 1);
		vertex(0, height + 1);
		endShape();

		if (resource.length > width) {
			resource.splice(0, 1);
		}
	}
}

function keyTyped() {

	for (let i = 0; i < qwerty.length; i++) {

		if (key.toUpperCase() == qwerty[i]) {

			if (buttons[i].status == "inactive") {
				buttons[i].status = "active";
				playSounds(i);
			} else if (buttons[i].status == "active") {
				buttons[i].status = "inactive";
				stopSounds(i);
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

function createSoundPlayers() {

	for (let i = 0; i < qwerty.length; i++) {

		players1[i] = new Tone.Player({
			url: "samples/" + qwerty[i] + ".wav",
		}).toMaster();
		players2[i] = new Tone.Player({
			url: "samples/" + qwerty[i] + ".wav",
		}).toMaster();
		players3[i] = new Tone.Player({
			url: "samples/" + qwerty[i] + ".wav",
		}).toMaster();
		players4[i] = new Tone.Player({
			url: "samples/" + qwerty[i] + ".wav",
		}).toMaster();
	}
}

function playSounds(i) {

	let repeats = 1;

	if (random(4) <= 1) {
		repeats = int(random(2, 5));
	}
	if (i == 20) {
		repeats = 1;
	}
	switch (repeats) {
		case 1:
			playSound(i, loops1, players1);
			break;
		case 2:
			playSound(i, loops1, players1);
			playSound(i, loops2, players2);
			break;
		case 3:
			playSound(i, loops1, players1);
			playSound(i, loops2, players2);
			playSound(i, loops3, players3);
			break;
		case 4:
			playSound(i, loops1, players1);
			playSound(i, loops2, players2);
			playSound(i, loops3, players3);
			playSound(i, loops4, players4);
			break;
	}
}

function playSound(i, loop, player) {

	loop[i] = new Tone.Loop((time) => {

		player[i].start();

	}, "1n").start(random(0, 4));
	Tone.Transport.start();
}

function stopSounds(i) {

	if (loops1[i] != undefined) {
		loops1[i].stop();
	}
	if (loops2[i] != undefined) {
		loops2[i].stop();
	}
	if (loops3[i] != undefined) {
		loops3[i].stop();
	}
	if (loops4[i] != undefined) {
		loops4[i].stop();
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
