class Book  {
    title: string;
    author: string;
    year: number;

    constructor(title: string, author: string, year: number) {
        this.title = title;
        this.author = author;
        this.year = year;
    }

    displayInformation(): void {
        console.log(`Title: ${this.title}, Author: ${this.author}, Year: ${this.year}`);
    }
}

const book = new Book("Muon Kiep Nhan Sinh", "A", 2000);
book.displayInformation();