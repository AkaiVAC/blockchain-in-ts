import * as crypto from 'crypto';
import Chain from './Chain';
import Transaction from './Transaction';

class Wallet {
    public publicKey: string;
    private privateKey: string;

    constructor() {
        const keypair = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            },
        });

        this.publicKey = keypair.publicKey;
        this.privateKey = keypair.privateKey;
    }

    sendMoney(amount: number, payeePublicKey: string): void {
        const transaction = new Transaction(
            amount,
            this.publicKey,
            payeePublicKey
        );

        const pen = crypto.createSign('SHA256');
        pen.update(transaction.toString()).end();

        const signature = pen.sign(this.privateKey);

        Chain.instance.addBlock(transaction, this.publicKey, signature);
    }
}

export default Wallet;
