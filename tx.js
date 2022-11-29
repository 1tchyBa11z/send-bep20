const axios = require('axios');
const fs = require('fs');
const path = require('path');
const Web3 = require('web3')
const math = require('mathjs');

require('dotenv').config()

const P =  process.env.PRIVATE_KEYS.split(",") ;

// Telegraf bot API KEY
const botAPI = process.env.TELEGRAM_BOT

//Chat_ID
const botChat = process.env.CHAT_ID;

//Recipeint Wallet Address
const recipient = process.env.RECIPIENT;

// Telegram Bot sendMessage function
async function sendMessage(chatId, message) {
  axios.get(encodeURI('https://api.telegram.org/bot' + botAPI + '/sendMessage?chat_id=' + botChat + '&text=' + message + '&parse_mode=HTML')).then(response => {
  }).catch(error => {
    console.log(error);
  });
}

//WEB3 Config
const web3 = new Web3(process.env.RPC_URL);
//10 mins in milliseconds;
const POLLING_INTERVAL = 720000;
let i = 0;

//Wallet shortener function
function shortId(str, size) {
  return str.substr(0, 6) + '...' + str.substr(36,42);
}
console.log("  ██████ ▓█████  ███▄    █ ▓█████▄    ▄▄▄█████▓▒██   ██▒");
console.log("▒██    ▒ ▓█   ▀  ██ ▀█   █ ▒██▀ ██▌   ▓  ██▒ ▓▒▒▒ █ █ ▒░");
console.log("░ ▓██▄   ▒███   ▓██  ▀█ ██▒░██   █▌   ▒ ▓██░ ▒░░░  █   ░");
console.log("  ▒   ██▒▒▓█  ▄ ▓██▒  ▐▌██▒░▓█▄   ▌   ░ ▓██▓ ░  ░ █ █ ▒ ");
console.log("▒██████▒▒░▒████▒▒██░   ▓██░░▒████▓      ▒██▒ ░ ▒██▒ ▒██▒");
console.log("▒ ▒▓▒ ▒ ░░░ ▒░ ░░ ▒░   ▒ ▒  ▒▒▓  ▒      ▒ ░░   ▒▒ ░ ░▓ ░");
console.log("░ ░▒  ░ ░ ░ ░  ░░ ░░   ░ ▒░ ░ ▒  ▒        ░    ░░   ░▒ ░");
console.log("░  ░  ░     ░      ░   ░ ░  ░ ░  ░      ░       ░    ░  ");
console.log("      ░     ░  ░         ░    ░                 ░    ░  ");
console.log("USDC Transfer to wallet\n");

console.log(`Polling time: ${POLLING_INTERVAL / 60000} minutes`);

//USDC ABI
const USDC_BEP20_ABI = [
{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"mintable","type":"bool"},{"internalType":"address","name":"owner","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mintable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}
]


//Contract address
const USDCAddress = "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";

//Contract objects
const contract = new web3.eth.Contract(USDC_BEP20_ABI, USDCAddress);

// Loop through private keys
P.forEach(element => {
  let currently_compounding = false;
  var wallet = web3.eth.accounts.wallet.add(P[i]);

  //              console.log(wallet);
  async function checkRollAvailability(){
    if(currently_compounding) return
    try {
      txDatShit()
    } catch (err){
      console.log(`Didn't Transfer any USDC (${err.message}, ${shortId(wallet.address)})`)
      return
    }
  }

  async function txDatShit(){
    try{

      var balance = await contract.methods.balanceOf(wallet.address).call();
      var gasPrice = await web3.eth.getGasPrice();
      var block = await web3.eth.getBlock("latest");
      var gasLimit = math.floor(block.gasLimit/block.transactions.length);

      // compound daily rate of rewards for once daily
      if (balance >= 10e18) {
        console.log('Starting TX...');
        console.log(`TX: ${web3.utils.fromWei(balance.toString(),'ether')} USDC!, ${shortId(wallet.address)}`);
        const tx = await contract.methods.transfer(recipient, balance).send({
          from: wallet.address,
          gas: gasLimit,
          gasPrice: gasPrice
        });
        console.log(`TX status: ${tx.status}, ${shortId(wallet.address)}`);
        sendMessage(botChat, `TX: ${tx.status}, ${shortId(wallet.address)}, ${web3.utils.fromWei(balance.toString(), 'ether')} USDC!`); //COMMENT THIS OUT IF YOU DON't USE TELEGRAM BOTS
        currently_compounding = true;
        setTimeout(() => 10000);
      }
    } catch (err){
      currently_compounding = false;
      console.log(`TX error ${err.message}, ${shortId(wallet.address)}`)
      return
    }
    currently_compounding = false
  }

  checkRollAvailability()
  setInterval(async () => { await checkRollAvailability() }, POLLING_INTERVAL)
  i++
});
