class Product {
    name: string;
    price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

}

const p1 = new Product("A", 110);
const p2 = new Product("B", 50);
const p3 = new Product("C", 130);
const p4 = new Product("D", 100);
const productList: Product[] = [p1, p2, p3];
productList.filter(p => p.price > 100).forEach(p => console.log(`Name: ${p.name}, Price: ${p.price}`));
