import React, { Component } from 'react';
import './css/App.css';
import Button from '@material-ui/core/Button';
import Start from './components/start';
import About from './components/About';
import Whitepaper from './components/Whitepaper';
import Roadmap from './components/Roadmap';
import Contribute from './components/Contribute';
//import Team from './components/Team';
import scrollToComponent from 'react-scroll-to-component';
import Referral from './components/Referral';
import Web3 from 'web3';
import Hearties from './ethereum/ico';
import st from './ethereum/standardToken';
import web3 from './web3';
import Axios from 'axios';
import Leaderboard from './components/Leaderboard';
import "@fontsource/quicksand";
import logo from './logo/header-logo.png';
import { BsFillPersonFill } from "react-icons/bs";
import mybht from './logo/logo60.60.png';
//let web3;
let ref_DB;



function getParameter(parameterName){

  let parameters = new URLSearchParams (window.location.search);
  return parameters.get(parameterName);
}


class App extends Component {

  state = {
    myBalance: '',
    myEther: '',
    myAddress: '',
    referrer: '',
    accounts: '',
    ad_ref_address:''
  }

  onSubmit = async event => {
    event.preventDefault();

    // Modern DApp Browsers
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try { 
           window.ethereum.enable().then(function() {
               // User has allowed account access to DApp...
               window.location.reload(true);
               console.log("refreshed");

           });
        } catch(e) {
           // User has denied account access to DApp...
        }
     }
     // Legacy DApp Browsers
     else if (window.web3) {
         web3 = new Web3(window.web3.currentProvider);
         console.log("metamask is installed");
         window.location.reload(true);

     }
     // Non-DApp Browsers
     else {
        const provider = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/9aad89c8e515457ab8b7805f5da593ea'));
          alert('You have to install MetaMask !');
    
        web3 = new Web3(provider);
        window.location.reload(true);

       }



  }
  
  
  async componentDidMount(){



Axios.get("http://localhost:3001/api/airdropGet").then((response) => {

if (response.data[0] !== undefined){
//console.log(response.data[0].ad_Referrer);
ref_DB = response.data[0].ad_Referrer;
console.log("1");

} else {

Axios.get("http://localhost:3001/api/presaleGet").then((response) => {

if (response.data[0] !== undefined){
  //console.log(response.data[0].pr_Referrer);

    ref_DB = response.data[0].pr_Referrer;
    }else{
      console.log("2");

if (getParameter("ref") != null ) {
  ref_DB = getParameter("ref");

} else {

  ref_DB = "-";

  console.log("3");

}



} 

}); 

}

}); 

  try{
  let accounts = await web3.eth.getAccounts();
  let myBalance = await st.methods.balanceOf(accounts[0]).call();
  myBalance = web3.utils.fromWei(myBalance, 'ether');
  
  let myBalanceEther = await web3.eth.getBalance(accounts[0]);
  myBalanceEther = web3.utils.fromWei(myBalanceEther, 'ether');
  let myEther = myBalanceEther;
  
  let myAddress = await Hearties.methods.myAddress().call({from:accounts[0]});
    
  let referrer = getParameter("ref");

  console.log("4");


  //this.setState({myBalance, myEther, myAddress});
  this.setState({myBalance, myEther, myAddress, referrer, accounts});

  if(this.state.referrer === this.state.myAddress){
    referrer = null;
    this.setState({referrer});

  } 
    } catch(err){
    console.log("Error"+err);
  }

    
  }
  render() {
  // console.log(web3.version);
  // console.log(getParameter("ref"));
    return (
      <div>
        <nav>
          <a href="/" class="titleICO">
            <img src={logo} alt="BHT_Logo"/>            
          </a> 
          <div class="middleNav">
          &nbsp;&nbsp;&nbsp;<Button class="button-33" onClick={() => scrollToComponent(this.About, { offset: -70, align: 'top', duration: 1500})}>FEATURES</Button>
            &nbsp;<Button class="button-33" onClick={() => scrollToComponent(this.Whitepaper, { offset: -70, align: 'top', duration: 1500})}>HEART BEAT</Button>
            &nbsp;<Button class="button-33" onClick={() => scrollToComponent(this.Roadmap, { offset: -70, align: 'top', duration: 1500})}>BURN MAP</Button>
            &nbsp;<Button class="button-33" onClick={() => scrollToComponent(this.Contribute, { offset: -70, align: 'top', duration: 1500})}>PRESALE</Button>
            &nbsp;<Button class="button-33" onClick={() => scrollToComponent(this.Referral, { offset: -70, align: 'top', duration: 1500})}>REFERRALS</Button>         
            &nbsp;<Button class="button-33" onClick={() => scrollToComponent(this.Leaderboard, { offset: -70, align: 'top', duration: 1500})}>REWARDS</Button>         

          </div>


          <div class="rightNav">


            <i class="icon"><BsFillPersonFill/></i>

{this.state.accounts === ''?

            (<div>
            <form onSubmit= {this.onSubmit}>
            <Button class="button-33" type="submit" variant="contained" color="primary" value="Submit">Connect Wallet</Button>
            </form>
            </div>):
            
            

            (
              
              <><Button class="button-39" variant="contained" color="primary" >{this.state.myAddress.slice(0, 3) + "..." + this.state.myAddress.slice(39, 42)}</Button>
              <div class="mybht"><b>{this.state.myBalance}</b></div>
              <img src={mybht} alt="logo60.60"/></>
              
            
            
            )}
            
            


          </div>
        </nav>

        <div id="startDiv"> <Start/> </div>
        <div ref={(section) => { this.About = section; }}> <About/> </div>
        <div ref={(section) => { this.Whitepaper = section; }}> <Whitepaper/> </div>
        <div ref={(section) => { this.Roadmap = section; }}> <Roadmap/> </div>
        <div ref={(section) => { this.Contribute = section; }}> <Contribute/> </div>
        <div ref={(section) => { this.Referral = section; }}> <Referral/> </div>
        <div ref={(section) => { this.Leaderboard = section; }}> <Leaderboard/> </div>   
           
      

      </div>
    );
  }
}

export default App;
