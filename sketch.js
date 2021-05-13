let qwerty = [
	"Q",
	"W",
	"E",
	"R",
	"T",
	"Y",
	"U",
	"I",
	"O",
	"P",
	"A",
	"S",
	"D",
	"F",
	"G",
	"H",
	"J",
	"K",
	"L",
	"Z",
	"X",
	"C",
	"V",
	"B",
	"N",
	"M",
];

let percussive = ["H", "K", "M", "N", "T", "W"];

let actions = [
	"innovate",
	"brew",
	"procreate",
	"repair",
	"chop trees",
	"recycle",
	"teach",
	"make\nmachinery",
	"compute",
	"farm",
	"trade",
	"socialise",
	"make\nmedicine",
	"fish",
	"forage",
	"hunt",
	"make energy",
	"make tools",
	"raise cattle",
	"read",
	"luxuriate",
	"cook",
	"write",
	"build",
	"3d print",
	"mine",
];

let buttons = [];

let resourcesText = [];

let loops = [];
let players = [];

let histories = [];

let sandboxMode = false;
let showButtons = true;

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
		let arr = [];
		for (let j = 0; j < width; j++) {
			arr.push(0);
		}
		histories.push(arr);
	}
	setInterval(drawLoop, 1000 / 24);
}

function drawLoop() {
	if (!sandboxMode) {
		update();
	}
	if (!document.hidden) {
		display();
	}
}

function update() {
	balanced = true;

	if (buttons[20].status != "active") {
		balanced = false;
	}
	for (let i = 0; i < qwerty.length; i++) {
		if (
			buttons[i].status != getButtonStatus(i) &&
			getButtonStatus(i) == "disabled"
		) {
			stopSound(i);
		}
		buttons[i].status = getButtonStatus(i);

		if (buttons[i].status == "active") {
			manageResources(i);
		}
	}
	for (let i = 0; i < resourcesText.length; i++) {
		resourcesText[i].update(resources[Object.keys(resources)[i]]);
		resourcesText[i].cacheValue(resources[Object.keys(resources)[i]]);
	}
	if (buttons[20].status != "active") {
		balanced = false;
	}
	for (let i = 0; i < histories.length; i++) {
		histories[i].push(resources[Object.keys(resources)[i]]);
		let resource = histories[i];

		if (resource.length > width) {
			resource.splice(0, 1);
		}
	}
}

function display() {
	if (balanced && !sandboxMode) {
		background("#FFDF8E");
	} else {
		updatePixels();
	}
	if (sandboxMode) {
		for (let i = 0; i < qwerty.length; i++) {
			if (buttons[i].status == "disabled") {
				buttons[i].status = "inactive";
			}
			buttons[i].drawButton();
		}
		drawSandboxButton();
		drawScore();
		return;
	}
	drawWaves();

	if (showButtons) {
		for (let i = 0; i < qwerty.length; i++) {
			buttons[i].drawButton();
		}
	}
	if (resources.score > 1000 || balanced) {
		drawSandboxButton();
	}
	for (let i = 0; i < resourcesText.length; i++) {
		resourcesText[i].display();
	}
	if (resources.score != 0) {
		drawScore();
	}
}

function drawWaves() {
	strokeWeight(1);
	fill(255, 255 / 10);
	stroke(255, 255 / 2);

	for (let i = 0; i < histories.length; i++) {
		let resource = histories[i];

		if (i == histories.length - 1) {
			stroke("#FFD15A");
		}
		beginShape();

		for (let i = 0; i < resource.length; i += 1) {
			vertex(i + 1, map(resource[i], 0, height * 3, height, 0) + 1);
		}
		vertex(width + 1, height + 1);
		vertex(0, height + 1);
		endShape();
	}
}

function drawScore() {
	noStroke();
	textSize(40);
	fill(colors.light);
	textAlign(CENTER, CENTER);

	if (sandboxMode) {
		fill(colors.medium);
	} else if (balanced) {
		fill("#388981");
		textSize(30);
		text("Balance achieved!", width / 2, height / 4 + 60);
		textSize(60);
	} else if (resources.score >= 5000) {
		fill("#FFD15A");
	} else if (resources.score >= 1000) {
		fill("#FFE8AD");
	}
	let score = resources.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	text(score, width / 2, height / 4);
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
	let offsetMultiplier = 0;
	let buttonHeight = 61;
	let keyboardHeight = (buttonHeight+padding)*3;
	let screenRemainder = windowHeight - keyboardHeight;
	let keyboardPosition = screenRemainder * 0.666; // This moves the keyboard 2/3rds down the screen

	let startPoint = width / 2 - ((65 + padding) * 10) / 2;
	for (let i = 0; i < 10; i++) {
		buttons[i] = new Button(
			startPoint + (65 + padding) * i + padding / 2,
			keyboardPosition + (65+padding)*offsetMultiplier,
			qwerty[i],
			actions[i]
		);
	}
	offsetMultiplier++;
	startPoint = width / 2 - ((65 + padding) * 9) / 2 - 20;
	for (let i = 10; i < 19; i++) {
		buttons[i] = new Button(
			startPoint + (65 + padding) * (i - 10) + padding / 2,
			keyboardPosition + (65+padding)*offsetMultiplier,
			qwerty[i],
			actions[i]
		);
	}
	offsetMultiplier++;
	startPoint = width / 2 - ((65 + padding) * 8) / 2 - 20;
	for (let i = 19; i < 26; i++) {
		buttons[i] = new Button(
			startPoint + (65 + padding) * (i - 19) + padding / 2,
			keyboardPosition + (65+padding)*offsetMultiplier,
			qwerty[i],
			actions[i]
		);
	}
}

function drawSandboxButton() {
	let label;

	if (!sandboxMode) {
		label = "Sandbox Mode";
	} else {
		label = "Return to Game";
	}
	stroke(colors.medium);
	fill(colors.medium);
	strokeWeight(2);

	if (mouseX > 50 && mouseX < 190 && mouseY > 50 && mouseY < 90) {
		stroke(colors.light);
		fill(colors.light);
	}
	rect(50, 50, 140, 40, 7);

	noStroke();
	fill(colors.dark);

	textSize(14);
	text(label, 120, 72);
}

function mouseReleased() {
	sandboxAvailable();
	buttonTouched();
}
function touchStarted() {
}
function touchEnded() {
}

function buttonTouched() {
	// Cursor input
	for (let j = 0; j < buttons.length; j++) {
		if (
			mouseX > buttons[j].x &&
			mouseX < buttons[j].x+61 &&
			mouseY > buttons[j].y &&
			mouseY < buttons[j].y+61
		) {
			if (buttons[j].status == "inactive") {
				buttons[j].status = "active";
				playSound(j);
			} else if (buttons[j].status == "active") {
				buttons[j].status = "inactive";
				stopSound(j);
			}
		}
	}
}

function sandboxAvailable() {
	if (mouseX > 50 && mouseX < 190 && mouseY > 50 && mouseY < 90 && (resources.score > 1000 || balanced)) {
		if (!sandboxMode) {
			sandboxMode = true;
		} else {
			sandboxMode = false;
		}
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

	if (percussive.indexOf(qwerty[i]) > -1) {
		repeats = random([1, 2, 4]);
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

function drawNoise(a) {
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (y / height < random()) {
				set(x, y, color(a));
			}
		}
	}
	updatePixels();
}
