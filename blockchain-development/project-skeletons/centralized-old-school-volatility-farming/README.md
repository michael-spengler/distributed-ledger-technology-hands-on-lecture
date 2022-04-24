# Centralized Volatility Farming
Until layer 2 scaling solutions like Arbitrum etc. are ready for Volatility Farming, **centralized** volatility farming seems a reasonable thing to do - exploiting manipulation induced (or at least non fundamentals based volatility) to improve price stability and the own wallet :)   

## Using bybit.com as an example 
1. Deposit e.g. 500 USDT onto your Derivatives Account (potentially exchange your other asset to USDT and transfer them to the Derivatives to start trading via USDT perpetuals)  
 
![Screenshot 2022-03-22 at 10 52 00](https://user-images.githubusercontent.com/43786652/159453810-ce74db1a-cc4b-4164-8faf-7c95bfdb00b3.png)

![Screenshot 2022-03-22 at 10 53 54](https://user-images.githubusercontent.com/43786652/159454294-5142185f-4dd4-4e90-95d0-75b2d2462137.png)

2. Generate an API Key + API Secret  
![Screenshot 2022-03-22 at 10 46 18](https://user-images.githubusercontent.com/43786652/159452800-d77d0c91-913b-4013-ac13-29c0731fd0dc.png)

![Screenshot 2022-03-22 at 10 46 01](https://user-images.githubusercontent.com/43786652/159452995-d0d9a024-41bd-4cd7-be9a-61bbdf52ce16.png)

3. start the Volatility Farming 

e.g. via 
```sh

deno run --allow-net https://github.com/michael-spengler/distributed-ledger-technology-hands-on-lecture/blob/main/blockchain-development/project-skeletons/centralized-old-school-volatility-farming/src/start-centralized-vofarming.ts <yourbybitapikey> <yourbybitapisecret> BybitConnector MartingaleReloaded VFLogger 1 20

```

or via
```sh

pm2 start -n "vofarm-classics-brave" --interpreter="deno" --interpreter-args="run --unstable --allow-net" https://github.com/michael-spengler/distributed-ledger-technology-hands-on-lecture/blob/main/blockchain-development/project-skeletons/centralized-old-school-volatility-farming/src/start-centralized-vofarming.ts -- <yourbybitapikey> <yourbybitapisecret> BybitConnector BuyLowSellHigh VFLogger 1 20

```


