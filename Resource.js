class Resource {

    constructor(type, index) {
        this.type = type;
        this.index = index;
        this.value;
        this.toggle = false;
    }

    update(value) {
        this.value = value;
    }

    display() {
        if (this.value != 0) {
            this.toggle = true;
        }
        if (this.value < 0) {
            this.value = 0;
        }
        if (this.toggle) {
            fill(colors.light);
            noStroke();
            textSize(16);
            textAlign(RIGHT, TOP);
            let value = this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            text(value, width - 20,  20 + this.index * 20);
        }
    }
}
