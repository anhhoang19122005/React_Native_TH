class Repository<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getAll(): T[] {
        return [...this.items];
    }
}

const numberRepository = new Repository<number>();
numberRepository.add(10);
numberRepository.add(20);

const stringRepository = new Repository<string>();
stringRepository.add("TypeScript");
stringRepository.add("OOP");

console.log(numberRepository.getAll());
console.log(stringRepository.getAll());
