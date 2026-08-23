class User {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }
}

const user = new User("Anh")
console.log(user.getName());
user.setName("Ha");
console.log(user.getName());