import React, { Component } from "react";
import "./final-page.css";

class FinalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: null
        };
    }

    async componentDidMount() {
        let result = await fetch(`http://46.182.24.183:8000/sessions/abc`, {method:'GET',
            header:
                'Access-Control-Allow-Origin: *'});
        let resultAsync = await result.json();
        this.setState({info: resultAsync});
        console.log(resultAsync);
    }


    render() {
        return (
            <div className="final-page">
                <div className="game-header">End of the event</div>
                <div className="game-descr">Watch your results and send in Slack</div>

                <div className="final-panel first-fp">
                    <div className="plus-icon"></div>
                    <div className="results-panel">
                        {this.state.info !== null ? this.state.info.pigs.split('&').map((item,key) => <li key={key}>{item}</li>)  : ''
                        }
                    </div>
                </div>
                <div className="final-panel second-fp">
                    <div className="minus-icon"></div>
                    <div className="results-panel">
                        {this.state.info !== null ? this.state.info.aff_pain.split('&').map((item,key) => <li key={key}>{item}</li>) : ''
                        }
                    </div>
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