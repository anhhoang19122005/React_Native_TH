class Animal {
    public name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    bark(): void {
        console.log("Bark")
    }
}

class Cat extends Animal {
    meow(): void {
        console.log("Meow");
    }
}

const dog = new Dog("Doggg");
dog.bark()

const meo = new Cat("Meoww")
meo.meow();
