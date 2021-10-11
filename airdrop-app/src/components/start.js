import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { Player, BigPlayButton, ControlBar } from 'video-react';
import web3 from '../web3';
import Hearties from '../ethereum/ico';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import App from '../App';
import background from "../logo/fire-flame-bg.png";
import fire from "../css/App.css"
import { ThemeProvider } from '@material-ui/styles';
//import { response } from 'express';

let ref_DB;

function getParameter(parameterName){

  let parameters = new URLSearchParams (window.location.search);
  return parameters.get(parameterName);
}



class Start extends Component {

  state = {
    contributers: '',
    totalSupply: '',
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
    value: '',
    ref: '',
    txnChecker:'',
    addressList: '',
    ref_db:'',
    airDropTaken: false,
  }


  onSubmit = async event => {
    event.preventDefault();
console.log("ad1");
    let ref; 
    let txnChecker;
    try{
      let accounts = await web3.eth.getAccounts();
      if(getParameter("ref")==null){

        console.log("ad2");

        await Hearties.methods.airdrop(accounts[0]).send({from: accounts[0],
        value: web3.utils.toWei('0.00065', 'ether')

        
      });
      ref = "-";
      this.setState ({ref:ref});
      window.location.reload(true);
      }else{

        console.log("ad3");

        await Hearties.methods.airdrop(getParameter("ref")).send({from: accounts[0],
          value: web3.utils.toWei('0.00065', 'ether')
        });

        if (accounts[0] !== getParameter("ref")){
        ref = getParameter("ref");
        this.setState ({ref:ref});
        window.location.reload(true);
      
      } else {
        ref = '-';
        this.setState ({ref:ref});
        window.location.reload(true);
      }

      }
      
     

    }catch(err) {
      
      txnChecker = "fail";
      this.setState ({txnChecker:txnChecker});
      window.location.reload(true);
      console.log("refreshed in catch");

    }
    
    
    if(txnChecker === "fail"){

       console.log("fail");
    
  } else {

    let ad_tokens;
    let ad_ref_tokens;

    if(ref === "-"){
      ad_tokens = 50;
      ad_ref_tokens = 0;

    } else {

      ad_tokens = 50;
      ad_ref_tokens = 25;

    }

    let accounts2 = await web3.eth.getAccounts();

    Axios.post('http://localhost:3001/api/insert', {
    ad_Address: accounts2[0],
    ad_Referrer: this.state.ref,
    ad_Tokens: ad_tokens,
    ad_Ref_Tokens: ad_ref_tokens

      }).then(() => {
        alert("Successful Insert");
      });
      console.log("Data Inserted");


  }

  };

async componentDidMount(){


  let accountAddress = await web3.eth.getAccounts();


  Axios.post('http://localhost:3001/api/addressCheck', {
  ad_Address: accountAddress[0]
  
   }).then(() => {
     alert("Successful Insert");
   });


Axios.get("http://localhost:3001/api/get").then((response) => {
//console.log(response.data[0].ad_Address);


if(response.data[0] !== undefined){

  if (response.data[0].ad_Address === accountAddress[0]){
    let airdropTaken = true;
    this.setState({airDropTaken:airdropTaken});
  
  } 

}


});        
    
      let contributers = await Hearties.methods.allContributers().call();
      let totalSupply = await Hearties.methods.totalSupply().call();
      totalSupply = web3.utils.fromWei(totalSupply, 'ether');

      let icoEndtime = await Hearties.methods.burnHeartsIcoEnds().call();
      let timeNow = Math.round((new Date()).getTime() / 1000);
      let timeLeft = icoEndtime - timeNow;

      let date = new Date(timeLeft*1000);

      let days = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();

      this.setState({contributers, totalSupply, days, hours, minutes, seconds})

    }

  render() {
    return (
      <div>
        <div class="container">
          <div class="containerMiddle" style={{ backgroundImage: "url(/logo.png)" }} >
            <div class="header1">PLAY, HODL & EARN !</div>

            <div class="flex">
              <div class="textArea">
                <div><span>"Burn Hearts" is a well-designed hyper-deflationary token with an unique buy-back and burning features. </span></div>
{this.state.airDropTaken ? null :(
                   <div class="buttonContainer">
                   <form onSubmit= {this.onSubmit}>

                <TextField value ="0.00065" type="hidden"></TextField>
                  <div> <Button class="buttonad" type="submit" value="submit"> Claim AirDrop </Button>
                   </div> 

                   </form>
                </div>)}
              </div>
        

              <div class="movieContainer">

                <Player poster="https://blog.sodio.tech/wp-content/uploads/2018/03/ethex-is-decentralized2x.1551cb1c.png" src="https://cdn-cf-east.streamable.com/video/mp4/6cotk7.mp4?Expires=1634069100&Signature=HTldVHSXCo9guKG3dR19AZpMZRpttWCjCcMRvdaGZgc-fK4wjDfl0whM7aKeZzd6zy1Wc47S0bjoyewyMSg4ETCKUUHd5RJ9ZIGiRj75t4HK7mocpr75JjbRCezfydlQZg2QRR8CksqEGwT-qgYpAi-6w-mRckvgjHcqZo5L7E~tN581dTBDLQgWQM7bM6GNc5wHgfr5nQO13GI9pDs75EZNRg-KrMCw6tZ03mnkErM7xabMby0KJ1vATSp3BjM~MNgT2TQp~HcLtvP87UpW7~LgSjo2qrkHyl6CQna6oh~Dp3nWIwlD4XTz~TsuwaX6Odk0i9UlIaJ4HvAodRJNuA__&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ" >
                  <BigPlayButton position="center" />
                   <ControlBar autoHide={false} disableCompletely={true} />
                </Player>
              </div>
            </div>

              

            <div class="fire">
              <div class="fire-left">
                <div class="main-fire"></div>
                <div class="particle-fire"></div>
              </div>
              <div class="fire-main">
                <div class="main-fire"></div>
                <div class="particle-fire"></div>
              </div>
              <div class="fire-right">
                <div class="main-fire"></div>
                <div class="particle-fire"></div>
              </div>
              <div class="fire-bottom">
                <div class="main-fire"></div>
              </div>
            </div>




            <div class="tokenSaleContainer flex">
              <div class="tokenSaleLeftSide">
                <div class="flex space-between">
                  <div class="tokensSold"><b>TOTAL SUPPLY</b></div>
                  <div class="contributors"><b>BURN ALLOCATION</b></div>
                </div>
                <div class="flex space-between">
              
                <div class="totalSuppy">900,000,000 BHT</div>
                <div class="totalSuppy"> 90,000,000 BHT</div>
                </div>
              </div>

              <div class="tokenSaleRightSide">
                <div class="titleTokenSale">TOKEN SALE IS LIVE</div>
                <div class="tokenSaleEnds"> TOKEN SALE ENDs IN </div>
                <div class="time flex space-around">
                  <div>
                    <div class="headerTime">{this.state.days}</div>
                    <div>Days</div>
                  </div>
                  <div>
                    <div class="headerTime" >{this.state.hours}</div>
                    <div>Hours</div>
                  </div>
                  <div>
                    <div class="headerTime" >{this.state.minutes}</div>
                    <div>Min</div>
                  </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
         <div class="Icons space-around flex">
         <div class="social-menu">
          <ul>
            <li><a href="https://www.facebook.com/burnheartstoken" target="_blank"><i class="fa fa-facebook"></i></a></li>
            <li><a href="https://twitter.com/burn_hearts" target="_blank"><i class="fa fa-twitter"></i></a></li>
            <li><a href=""><i class="fa fa-telegram" target="_blank"></i></a></li>
            <li><a href=""><i class="fa fa-youtube"></i></a></li>
            <li><a href="https://www.reddit.com/r/BurnHearts/" target="_blank"><i class="fa fa-reddit-alien"></i></a></li>
          </ul>
        </div>
           </div>
      </div>

    );
  }

}

export default Start;
