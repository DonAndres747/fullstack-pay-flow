export class Transaction {
    constructor({ id, quantity, status, createdAt, updatedAt }) {
        this.transactionId = id;
        this.quantity = quantity;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
