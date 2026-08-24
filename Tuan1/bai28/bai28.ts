class Animal {
    protected makeSound(): void {
        console.log("The animal makes a sound.");
    }

    sound(): void {
        this.makeSound();
    }
}

class Dog extends Animal {
    protected override makeSound(): void {
        console.log("The dog barks.");
    }
}

class Cat extends Animal {
    protected override makeSound(): void {
        console.log("The cat meows.");
    }
}

const animals: Animal[] = [new Dog(), new Cat()];
animals.forEach(animal => animal.sound());
