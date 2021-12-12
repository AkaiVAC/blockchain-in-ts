import * as crypto from 'crypto';
import Transaction from './Transaction';

class Block {
    public nonce: number = Math.round(Math.random() * 999_999_999);

    constructor(
        public previousHash: string | null,
        public transaction: Transaction,
        public timestamp: Date = new Date()
    ) {}

    get hash(): string {
        const str = JSON.stringify(this);
        const hash = crypto.createHash('SHA256');
        hash.update(str).end();
        return hash.digest('hex');
    }
}

export default Block;
