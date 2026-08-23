export class Person {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    displayInformation(): void {
        console.log(`Name: ${this.name} ` + `, Age: ${this.age}`);
    }
}

// const person = new Person("Anh", 20);
// person.displayInformation();