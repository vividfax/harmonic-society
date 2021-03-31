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
        stroke(255);
        fill(255);
        rect(this.x, this.y, this.size, this.size, this.borderRadius);

        fill("#333");
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(20);
        textFont("Nunito");
        text(this.letter, this.x + this.size/2, this.y + this.size/2 + 2);
    }

    drawInactive() {

        strokeWeight(4);
        stroke("#B1B1B1");
        fill("#B1B1B1");
        rect(this.x, this.y, this.size, this.size, this.borderRadius);

        fill("#333");
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(20);
        textFont("Nunito");
        text(this.letter, this.x + this.size/2, this.y + this.size/2 + 2);
    }

    drawDisabled() {

        strokeWeight(4);
        stroke("#B1B1B1");
        fill("#333");
        rect(this.x, this.y, this.size, this.size, this.borderRadius);
    }
}
