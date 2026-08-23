interface Flyable {
    fly(): void;
}
interface Swimmable {
    swim(): void;
}
class Bird implements Flyable {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    fly(): void {
        console.log(`${this.name} is flying`);
    }
}
class Fish implements Swimmable {
    name: string;
    constructor(name: string) {this.name = name;}
    swim(): void {
        console.log(`${this.name} is swimming`);
    }
}
const bird = new Bird("Birddd");
const fish = new Fish("Fishh")
bird.fly();
fish.swim();