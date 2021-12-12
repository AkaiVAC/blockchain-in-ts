import crypto from 'crypto';
import Block from './Block';
import Transaction from './Transaction';

class Chain {
    public static instance = new Chain();

    chain: Block[];

    constructor() {
        if (Chain.instance) {
            throw new Error(
                'Error: Instantiation failed: Use Chain.instance instead of new.'
            );
        }
        this.chain = [new Block('', new Transaction(100, 'genesis', 'arun'))];
    }

    get lastBlock() {
        return this.chain[this.chain.length - 1];
    }

    public mine(nonce: number): number {
        let solution = 1;
        console.log('⛏️  Mining...');

        while (true) {
            const hash = crypto.createHash('MD5');
            hash.update((nonce + solution).toString()).end();

            const attempt = hash.digest('hex');

            if (attempt.startsWith('0000')) {
                console.log(`⚒ Solution found: ${solution}\n`);
                return solution;
            }

            solution++;
        }
    }

    public addBlock(
        transaction: Transaction,
        senderPublicKey: string,
        signature: Buffer
    ): void {
        const verify = crypto.createVerify('SHA256');
        verify.update(transaction.toString());

        const isValid = verify.verify(senderPublicKey, signature);

        console.log(`🔎 Transaction is valid: ${isValid}`);

        if (isValid) {
            const newBlock = new Block(this.lastBlock!.hash, transaction);
            this.mine(newBlock.nonce);
            this.chain.push(newBlock);
        }
    }
}

export default Chain;
