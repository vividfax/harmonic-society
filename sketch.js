let qwerty = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];

let buttons = [];

let resourcesText = [];

let loops = [];
let players = [];

let histories = [];

let sandboxMode = false;

function setup() {

	createCanvas(windowWidth, windowHeight);
	textFont("Nunito");
	frameRate(24);

	createButtons();
	buttons[4].status = "inactive";
	buttons[25].status = "inactive";

	createResourcesText();

	createSoundPlayers();
	Tone.Transport.bpm.value = 60;

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

	updatePixels();

	if (!sandboxMode) {
		drawWaves();
		// drawResources();
	}
	if (resources.score > 1000) {
		drawSandboxButton();
	}
	if (sandboxMode) {

		for (let i = 0; i < qwerty.length; i++) {
			if (buttons[i].status == "disabled") {
				buttons[i].status = "inactive";
			}
			buttons[i].drawButton();
		}
		drawScore(-1);
		return;
	}
	if (resources.score != 0) {
		drawScore(resources.score);
	}
	for (let i = 0; i < resourcesText.length; i++) {
		resourcesText[i].update(resources[Object.keys(resources)[i]]);
		resourcesText[i].display();
		resourcesText[i].cacheValue(resources[Object.keys(resources)[i]]);
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
	stroke("rgba(255,255, 255, 0.5)");

	for (let i = 0; i < histories.length; i++) {

		histories[i].push(resources[Object.keys(resources)[i]]);
		let resource = histories[i];

		if(i == histories.length - 1) {
			stroke("#FFD15A");
		}
		beginShape();

		for (let i = 0; i < resource.length; i += 1) {
			vertex(i + 1, map(resource[i], 0, height * 3, height, 0) + 1);
		}
		vertex(width + 1, height + 1);
		vertex(0, height + 1);
		endShape();

		if (resource.length > width) {
			resource.splice(0, 1);
		}
	}
}

function drawScore(score) {

	noStroke();

	if (score >= 5000) {
		fill("#FFD15A");
	} else if (score >= 1000) {
		fill("#FFE8AD");
	} else if (score == -1) {
		fill(colors.medium);
	} else {
		fill(colors.light);
	}
	textSize(40);
	textAlign(CENTER, CENTER);
	score = resources.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	text(score, width/2, height/4);
}

function createResourcesText() {

	for (let i = 0; i < Object.keys(resources).length - 1; i++) {
		resourcesText[i] = new Resource(Object.keys(resources)[0], i);
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

function drawSandboxButton() {

	if (!sandboxMode) {
		stroke(colors.medium);
		fill(colors.medium);
		strokeWeight(2);

		if (mouseX > 50 && mouseX < 190 && mouseY > 50 && mouseY < 90) {
			stroke(colors.light);
			fill(colors.light);
		}
		rect(50, 50, 140, 40, 7);
	}
	noStroke();
	fill(colors.dark);

	if (sandboxMode) {
		fill(colors.light);
	}
	textSize(14);
	text("Sandbox Mode", 120, 72);
}

function mouseReleased() {

	if (mouseX > 20 && mouseX < 160 && mouseY > 20 && mouseY < 60 && resources.score > 1000) {
		sandboxMode = true;
	}
}

function createSoundPlayers() {

	for (let i = 0; i < qwerty.length; i++) {

		players[i] = new Tone.Player({
			url: "samples/" + qwerty[i] + ".wav",
		}).toMaster();
	}
}

function playSound(i) {

	let repeats = 1;

	if (random() > 0.5 && i != 20) {
		repeats = int(random(1, 5));
	}
	loops[i] = new Tone.Loop((time) => {

		players[i].start();

	}, repeats + "n").start("+1i");

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
