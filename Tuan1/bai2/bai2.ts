import { Person } from "../bai1/bai1.ts";
class Student extends Person {
    grade: number;
    constructor(name: string, age: number, grade: number) {
        super(name,age);
        this.grade = grade;
    }

    displayAllInfo(): void {
        this.displayInformation();
        console.log(`Grade: ${this.grade}`)
    }
}

const student = new Student("Anh", 20, 10);
student.displayAllInfo();