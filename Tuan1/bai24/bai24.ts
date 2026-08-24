abstract class Appliance {
    constructor(public name: string) {}

    abstract turnOn(): void;
}

class Fan extends Appliance {
    turnOn(): void {
        console.log(`${this.name} starts spinning.`);
    }
}

class AirConditioner extends Appliance {
    turnOn(): void {
        console.log(`${this.name} starts cooling the room.`);
    }
}

const appliances: Appliance[] = [
    new Fan("Fan"),
    new AirConditioner("Air conditioner")
];
appliances.forEach(appliance => appliance.turnOn());
