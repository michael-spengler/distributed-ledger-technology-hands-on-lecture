# Node Operations


## Ethereum Mainnet
You might want to start by downloading [geth](https://geth.ethereum.org/downloads/).  
You might want to explore the [go-ethereum repository](https://github.com/ethereum/go-ethereum)

```sh 

geth --snapshot=false --mainnet --syncmode "full" --datadir=/home/master/Desktop/ethereum --port 30302 --http --http.addr localhost --http.port 8545 --ws --ws.port 8546 --ws.api personal,eth,net,web3 --http.api personal,eth,net,web3

```

After your node is ready to go (might take many hours), you can start interacting with it - e.g. by linking to your own node via the provider URL from an [off-chain program](https://deno.land/x/web3@v0.11.0#get-balance).


## Ethereum Arbitrum


## Ethereum Ropsten
https://erickhun.com/posts/setup-your-ethereum-node-geth-ropsten-test-network/



## IPFS
