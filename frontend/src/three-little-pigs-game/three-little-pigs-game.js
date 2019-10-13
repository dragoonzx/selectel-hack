import React, { Component } from "react";
import "./three-little-pigs-game.css";
import ModalWindow from "../components/ModalWindow";
import Switch from "./switch-component";
import InfoPanel from "./info-panel";

class ThreeLittlePigsGame extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cardText: "",
			cardType: 1,
			isModalOpen: false,
			cards: []
		};
		this.onCreateCard = this.onCreateCard.bind(this);
		this.onChangeCardText = this.onChangeCardText.bind(this);
		this.onCreateCardModal = this.onCreateCardModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleChooseType = this.handleChooseType.bind(this);
		this.updateInfoPanel = this.updateInfoPanel.bind(this);
		this.sendWebSocket = this.sendWebSocket.bind(this);
		this.endGame = this.endGame.bind(this);

		this.websocket = new WebSocket("ws://46.182.24.183:3003/");
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
				this.setState({ cards: data.value });
			}
		};
	}

	endGame = e => {
		this.props.onEndGame("final");
		this.websocket.close();
	};

	onCreateCardModal() {
		this.setState({ isModalOpen: true });
	}

	onChangeCardText(event) {
		this.setState({ cardText: event.target.value });
	}

	onCreateCard() {
		let newState = this.state.cards.concat({
			text: this.state.cardText,
			type: this.state.cardType
		});
		console.log(newState);
		this.state.cards = newState;
		this.sendWebSocket({
			text: this.state.cardText,
			type: this.state.cardType
		});
		this.state.cardText = "";
		this.state.cardType = 1;
		this.state.isModalOpen = false;
		console.log(this.state);
		this.forceUpdate();
	}

	sendWebSocket(item) {
		this.websocket.send(JSON.stringify(item));
	}

	closeModal() {
		this.setState({ isModalOpen: false });
	}

	handleChooseType(event) {
		this.setState({ cardType: event });
	}

	updateInfoPanel(text, type) {
		let newCards = this.state.cards.map(item => {
			if (item.text === text) {
				item.type = type;
			}
			return item;
		});
		this.setState({ cards: newCards });
		this.sendWebSocket({ text: text, type: type });
	}
	render() {
		return (
			<>
				<ModalWindow onClose={this.closeModal} isOpen={this.state.isModalOpen}>
					<div className="card-header" style={{ color: "white" }}>
						Create your card:
					</div>
					<Switch
						active={this.state.cardType}
						handleClick={this.handleChooseType}
					></Switch>
					<input className="card-text-input" onChange={this.onChangeCardText} />
					<div className="green-button" onClick={this.onCreateCard}>
						{" "}
						Create{" "}
					</div>
				</ModalWindow>
				<div className="tlp-game">
					<div className="game-header">Three little pigs</div>
					<div className="game-descr">
						Foster a conversation about improvements for getting our structures
						more solid.
					</div>
					<div
						onClick={this.onCreateCardModal}
						style={{ zIndex: "9999" }}
						className="add-button"
					>
						+
					</div>
					<div
						onClick={this.endGame}
						className="next-button"
						style={{ zIndex: "9999" }}
					>
						NEXT GAME
					</div>
					<div className="house house-straw inline">
						{this.state.cards
							.filter(item => item.type === 1)
							.map((item, index) => {
								return (
									<InfoPanel
										key={index}
										callback={this.updateInfoPanel}
										column={item.type}
										text={item.text}
									/>
								);
							})}
					</div>
					<div
						style={{ left: "calc(33vw + 15px)" }}
						className="vertical-divider inline"
					></div>
					<div className="house house-hut inline">
						{this.state.cards
							.filter(item => item.type === 2)
							.map((item, index) => {
								return (
									<InfoPanel
										key={index}
										callback={this.updateInfoPanel}
										column={item.type}
										text={item.text}
									/>
								);
							})}
					</div>
					<div
						style={{ left: "calc(66vw + 17px)" }}
						className="vertical-divider inline"
					></div>
					<div className="house house-stone inline">
						{this.state.cards
							.filter(item => item.type === 3)
							.map((item, index) => {
								return (
									<InfoPanel
										key={index}
										callback={this.updateInfoPanel}
										column={item.type}
										text={item.text}
									/>
								);
							})}
					</div>
				</div>
			</>
		);
	}
}

export default ThreeLittlePigsGame;
