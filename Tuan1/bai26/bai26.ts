class Product {
    constructor(public name: string, public price: number) {}
}

class Order {
    constructor(private products: Product[] = []) {}

    addProduct(product: Product): void {
        this.products.push(product);
    }

    calculateTotalPrice(): number {
        return this.products.reduce((total, product) => total + product.price, 0);
    }
}

const order = new Order();
order.addProduct(new Product("Keyboard", 500));
order.addProduct(new Product("Mouse", 250));
order.addProduct(new Product("Headphones", 750));

console.log(`Total price: ${order.calculateTotalPrice()}`);
