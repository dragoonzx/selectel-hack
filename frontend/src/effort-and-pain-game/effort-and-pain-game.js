import React from 'react';
import './effort-and-pain-game.css';
import PinBoardComponent from './pin-component/pin-component';
import CreatePinComponent from './create-pin-component/create-pin-component';
import WebSocketModule from '../modules/websocket-module';

class EffortAndPainGame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pins: [],
        }
        this.websocket = null;
        this.addUserPin = this.addUserPin.bind(this);
        this.saveUserPins = this.saveUserPins.bind(this);
        this.updatePinsLocation = this.updatePinsLocation.bind(this);
    }

    componentDidMount(){
        this.websocket = new WebSocket("ws://127.0.0.1:3001/");
        this.websocket.onopen = ()=>{
            console.log('opened');
        }
        this.websocket.onclose = ()=>{
            console.log('closed');
        }
        this.websocket.onmessage = (event)=>{
            console.log(event);
            let data = JSON.parse(event.data);
            if (data.type === 'data') {
                console.log(data);
                this.setState({pins: data.data});
            }
            console.log(this.state.pins);
        };
    }

    addUserPin(text){
        this.setState({pins: this.state.pins.concat({
          text: text,
          x: Math.random()*window.innerWidth*0.55,
          y: Math.random()*window.innerHeight*0.65,
        })});
      }

      saveUserPins(){
        this.websocket.send(JSON.stringify({data: this.state.pins}));
      }
      updatePinsLocation(location){
          let newState = this.state.pins.filter((item)=> item.text !== location.text);
          newState.push(location);
        this.setState({pins:newState});
      }

    render(){
        return (
            <div className="ep-game">
                <div className="game-header">
                    Effort and Pain
                </div>
                <div className="game-descr">
                    Effort and Pain
                </div>
                <div style={{display: "flex"}}>
                    <PinBoardComponent updateLocation={this.updatePinsLocation} pins={this.state.pins}></PinBoardComponent>
                    <CreatePinComponent handlerSave={this.saveUserPins} handlerCreate={this.addUserPin}></CreatePinComponent>
                </div>
                
            </div>
        )
      }
}

export default EffortAndPainGame;