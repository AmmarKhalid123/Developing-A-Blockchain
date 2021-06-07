var express = require('express');
const Blockchain = require('./blockchain');
const { v1: uuid } = require('uuid');
const port = process.argv[2];
const rp = require('request-promise');
const e = require('express');

const nodeAddress = uuid().split('-').join('');

var app = express();

const bitcoin = new Blockchain();

app.use(express.json());

app.get('/blockchain', function(req, res){
    res.send(bitcoin);
})

app.post('/transaction', (req, res) => {
    const newTranasaction = req.body;
    const blockIndex = bitcoin.addTransactionToPendingTransaction(newTranasaction);
    res.json({note: `Transaction will be added to block number ${blockIndex}.`});
})

app.post('/transaction/broadcast', (req, res) => {
    const newTranasaction = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    bitcoin.addTransactionToPendingTransaction(newTranasaction);
    const reqPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/transaction',
            method: 'POST',
            body: newTranasaction,
            json: true
        };
        reqPromises.push(rp(requestOptions));
    });
    Promise.all(reqPromises)
    .then(data => {
        res.json({note: 'Transaction created and broadcasted successfully!'});
    });
})

app.get('/mine', (req, res) => {
    const lastBlock = bitcoin.getLastBlock();
    const lastBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    };
    const nonce = bitcoin.proofOfWork(lastBlockHash, currentBlockData);
    const blockHash = bitcoin.hashBlock(lastBlockHash, currentBlockData, nonce);

    bitcoin.createNewTransaction(12.5, "00", nodeAddress);

    const newBlock = bitcoin.createNewBlock(nonce, lastBlockHash, blockHash);
    const reqPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/recieve-new-block',
            method: 'POST',
            body: { newBlock: newBlock },
            json: true
        };
        reqPromises.push(rp(requestOptions));
    })
    Promise.all(reqPromises)
    .then(data => {
        const requestOptions = {
            uri: bitcoin.currentNodeUrl + '/transaction/broadcast',
            method: 'POST',
            body: {
                amount: 12.5,
                sender: "00",
                recipient: nodeAddress
            },
            json: true
        }
        return rp(requestOptions);
    })
    .then(data => {
        res.json({note: 'New Block Mined Successfully!', block: newBlock});
    })
})

app.post('/recieve-new-block', (req, res) => {
    const newBlock = req.body.newBlock;
    const lastBlock = bitcoin.getLastBlock();
    const correctHash = lastBlock.hash === newBlock.previousBlockHash
    const correctIndex = lastBlock['index'] + 1 === newBlock['index'];
    if (correctHash && correctIndex){
        bitcoin.chain.push(newBlock);
        bitcoin.pendingTransactions = [];
        res.json({note: 'New Block Recieved and accepted!', newBlock});
    }
    else {
        res.json({note: 'New Block Rejected', newBlock});
    }
})

//register a node and broadcast it to the network
app.post('/register-and-broadcast-node', (req, res) => {
    const newNodeUrl = req.body.newNodeUrl;
    if (bitcoin.networkNodes.indexOf(newNodeUrl) === -1){
        bitcoin.networkNodes.push(newNodeUrl);
    }
    const registerNodePromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/register-node',
            method: 'POST',
            body: {newNodeUrl: newNodeUrl},
            json: true
        };

        registerNodePromises.push(rp(requestOptions));
    })
    Promise.all(registerNodePromises)
    .then(data => {
        const bulkRegisterOptions = {
            uri: newNodeUrl + '/register-nodes-bulk',
            method: 'POST',
            body: { allNetworkNodes: [ ...bitcoin.networkNodes, bitcoin.currentNodeUrl ]},
            json: true
        }
        return rp(bulkRegisterOptions);
    })
    .then(data => {
        console.log(data)
        console.log(bitcoin);
        res.json({note: 'New Node registered with networks successfully!'})
    });
})


app.post('/register-node', (req, res) => {
    const newNodeUrl = req.body.newNodeUrl;
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) === -1;
    const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
    if (nodeNotAlreadyPresent && notCurrentNode){
        bitcoin.networkNodes.push(newNodeUrl);
    }
    res.json({note: 'New Node registered successfully with node'})
});

app.post('/register-nodes-bulk', (req, res) => {
    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl => {
        const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) === -1;
        const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
        if (nodeNotAlreadyPresent && notCurrentNode){
            bitcoin.networkNodes.push(networkNodeUrl);
        }
    })
    res.json({note: 'Bulk registeration successful!'})
})


app.get('/consensus', (req, res) => {
    const requestPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/blockchain',
            method: 'GET',
            json: true
        };
        requestPromises.push(rp(requestOptions));
    });

    Promise.all(requestPromises)
    .then(blockchains => {
        const currentChainLength = bitcoin.chain.length;
        let maxChainLength = bitcoin.chain.length;
        let newLongestChain = null;
        let newPendingTransactions = null;

        blockchains.forEach(blockchain => {
            if (blockchain.chain.length > maxChainLength){
                maxChainLength = blockchain.chain.length;
                newLongestChain = blockchain.chain;
                newPendingTransactions = blockchain.pendingTransactions;
            }
        });
        if (!newLongestChain || (newLongestChain && !bitcoin.chainIsValid(newLongestChain))){
            res.json({
                note: 'Current chain has not been replaced!',
                chain: bitcoin.chain
            });
        }
        else{
            bitcoin.chain = newLongestChain;
            bitcoin.pendingTransactions = newPendingTransactions;
            res.json({
                note: 'This chain has been replaced',
                chain: bitcoin.chain
            })
        }
    });
})

app.get('/block/:blockHash', (req, res) => {
    const blockHash = req.params.blockHash;
    const correctBlock = bitcoin.getBlock(blockHash);
    res.json({
        block: correctBlock
    });
})

app.get('/transaction/:transactionId', (req, res) => {
    const transactionId = req.params.transactionId;
    const transactionData = bitcoin.getTransaction(transactionId);
    res.json({
        block: transactionData.block,
        transaction: transactionData.transaction
    });
})

app.get('/address/:address', (req, res) => {
    const address = req.params.address;
    const addressData = bitcoin.getAddressData(address);
    res.json({
        addressData
    });
})

app.get('/block-explorer', (req, res) => {
    res.sendFile('./block-explorer/index.html', {root: __dirname})
})


app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});