class Car {
    brand: string;
    model: string;
    year: number;
    constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    displayInformation(): void {
        console.log(`Brand: ${this.brand}, Model :${this.model}, Year: ${this.year}`);
    }
}

const car = new Car("Ford", "Mustang", 2000);
car.displayInformation();