import React, {Component} from 'react';
import './switch-component.css';

class Switch extends Component{
    render() {
        return (
            <div className="switch">
                <div onClick={() => this.props.handleClick(1)} className={this.props.active === 1 ?"switch-item switch-left switch-item-active" : "switch-item switch-left"}> House of straw </div>
                <div onClick={() => this.props.handleClick(2)} className={this.props.active === 2 ?"switch-item switch-left switch-item-active" : "switch-item switch-left"}> House of sticks </div>
                <div onClick={() => this.props.handleClick(3)} className={this.props.active === 3 ?"switch-item switch-left switch-item-active" : "switch-item switch-left"}> House of bricks </div>
            </div>
        );
    }
}

export default Switch;
