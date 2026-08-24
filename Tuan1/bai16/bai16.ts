class Box<T> {
    constructor(private value: T) {}

    getValue(): T {
        return this.value;
    }

    setValue(value: T): void {
        this.value = value;
    }
}

const numberBox = new Box<number>(100);
const stringBox = new Box<string>("Hello TypeScript");

console.log(numberBox.getValue());
console.log(stringBox.getValue());
