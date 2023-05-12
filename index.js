// Source code to interact with smart contract

// web3 provider with fallback for old version
if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    try {
        // ask user for permission
        ethereum.enable()
        // user approved permission
    } catch (error) {
        // user rejected permission
        console.log('user rejected permission')
    }
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
    // no need to ask for permission
  }
  else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }
  console.log (window.web3.currentProvider)
  
  // contractAddress and abi are setted after contract deploy
  const CONTRACT_ABI = [{"inputs":[{"internalType":"address","name":"_beacon","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"collection","type":"address"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"string","name":"symbol","type":"string"}],"name":"CollectionCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"collection","type":"address"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"string","name":"tokenUri","type":"string"}],"name":"TokenMinted","type":"event"},{"inputs":[],"name":"beacon","outputs":[{"internalType":"contract IBeacon","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"name":"createCollection","outputs":[{"internalType":"address","name":"collection","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"collection","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"string","name":"tokenUri","type":"string"}],"name":"mintToken","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"wasCreated","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}];
  const CONTRACT_ADDRESS = '0x7B76D0B5cBD05E771ef9A1d5842D5778AFeF349d';
  
  //contract instance
  var contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  
  // Accounts
  var account;
  
  web3.eth.getAccounts(function(err, accounts) {
    if (err != null) {
      alert("Error retrieving accounts.");
      return;
    }
    if (accounts.length == 0) {
      alert("No account found! Make sure the Ethereum client is configured properly.");
      return;
    }
    account = accounts[0];
    console.log('Account: ' + account);
    web3.eth.defaultAccount = account;
  });
  
  //Smart contract functions
  function createCollection() {
    nftName = $("#nftName").val();
    nftSymbol = $("#nftSymbol").val();
    contract.methods.createCollection(nftName, nftSymbol).send( {from: account}).then( function(tx) { 
      console.log("Transaction: ", tx); 
    });
  }
  
  function mintToken() {
    nftAddress = $("#nftAddress").val();
    nftRecipient = $("#nftRecipient").val();
    nftTokenUri = $("#nftTokenUri").val();
    contract.methods.mintToken(nftAddress, nftRecipient, nftTokenUri).send( {from: account}).then( function(tx) { 
      console.log("Transaction: ", tx); 
    });
  }
  
  // web3 provider with fallback for old version
  window.addEventListener('load', async () => {
    // New web3 provider
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // ask user for permission
            await ethereum.enable();
            // user approved permission
        } catch (error) {
            // user rejected permission
            console.log('user rejected permission');
        }
    }
    // Old web3 provider
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // no need to ask for permission
    }
    // No web3 provider
    else {
        console.log('No web3 provider detected');
    }
  });