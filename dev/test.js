const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

const bc1 = {
    "chain": [
    {
    "index": 1,
    "timestamp": 1619584562021,
    "transactions": [],
    "nonce": 100,
    "hash": "0",
    "previousBlockHash": "0"
    },
    {
    "index": 2,
    "timestamp": 1619584593068,
    "transactions": [],
    "nonce": 18140,
    "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
    "previousBlockHash": "0"
    },
    {
    "index": 3,
    "timestamp": 1619584743723,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "3c888b30a7db11eb8cc92dec4d99a7dc",
    "transactionId": "4f19f630,a7db,11eb,8cc9,2dec4d99a7dc"
    },
    {
    "amount": 10,
    "sender": "UDUSFYYUWE7",
    "recipient": "CKUHSIEHIW3HEW4Y",
    "transactionId": "9d571b20,a7db,11eb,8cc9,2dec4d99a7dc"
    },
    {
    "amount": 20,
    "sender": "UDUSFYYUWE7",
    "recipient": "CKUHSIEHIW3HEW4Y",
    "transactionId": "9ffc2370,a7db,11eb,8cc9,2dec4d99a7dc"
    },
    {
    "amount": 30,
    "sender": "UDUSFYYUWE7",
    "recipient": "CKUHSIEHIW3HEW4Y",
    "transactionId": "a338b0d0,a7db,11eb,8cc9,2dec4d99a7dc"
    }
    ],
    "nonce": 70427,
    "hash": "0000536c2433a51e9f36bc41a8adc99bd23cbcf3f4a2eaca0120c9f1772bcf4e",
    "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
    },
    {
    "index": 4,
    "timestamp": 1619584798262,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "3c888b30a7db11eb8cc92dec4d99a7dc",
    "transactionId": "a8e1d160,a7db,11eb,8cc9,2dec4d99a7dc"
    },
    {
    "amount": 40,
    "sender": "UDUSFYYUWE7",
    "recipient": "CKUHSIEHIW3HEW4Y",
    "transactionId": "bd115c00,a7db,11eb,8cc9,2dec4d99a7dc"
    },
    {
    "amount": 50,
    "sender": "UDUSFYYUWE7",
    "recipient": "CKUHSIEHIW3HEW4Y",
    "transactionId": "bf399330,a7db,11eb,8cc9,2dec4d99a7dc"
    },
    {
    "amount": 60,
    "sender": "UDUSFYYUWE7",
    "recipient": "CKUHSIEHIW3HEW4Y",
    "transactionId": "c1322ee0,a7db,11eb,8cc9,2dec4d99a7dc"
    },
    {
    "amount": 70,
    "sender": "UDUSFYYUWE7",
    "recipient": "CKUHSIEHIW3HEW4Y",
    "transactionId": "c3a1f660,a7db,11eb,8cc9,2dec4d99a7dc"
    }
    ],
    "nonce": 38775,
    "hash": "00007115a4273ccdcc9ef651218a80ab32352c56cbc300b7212ec01bbd7c1ac8",
    "previousBlockHash": "0000536c2433a51e9f36bc41a8adc99bd23cbcf3f4a2eaca0120c9f1772bcf4e"
    },
    {
    "index": 5,
    "timestamp": 1619584831963,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "3c888b30a7db11eb8cc92dec4d99a7dc",
    "transactionId": "c9588470,a7db,11eb,8cc9,2dec4d99a7dc"
    }
    ],
    "nonce": 27482,
    "hash": "000062b327dc3202a5815b116dd02b208030b5583503b919664280d30243a464",
    "previousBlockHash": "00007115a4273ccdcc9ef651218a80ab32352c56cbc300b7212ec01bbd7c1ac8"
    },
    {
    "index": 6,
    "timestamp": 1619584836644,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "3c888b30a7db11eb8cc92dec4d99a7dc",
    "transactionId": "dd6fa510,a7db,11eb,8cc9,2dec4d99a7dc"
    }
    ],
    "nonce": 16808,
    "hash": "0000e08c88914fdf5358eb4af9c79b08693ee24bb7ad6019ad8b0d1e7b7d75fa",
    "previousBlockHash": "000062b327dc3202a5815b116dd02b208030b5583503b919664280d30243a464"
    }
    ],
    "pendingTransactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "3c888b30a7db11eb8cc92dec4d99a7dc",
    "transactionId": "e0399a80,a7db,11eb,8cc9,2dec4d99a7dc"
    }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
    }
console.log(bitcoin.chainIsValid(bc1.chain));