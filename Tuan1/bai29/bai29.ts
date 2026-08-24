interface Movable {
    move(): void;
}

class Car implements Movable {
    move(): void {
        console.log("The car moves on the road.");
    }
}

class Robot implements Movable {
    move(): void {
        console.log("The robot walks forward.");
    }
}

const movableObjects: Movable[] = [new Car(), new Robot()];
movableObjects.forEach(object => object.move());
