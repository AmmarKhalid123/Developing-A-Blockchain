# Developing-A-Blockchain

This was a course project I did while learning the basics of core functionality of blockchain in "Learn Blockchain By Building Your Own In JavaScript" course by Eric Traub.

## Summary
The project consist of three parts:

### Core Blockchain
Written in JavaScript language, it contains the following functionalities:
- Mining a block with consensus algorithm
- Maintaining record of all nodes connected
- Registering New Nodes
- Creating New Transactions
- Verifying the chains using Longest Chain Rule

### API/Endpoints
- To mine a new block by a specific node
- Retrieving whole blockchain, a block by its hash, transaction by its ID, address' transaction history using address
- Register a node to the system by updating the blockchain data
- Broadcasting updates to the whole network

### Block Explorer (FrontEnd):
- Retrieve block details by providing block hash
- Retrieve transaction details by providing transaction id
- Retrieve address transaction history by providing address 

## Usage

### Initializing
After cloning the repository, run "npm install" inside the folder. After installation of packages is complete, run:

- npm run node_1 ( To start first node, will run at localhost:3001 )
- npm run node_2 ( To start second node, will run at localhost:3002 )
- npm run node_3 ( To start third node, will run at localhost:3003 )
- npm run node_4 ( To start forth node, will run at localhost:3004 )
- npm run node_5 ( To start fifth node, will run at localhost:3005 )

### Endpoints:

- /mine
  body: {}
- /register-and-broadcast-node
  body: {newNodeUrl: 'url of the node to be registered in the network'}
- /block/:blockhash
  body: {}
- /transaction/:transactionId
  body: {}
- /address/address
  body: {}
