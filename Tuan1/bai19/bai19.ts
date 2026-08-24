class Animal {
    sound(): void {
        console.log("The animal makes a sound.");
    }
}

class Dog extends Animal {
    override sound(): void {
        console.log("The dog barks.");
    }
}

class Cat extends Animal {
    override sound(): void {
        console.log("The cat meows.");
    }
}

const animals: Animal[] = [new Animal(), new Dog(), new Cat()];
animals.forEach(animal => animal.sound());
