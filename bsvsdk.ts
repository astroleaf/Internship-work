import { PrivateKey, P2PKH, Transaction, ARC } from '@bsv/sdk'

const privKey = PrivateKey.fromRandom()
const WIF = privKey.toWif()
console.log("Private Key WIF format is ", WIF)
const address = privKey.toAddress()
console.log("Your bitcoin address is ", address)