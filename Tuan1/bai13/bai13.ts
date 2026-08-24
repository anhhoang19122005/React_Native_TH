abstract class Shape {
    abstract area(): number;
}

class Square extends Shape {
    constructor(private side: number) {
        super();
    }

    area(): number {
        return this.side * this.side;
    }
}

class Circle extends Shape {
    constructor(private radius: number) {
        super();
    }

    area(): number {
        return Math.PI * this.radius * this.radius;
    }
}

const square = new Square(5);
const circle = new Circle(3);

console.log(`Square area: ${square.area()}`);
console.log(`Circle area: ${circle.area().toFixed(2)}`);
