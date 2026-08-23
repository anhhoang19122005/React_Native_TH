class Account {
    private username: string;
    private password: string;
    readonly createdAt: Date;

    constructor(username: string, password: string, createdAt: Date) {
        this.username = username;
        this.password = password;
        this.createdAt = createdAt;
    }
    
}