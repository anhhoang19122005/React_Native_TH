interface Vehicle {
    start(): void;
    stop(): void;
}

class Car implements Vehicle {
    start(): void {
        console.log("Car engine started.");
    }

    stop(): void {
        console.log("Car engine stopped.");
    }
}

class Bike implements Vehicle {
    start(): void {
        console.log("Bike started moving.");
    }

    stop(): void {
        console.log("Bike stopped.");
    }
}

const vehicles: Vehicle[] = [new Car(), new Bike()];
vehicles.forEach(vehicle => {
    vehicle.start();
    vehicle.stop();
});
