class BankAccount {
    balance: number;
    constructor(balance: number) {
        this.balance = balance;
    }

    deposit(amount: number): void {
        if (amount <= 0) {
            throw new Error("Amount must be a positive number");
        } else {
            this.balance += amount;
            console.log(`Đã nạp ${amount}, số dư sau khi nạp vào là: ${this.balance}`);
        }
    }

    withdraw(amount: number): void {
        if (amount <= 0) {
            throw new Error("Amount must be a positive number");
        } else {
            if (amount > this.balance) {
                throw new Error("Amount must be less than your balance!");
            } else {
                this.balance -= amount;
                console.log(`Bạn đã rút: ${amount}, số dư còn lại là: ${this.balance}`);
            }
        }
    }
}

const bank1 = new BankAccount(1000);
bank1.deposit(200);
bank1.withdraw(500);
