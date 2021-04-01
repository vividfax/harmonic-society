let colors = {dark: "#00685C", medium: "#B6E4B5", light: "#fff"}

class Button {

    constructor(x, y, letter) {
        this.x = x;
        this.y = y;
        this.letter = letter;
        this.size = 61;
        this.borderRadius = 7;
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

        strokeWeight(4);
        stroke(colors.light);
        fill(colors.light);
        rect(this.x, this.y, this.size, this.size, this.borderRadius);

        fill(colors.dark);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(20);
        text(this.letter, this.x + this.size/2, this.y + this.size/2 + 2);
    }

    drawInactive() {

        strokeWeight(4);
        stroke(colors.medium);
        fill(colors.medium);
        rect(this.x, this.y, this.size, this.size, this.borderRadius);

        fill(colors.dark);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(20);
        text(this.letter, this.x + this.size/2, this.y + this.size/2 + 2);
    }

    drawDisabled() {

        strokeWeight(4);
        stroke(colors.medium);
        // fill(colors.dark);
        noFill();
        rect(this.x, this.y, this.size, this.size, this.borderRadius);
    }
}
