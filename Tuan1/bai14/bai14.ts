class Employee {
    constructor(public name: string, public salary: number) {}

    displayInformation(): void {
        console.log(`Name: ${this.name}, Salary: ${this.salary}`);
    }
}

class Manager extends Employee {
    manageTeam(): void {
        console.log(`${this.name} is managing the team.`);
    }
}

class Developer extends Employee {
    writeCode(): void {
        console.log(`${this.name} is writing code.`);
    }
}

const manager = new Manager("An", 2000);
const developer = new Developer("Binh", 1500);

manager.displayInformation();
manager.manageTeam();
developer.displayInformation();
developer.writeCode();
