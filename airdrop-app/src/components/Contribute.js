import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Axios from 'axios';
import contribute from '../logo/contribute.png';

import web3 from '../web3';
import ico from '../ethereum/ico';

function getParameter(parameterName){

  let parameters = new URLSearchParams (window.location.search);
  return parameters.get(parameterName);
}


class Contribute extends Component {

  state = {
    value: '',
    statusError: false,
    statusLoading: false,
    success: false,
    errorMassage: '',
    presale_referrer: '',
    txnChecker: '',
    presaleRefTokens: ''

  }

  onSubmit = async event => {
    event.preventDefault();

    let presaleReferrer;
    let presaleTokens;
    let buyingValue;
    let buyingValueToDB;
    let txnChecker;
try{
  
     let accountschk = await web3.eth.getAccounts();
   
    if(getParameter("ref")==null){
      presaleReferrer = '-';
      console.log("refAddr= "+ getParameter("ref"));
      console.log("5: "+this.state.presale_referrer);
      this.setState({presale_referrer:presaleReferrer});

    } else {
      if (getParameter("ref") !== accountschk[0]) {
      presaleReferrer = getParameter("ref");
      console.log("refAddr= "+ getParameter("ref"));
      console.log("6: "+this.state.presale_referrer);
      this.setState({presale_referrer:presaleReferrer});

      } else {
        presaleReferrer = '-';
        this.setState ({presale_referrer:presaleReferrer});
        console.log("7: "+this.state.presale_referrer);
      }

     
    }

  } catch (err) {
    console.log("Error: "+err)
  }

    try {
      this.setState({statusError: false, statusLoading:true});
      let accounts = await web3.eth.getAccounts();
      await ico.methods.buyTokens(accounts[0]).send({from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });
      this.setState({statusLoading:false, success:true});
      window.location.reload(true);
      
    } catch(err) {
      this.setState({errorMassage: "ERROR : "+ err.message, statusLoading:false, success:false, statusError:true });

      txnChecker = "fail";   
      this.setState ({txnChecker});   
     
    }

    // eslint-disable-next-line no-lone-blocks
    if(txnChecker === "fail") {
      console.log("fail");

    } else {

    let tokenBuyingAccounts = await web3.eth.getAccounts();
    buyingValue = this.state.value;
    presaleTokens = buyingValue/0.000026;
    buyingValueToDB = buyingValue * 1;
    this.setState({presaleRefTokens:presaleTokens/2});
    
    if (this.state.presale_referrer === '-') {
      this.setState({presaleRefTokens:0});
    }
    
    
    Axios.post('http://localhost:3001/api/tokenbuy', {
     pr_Address: tokenBuyingAccounts[0],
     pr_Tokens: presaleTokens,
     pr_referrer: this.state.presale_referrer,
     pr_Ref_Tokens: this.state.presaleRefTokens,
     pr_BNB_Value: buyingValueToDB
      }).then(() => {
        alert("Successful Insert");
      });
      console.log("Data Inserted");
    }

  };

  render() {
    return (
      <div>
        
        <div class="contribute"><img src={contribute} alt="Contribute_Header"/></div>
          <div class="contributeContainer">

            
            <form onSubmit= {this.onSubmit}>
              <div class="buyCoins">
                <div class="amountToBuy">Amount of BNB to Buy:</div>
                <TextField value = {this.state.value} onChange= {event => this.setState({value:event.target.value })}></TextField>
                <div> ≈ {(this.state.value / 0.000026).toFixed(2)} BHT </div>
                <div class="etherDC"> (1 BHT = 0.000026 BNB) </div>
              </div>
              <div class="buttonBuy">
                <Button class="button-33" type="submit" value="submit">Buy BHT Tokens</Button>
              </div>
            </form>

              {this.state.statusError ? (
            <div class="flex errorMessage">
              <i class="material-icons">error_outline</i>
              <div >{this.state.errorMassage}</div>
            </div>)
            : null}

               {this.state.statusLoading ? (       
            <div class="flex loadingContainer">
              <div>
                <div class="loadingText"> Waiting For Confirmation</div>
                <div class="loadTextSub">(this can take up to 30 seconds)</div>
              </div>
            <CircularProgress/>
            </div>)
            : null}

              {this.state.success ? (                  
                
            <div class="flex successfully">You Have Successfully Bought BHT Tokens!</div>)
            : null}
        </div>
      </div>

    );
  }
}

export default Contribute;
