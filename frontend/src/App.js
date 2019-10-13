import React, { Component } from "react";
import "./App.css";
import Header from "./header/header";
import StartScreen from "./start-screen/start-screen";
import OneWordGame from "./one-word-game/one-word-game";
import EffortAndPainGame from "./effort-and-pain-game/effort-and-pain-game";
import ThreeLittlePigsGame from "./three-little-pigs-game/three-little-pigs-game";
import FinalPage from "./final-page/final-page";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			appStatus: "start" //'start', 'OW', 'EAP', 'TLP', 'final'
		};
	}
	handleGameChange = nextGame => {
		this.setState({
			appStatus: nextGame
		});
	};
	render() {
		return (
			<>
				<Header></Header>
				{this.state.appStatus === "start" && <StartScreen onEndGame={this.handleGameChange}></StartScreen>}
				{this.state.appStatus === "OW" && (
					<OneWordGame onEndGame={this.handleGameChange} />
				)}
				{this.state.appStatus === "EAP" && (
					<EffortAndPainGame onEndGame={this.handleGameChange} />
				)}
				{this.state.appStatus === "TLP" && (
					<ThreeLittlePigsGame onEndGame={this.handleGameChange} />
				)}
				{this.state.appStatus === "final" && <FinalPage />}
			</>
		);
	}
}

export default App;
