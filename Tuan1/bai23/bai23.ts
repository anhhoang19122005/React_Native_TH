interface Payment {
    pay(amount: number): void;
}

class CashPayment implements Payment {
    pay(amount: number): void {
        if (amount <= 0) {
            throw new Error("Payment amount must be positive");
        }
        console.log(`Paid ${amount} by cash.`);
    }
}

class CardPayment implements Payment {
    constructor(private cardNumber: string) {}

    pay(amount: number): void {
        if (amount <= 0) {
            throw new Error("Payment amount must be positive");
        }
        const lastFourDigits = this.cardNumber.slice(-4);
        console.log(`Paid ${amount} by card ending in ${lastFourDigits}.`);
    }
}

const payments: Payment[] = [
    new CashPayment(),
    new CardPayment("1234567812345678")
];
payments.forEach(payment => payment.pay(500));
