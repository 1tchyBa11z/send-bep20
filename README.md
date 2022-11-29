# send-bep20
A script that collates USDC from many accounts to a centralised wallet.


Things that you should add to the .env file.
* RPC_URL = binance chain RPC.
* PRIVATE_KEYS = this is where you add your private keys.
* RECIPIENT = The target where the transactions should end up.
* TELEGRAM_BOT = Telegram bot API KEY.
* CHAT_ID = Chat ID that your telegram bot is in.

## Build

```
yarn
```

__Never share your private keys with anyone, this equates to giving all rights over the account in question.__

__Anyone that has access to these private keys can take any funds located within that wallet, from any chain.__


## Run

```
node tx.js
