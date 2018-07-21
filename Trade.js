  var Web3 = require('web3')
  var web3 = new  Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/MyKey'))
  const Tx = require('ethereumjs-tx')
  var mongoose = require('mongoose');
  var portfolioAbi = require('./portfolio_abi.js');
  const privateKey = Buffer.from('KEY','hex')
  const admin = 'Admin';
  var portfolio_adress = 'Adress';
  var portfolio_id = 0;
  const PortfolioScheme = mongoose.Schema({});
  var fromToken = []
  var toToken = []
  var amount = []
  var contract = new web3.eth.Contract(portfolioAbi, portfolio_adress);
  mongoose.connect('connect', {useNewUrlParser: true}, (err) => err && console.log(err));
  var Portfolio = mongoose.model('portfolios', PortfolioScheme);
  const porfolio = Portfolio.findOne({ id: portfolio_id }, function(err,res){
  res.currencies.forEach(function(item, i, arr) {
     fromToken.push(fromtokenaddress)
     toToken.push(totokenadress)
     amount.push(amount)
   })
 });
   var functionAbi =  contract.methods.trade(Fromtoken,Totoken, amount).encodeABI();
   const getNonce = () => {
     return new Promise((resolve, reject) => {
       web3.eth.getTransactionCount(admin, (error, result) => {
   			console.log(result)
         if(error) reject(error);
         resolve(result);
       })
     })
   }
   const getGasPrice = () => {
     return new Promise((resolve, reject) => {
       web3.eth.getGasPrice((error, result) => {
         if(error) reject(error);
         resolve(result);
       })
     })
   }

const sendRawTransaction = (rawTx) => {
  const privateKey = "key";
  const tx = new Tx(rawTx);
  const privateKeyBuffer = Buffer.from(privateKey, 'hex');
  tx.sign(privateKeyBuffer);
  const serializedTx = tx.serialize();
  web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
      console.log('Error:', err);
      console.log('Hash:', hash);
  });
}

Promise.all([getNonce(), getGasPrice()])
  .then(values => {
    const rawTx = {
      to: portfolio_adress,
      gasLimit: web3.utils.toHex(4000000),
      nonce: web3.utils.toHex(values[0]),
      gasPrice: web3.utils.toHex(Number(values[1])),
			data: functionAbi
    };
    console.log(rawTx);
    return(rawTx);
  })
  .then(sendRawTransaction)
  .catch(e => console.log(e))
