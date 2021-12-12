import Chain from './components/Chain';
import Wallet from './components/Wallet';

const arun = new Wallet();
const bob = new Wallet();
const alice = new Wallet();

arun.sendMoney(100, bob.publicKey);
bob.sendMoney(5, alice.publicKey);
alice.sendMoney(5, arun.publicKey);

console.log(Chain.instance);
