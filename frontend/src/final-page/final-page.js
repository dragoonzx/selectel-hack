import React, { Component } from "react";
import "./final-page.css";

class FinalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="final-page">
                <div className="game-header">End of the event</div>
                <div className="game-descr">Watch your results and send in Slack</div>


                <div className="final-panel first-fp">

                </div>
                <div className="final-panel second-fp">

                </div>
                <div className="final-panel third-fp">
                    <div className="slack-icon"></div>
                    <div className="final-button">
                        Send to Slack
                    </div>
                </div>
            </div>
        );
    }
}

export default FinalPage;