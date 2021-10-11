import Web3 from 'web3';

let web3;


// Modern DApp Browsers
if (window.ethereum) {
   web3 = new Web3(window.ethereum);
   try { 
      window.ethereum.enable().then(function() {
          // User has allowed account access to DApp...
         
      });
   } catch(e) {
      // User has denied account access to DApp...
      
   }
}
// Legacy DApp Browsers
else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
    console.log("metamask is installed");
}
// Non-DApp Browsers
else {
   const provider = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/9aad89c8e515457ab8b7805f5da593ea'));
     alert('You have to install MetaMask !');

   web3 = new Web3(provider);
   window.location.reload(true);
  }
        
    
 


export default web3;