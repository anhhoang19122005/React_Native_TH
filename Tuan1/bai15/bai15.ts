class Book {
    constructor(public title: string, public author: string) {}
}

class User {
    constructor(public name: string) {}
}

class Library {
    private books: Book[] = [];
    private users: User[] = [];

    addBook(book: Book): void {
        this.books.push(book);
    }

    addUser(user: User): void {
        this.users.push(user);
    }

    displayInformation(): void {
        console.log("Books:");
        this.books.forEach(book => console.log(`- ${book.title} by ${book.author}`));
        console.log("Users:");
        this.users.forEach(user => console.log(`- ${user.name}`));
    }
}

const library = new Library();
library.addBook(new Book("The Little Prince", "Antoine de Saint-Exupery"));
library.addUser(new User("An"));
library.displayInformation();
