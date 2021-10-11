import React, { Component } from 'react';
import Axios from 'axios';
import '../css/App.css';
import "@fontsource/quicksand";
import rewardLogo from "../logo/rewardsLogo.png";


let ad_ref_array = [];
let pr_ref_array = [];

class Leaderboard extends Component {
    state = {
        ad_referrers: '',
        ad_ref_Array: ['',''],
        pr_referrers: '',
        pr_ref_Array: ['',''],

    }

async componentDidMount(){

    try {

   Axios.get("http://localhost:3001/api/lb_ad").then((response) => {

    if(response.data !== undefined) {
  
    ad_ref_array = response.data;
    this.setState({ad_ref_Array:ad_ref_array})
      /*  (Object.keys(response.data)).forEach(element => {
         //  console.log(response.data[element].ad_Referrer);
        ad_ref_array[element] = response.data[element].ad_Referrer;
        console.log(ad_ref_array[element]);

   

        });
 */
    }
}); 

Axios.get("http://localhost:3001/api/lb_pr").then((response) => {

    if(response.data !== undefined) {
  
    pr_ref_array = response.data;
    this.setState({pr_ref_Array:pr_ref_array})
     
    }
}); 


    } catch(err) {
        console.log("Error: "+err);
    }
}
    render() {
        return (

            
<div class="leaderboardContainer">
  <div class="rewardpic">
<img src={rewardLogo} alt="rewardLogo_Header"/>
</div>
<div class="rewards">Tokens will be Disseminated Among the Top Referrers in the Leaderboard</div> 
<div class="leaderboardTitle">Presale Referrers | Top 30 </div>
<div class="leaderboard">           
<table class="content-table">
<thead>
  <tr>
    <th>Rank</th>
    <th>Address</th>
    <th>Total Tokens Gained</th>
  </tr>
</thead>

<tbody>

{this.state.pr_ref_Array.map((element) => {


  return  (
    <tr>
    <td>{element.presale_rank}</td>
    <td>{element.final_address}</td>
    <td>{element.TotalPresaleTokensRound}</td>
    </tr>);
    })}
<tr></tr>
  </tbody>
 
 

  
</table>


            </div>



<div class="leaderboardTitle">AirDrop Referrers | Top 30 </div>
<div class="leaderboard">           
<table class="content-table">
<thead>
  <tr>
    <th>Rank</th>
    <th>Address</th>
    <th>Total Tokens Gained</th>
  </tr>
</thead>

<tbody>

{this.state.ad_ref_Array.map((element) => {


  return  (
    <tr>
    <td>{element.airdrop_rank}</td>
    <td>{element.final_address}</td>
    <td>{element.TotalAirdropRefTokens}</td>
    </tr>);
    })}
<tr></tr>
  </tbody>
 
 

  
</table>


            </div>
        </div>  );
      
        }

}

export default Leaderboard;