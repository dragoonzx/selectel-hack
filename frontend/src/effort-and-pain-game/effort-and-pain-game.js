import React from "react";
import "./effort-and-pain-game.css";
import PinBoardComponent from "./pin-component/pin-component";
import CreatePinComponent from "./create-pin-component/create-pin-component";

class EffortAndPainGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pins: []
		};
		this.websocket = null;
		this.addUserPin = this.addUserPin.bind(this);
		this.saveUserPins = this.saveUserPins.bind(this);
		this.updatePinsLocation = this.updatePinsLocation.bind(this);
	}

	componentDidMount() {
		this.websocket = new WebSocket("ws://46.182.24.183:3001/");
		this.websocket.onopen = () => {
			console.log("opened");
		};
		this.websocket.onclose = () => {
			console.log("closed");
		};
		this.websocket.onmessage = event => {
			console.log("MESSAGE SOCKET");
			let data = JSON.parse(event.data);
			console.log(data);
			if (data.type === "data" && data.value !== "empty") {
				console.log("UPDATE PINS");
				data.value.map(pin => this.updatePin(pin));
				console.log(this.state.pins);
			}
		};
	}

	updatePin(element) {
		let itemId = this.state.pins.find(item => item.text == element.text);
		let newStatePins = Array.from(this.state.pins);
		if (itemId === undefined) {
			newStatePins.push(element);
		} else {
			newStatePins[newStatePins.indexOf(itemId)] = element;
		}
		this.updatePinsState(Array.from(newStatePins.map((item) => {
			item.x = item.x/window.innerWidth;
			item.y = item.y/window.innerHeight;
			return item;
		})));
		console.log(this.state.pins);
	}

	updatePinsState(newState) {
		this.setState({ pins: newState });
		this.forceUpdate();
	}

	addUserPin(text) {
		let a = this.state.pins.concat({
			text: text,
			x: Math.random() * window.innerWidth * 0.55,
			y: Math.random() * window.innerHeight * 0.65
		});
		a.sort((a, b) => a.text - b.text);
		console.log(a);
		this.setState({ pins: a });
	}

	saveUserPins() {
		console.log("SEND SOCKET");
		console.log(this.state.pins);
		this.websocket.send(JSON.stringify({ data: this.state.pins.map((item)=>{
				item.x = item.x*window.innerWidth;
				item.y = item.y*window.innerHeight;
				return item;
			}) }));
	}

	updatePinsLocation(location) {
		let newState = this.state.pins.filter(item => item.text !== location.text);
		newState.push(location);
		newState.sort((a, b) => a.text - b.text);
		this.setState({ pins: newState });
	}

	render() {
		return (
			<div className="ep-game">
				<div className="game-header">Effort and Pain</div>
				<div className="game-descr">Effort and Pain</div>
				<div
					onClick={() => this.props.onEndGame("TLP")}
					className="next-button"
				>
					NEXT GAME
				</div>
				<div style={{ display: "flex" }}>
					<PinBoardComponent
						updateLocation={this.updatePinsLocation}
						pins={this.state.pins}
					></PinBoardComponent>
					<CreatePinComponent
						handlerSave={this.saveUserPins}
						handlerCreate={this.addUserPin}
					></CreatePinComponent>
				</div>
			</div>
		);
	}
}

export default EffortAndPainGame;
