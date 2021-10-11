import React, {Component} from "react";
import roadmap from '../logo/roadmap.png';
import burnmap from '../logo/roadmap-Recovered.jpg'


class Roadmap extends Component {
    render(){
        return(
            <div>
                <div class="roadmap"><img src={roadmap} alt="Roadmap_Header"/></div>
                <div class="roadmapImage">
                    <img src={burnmap} alt="roadmap-Recovered_Header"/>
                </div>
            </div>
        );
    }
}
export default Roadmap;