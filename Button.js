let colors = {dark: "#00685C", medium: "#B6E4B5", light: "#fff"};

class Button {

    constructor(x, y, letter) {
        this.x = x;
        this.y = y;
        this.letter = letter;
        this.size = 61;
        this.borderRadius = 7;
        this.strokeWeight = 4;
        this.status = "disabled";
    }

    drawButton() {

        switch(this.status) {
            case "active":
                this.drawActive();
                break;
            case "inactive":
                this.drawInactive();
                break;
            case "disabled":
                this.drawDisabled();
                break;
        }
    }

    drawActive() {

        let x = 0, y = 0, size = 0;

        if (keyIsDown(this.letter.charCodeAt(0))) {
            size = -2;
            x = 1;
            y = 1;
        } else {
            this.strokeWeight = 4;
        }
        strokeWeight(this.strokeWeight);

        if (this.letter == "X" && !sandboxMode) {
            stroke("#FFD15A");
            fill(colors.light);
        } else {
            stroke(colors.light);
            fill(colors.light);
        }
        rect(this.x +x, this.y + y, this.size + size, this.size + size, this.borderRadius);

        fill(colors.dark);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(23);
        text(this.letter, this.x + this.size/2, this.y + this.size/2 + 2);
    }

    drawInactive() {

        let x = 0, y = 0, size = 0;

        if (keyIsDown(this.letter.charCodeAt(0))) {
            size = -2;
            x = 1;
            y = 1;
        } else {
            this.strokeWeight = 4;
        }
        strokeWeight(this.strokeWeight);

        if (this.letter == "X" && !sandboxMode) {
            stroke("#FFDF8E");
            fill("#FFDF8E");
        } else {
            stroke(colors.medium);
            fill(colors.medium);
        }
        rect(this.x +x, this.y + y, this.size + size, this.size + size, this.borderRadius);

        fill(colors.dark);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(23);
        text(this.letter, this.x + this.size/2, this.y + this.size/2 + 2);
    }

    drawDisabled() {

        let x = 0, y = 0, size = 0;

        if (keyIsDown(this.letter.charCodeAt(0))) {
            size = -2;
            x = 1;
            y = 1;
        } else {
            this.strokeWeight = 4;
        }
        strokeWeight(this.strokeWeight);
        stroke(colors.medium);
        noFill();
        rect(this.x + x, this.y + y, this.size + size, this.size + size, this.borderRadius);
    }
}
