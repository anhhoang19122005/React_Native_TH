class Rectangle {
    width: number;
    height: number;

    constructor(width: number, height:number) {
        this.width = width;
        this.height = height;
    }

    calcArea(): number {
        return this.width * this.height;
    }
}

const rectangle = new Rectangle(5,10);
console.log(`Area: ${rectangle.calcArea()}`);