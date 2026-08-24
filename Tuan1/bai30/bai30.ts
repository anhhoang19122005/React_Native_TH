class Student {
    constructor(public name: string, public grade: number) {}

    displayInformation(): void {
        console.log(`Student: ${this.name}, Grade: ${this.grade}`);
    }
}

class Teacher {
    constructor(public name: string, public subject: string) {}

    displayInformation(): void {
        console.log(`Teacher: ${this.name}, Subject: ${this.subject}`);
    }
}

class School {
    private students: Student[] = [];
    private teachers: Teacher[] = [];

    addStudent(student: Student): void {
        this.students.push(student);
    }

    addTeacher(teacher: Teacher): void {
        this.teachers.push(teacher);
    }

    displayInformation(): void {
        console.log("Students:");
        this.students.forEach(student => student.displayInformation());
        console.log("Teachers:");
        this.teachers.forEach(teacher => teacher.displayInformation());
    }
}

const school = new School();
school.addStudent(new Student("An", 10));
school.addStudent(new Student("Binh", 9));
school.addTeacher(new Teacher("Lan", "Mathematics"));
school.displayInformation();
