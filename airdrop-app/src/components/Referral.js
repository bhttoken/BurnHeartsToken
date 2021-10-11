import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import referrals from '../logo/referrals.png';

import web3 from '../web3';
import Hearties from '../ethereum/ico';
  

class Referral extends Component {
    state = {
        myAddress: '',
        refLink: '',
        myRefTokens: '',
        myRefRank: '' ,
        myAdRefTokens: '',
        myAdRefRank: ''       
      }

      onSubmit = async event => {
        event.preventDefault();
    
       
                /* Get the text field */
            var copyText = document.getElementById("myInput");
            //var username = document.getElementById("userName");

                /* Select the text field */
            copyText.select();
            copyText.setSelectionRange(0, 99999); /* For mobile devices */

                /* Copy the text inside the text field */
            navigator.clipboard.writeText(copyText.value);

                /* Alert the copied text */
            alert("Copied the text: " + copyText.value);



            /*Axios.post('http://localhost:3001/api/ref', {
            
              ref_Address: this.state.myAddress,
              //ref_Name: username.value
          
          
          
          }).then(() => {
              alert("Successful Insert");
            });
            console.log("Data Inserted");*/
      
                              
            
         
}     

     
async componentDidMount(){


    let accounts = await web3.eth.getAccounts();
    let myAddress = await Hearties.methods.myAddress().call({from:accounts[0]});
    let url = "http://localhost:3000/?ref=";
    let refLink = url.concat(myAddress);
    this.setState({myAddress, refLink});


     Axios.get("http://localhost:3001/api/my_pr_ref").then((response) => {
//console.log(response.data[0].ad_Address);


if(response.data[0] !== undefined){

  if (response.data[0].pr_referrer === accounts[0]){
   this.setState({myRefTokens:response.data[0].TotalPresaleTokensRound, myRefRank:response.data[0].presale_rank});
  } 

} else {

  this.setState({myRefTokens:'-', myRefRank:'-'});
}


});


Axios.get("http://localhost:3001/api/my_ad_ref").then((response) => {
//console.log(response.data[0].ad_Address);


if(response.data[0] !== undefined){

  if (response.data[0].ad_Referrer === accounts[0]){
   this.setState({myRefTokens:response.data[0].TotalAirdropTokensRound, myRefRank:response.data[0].presale_rank});
  } 

} else {

  this.setState({myAdRefTokens:'-', myAdRefRank:'-'});
}


}); 


}

render() {
    return (
        <div>
        <div class="contribute"><img src={referrals} alt="Referrals_Header"/></div>
          
          <div class="refcontributeContainer">

          <div>
            <form onSubmit= {this.onSubmit}>
              <div class="refbuyCoins">
                <div class="refamountToBuy">Your Referral Link:</div>
                <TextField value ={this.state.refLink} id="myInput"></TextField>
              </div>
                
                <div class="buttonBuy">
                  <Button class="button-33" type="submit" value="submit">Copy Referral Address</Button>
                </div>
             
            </form>
          </div>
                      

        </div>

      <table class="refcontainerfull">
        <tr>
        <td><div class="refcontainer2">
        <div><b>❤️ My Presale Referral Tokens :</b>&nbsp;</div>
              <div>{this.state.myRefTokens}</div>

              <div>

              <div><b>🏆 My Rank</b>&nbsp;</div>
              <div class="circle">{this.state.myRefRank}</div>
              </div>
          
          </div></td>
        <td><div class="refcontainer3">
        <div><b>❤️ My Airdrop Referral Tokens :</b>&nbsp;</div>
              <div>{this.state.myAdRefTokens}</div>

              <div>

              <div><b>🏆 My Rank</b>&nbsp;</div>
              <div class="circle">{this.state.myAdRefRank}</div>
              </div>
          
          
          </div></td>

        </tr>



      </table>
      </div>
    ); 
}
}

export default Referral;