export default class rgb {
    red: number;
    green: number;
    blue: number;
    alpha: number;

    isColour: boolean;

    constructor (red=0, green=red, blue=red, alpha = 1) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;

        this.isColour = true;
    }

    get hex () {
        return `#${rgbValToHex(this.red)}${rgbValToHex(this.green)}${rgbValToHex(this.blue)}`;
    }

    get rgb () {
        return `rgb(${this.red}, ${this.green}, ${this.blue})`
    }

    get rgba () {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
    }

    get clone () {
        return new rgb(this.red, this.green, this.blue, this.alpha);
    }

    get json () {
        return {
            r: this.red,
            g: this.green,
            b: this.blue,
            a: this.alpha
        }
    }

    static parse (val: string): rgb {
        let m;

        m = val.match(/^#([\da-f]{3})$/i);
        if (m && m[1]) {
            // in three-character format, each value is multiplied by 0x11 to give an
            // even scale from 0x00 to 0xff
            return new rgb(
                parseInt(m[1].charAt(0),16)*0x11,
                parseInt(m[1].charAt(1),16)*0x11,
                parseInt(m[1].charAt(2),16)*0x11
            );
        }

        m = val.match(/^#([\da-f]{6})$/i);
        if (m && [1]) {
            return new rgb(
                parseInt(m[1].substr(0,2),16),
                parseInt(m[1].substr(2,2),16),
                parseInt(m[1].substr(4,2),16)
            );
        }

        m = val.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
        if (m) {
            return new rgb(parseInt(m[1]), parseInt(m[2]), parseInt(m[3]));
        }

        return namedColours[val] || new rgb(0, 0, 0);
    }

    fromJSON ({ r, g, b }: { r: number, g: number, b: number }) {
        return new rgb(r, g, b);
    }
}

const namedColours: {[k: string]: rgb} = {
    'red': new rgb(255, 0, 0),
    'green': new rgb(0, 255, 0),
    'blue': new rgb(0, 0, 255),
    'white': new rgb(255, 255, 255),
};


export function rgbValToHex (val: number | string): string {
    let hex = Number(val).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
}