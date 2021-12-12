class Transaction {
    constructor(
        public amount: number,
        public sender: string,
        public recipient: string
    ) {}

    public toString(): string {
        return JSON.stringify(this);
    }
}

export default Transaction;
