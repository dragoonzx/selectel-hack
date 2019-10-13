import React from 'react';
import './create-pin-component.css';

class CreatePinComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userPinText: '',
        }
        this.handleChangeText = this.handleChangeText.bind(this);
        this.savePins = this.savePins.bind(this);
        this.createPins = this.createPins.bind(this);
    }

    handleChangeText(event) {
        this.setState({userPinText: event.target.value});
    }

    savePins(){
        this.props.handlerSave();
        this.setState({usePinText: ''});
    }

    createPins(){
        this.setState({userPinText: ''});
        this.props.handlerCreate(this.state.userPinText);
    }

    render(){
        return (
            <div className="ep-create-pin">
                <div className="ep-create-pin__header-1">
                    1. Write your <span style={{color:'rgb(255, 240, 58'}}>opinion</span>:
                </div>
                <textarea onChange={this.handleChangeText} value={this.state.userPinText} className="pin-text-input"/>
                <div className="ep-create-pin__header-1">
                    2. Create <span style={{color: 'rgb(255, 27, 124)'}}>pin</span>:
                </div>
                <button onClick={this.createPins}  className="ep-create-pin__create-button-1">Create</button>
                <div className="ep-create-pin__header-1">
                    3. <span style={{color: 'rgb(73, 255, 78)'}}>Drag it</span> to correct position and save:
                </div>
                <button onClick={this.savePins} className="ep-create-pin__create-button-1 green-button-1">Save</button>
            </div>
        )
      }
}

export default CreatePinComponent;