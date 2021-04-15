let balanced = false;

class Resource {

    constructor(type, index) {
        this.type = type;
        this.index = index;
        this.value;
        this.toggle = false;
        this.cache;
        this.red = false;
    }

    update(value) {
        this.value = value;

        if (this.value < this.cache) {
            balanced = false;
            this.red = true;
        } else {
            this.red = false;
        }
    }

    cacheValue(value) {
        this.cache = value;
    }

    display() {
        if (this.value != 0) {
            this.toggle = true;
        }
        if (this.value < 0) {
            this.value = 0;
        }
        if (this.toggle) {
            if (balanced) {
                fill("#388981");
            } else if (this.red) {
                textStyle(BOLD);
                fill("#FFD6D6");
            } else {
                fill(colors.light);
            }
            noStroke();
            textSize(14);
            textAlign(RIGHT, TOP);
            let value = Object.keys(resources)[this.index] + ": " + this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            text(value, width - 50,  50 + this.index * 20);
            textStyle(NORMAL);
        }
    }
}
