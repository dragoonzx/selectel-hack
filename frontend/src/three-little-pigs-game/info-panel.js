import React, { Component } from "react";
import "./info-panel.css";

class InfoPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div className="inforamation">
                <span style={{width: '80%', display: 'inline-block'}}>{this.props.text}</span>
                {this.props.column !== 3 && <div onClick={()=>this.props.callback(this.props.text, this.props.column+1)} className="right inline">
                    {'>'}
                </div>}
                {this.props.column !== 1 && <div onClick={()=>this.props.callback(this.props.text, this.props.column-1)} className="right inline">
                    {'<'}
                </div>}
            </div>
        );
    }
}

export default InfoPanel;
