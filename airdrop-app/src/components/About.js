import React, { Component } from 'react';
import features from '../logo/features.png';
import nftComingSoon from '../logo/NFT_ComingSoon.jpg'


class About extends Component {

  render() {
    return (
      <div>
       
        <div class="whatIs"><img src={features} alt="Features_Header"/></div>
          <div class="textAreaWhatIs flex">
            <div>
              <div class="whatIsHeader">💸 HODL & EARN</div>
              <div>Burn Hearts project is designed for 2 types of investors.
                <div>&nbsp;</div>
                <div>Type 1 : Players who love to earn money by playing NFT games.</div>
                <div>Type 2 : Investors who love to invest their money and watch the rise of the price.
                  <div>&nbsp;</div>
                </div><div>
                Because of the Burning Feature and the Buyback Mechanism the price of the token will move
                upwards slowly and steadily.</div>
                <div>&nbsp;</div>
                <div>So, the ones who <b>HODL WILL EARN</b> more and more. </div></div>
              <div class="whatIsHeader">🔥 BURNING FEATURE</div>
              <div>
              More than <b>90%</b> of the total supply will be burnt slowly and periodically by the end of May 2022.
              And besides that <b>30%</b> of the tokens that are used to play the NFT Game, will be sent to burn address
              weekly basis as we mentioned in the <b>BURN MAP</b>.
              </div>
              <div class="whatIsHeader">❤️ PLAY & EARN</div>
              <div>Play the HEARTIES NFT Game & Win massive rewards. The Game will launch by the end of <b>November 2021</b>.</div>
            </div>
            <img src={nftComingSoon} alt="NFT_ComingSoon_Header"/>
         </div>
         
      </div>
    );
  }
}

export default About;
