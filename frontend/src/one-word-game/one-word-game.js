import React from "react";
import "./one-word-game.css";
import ModalWindow from "../components/ModalWindow";
import Sticker from "./sticker";

export default function OneWordGame(props) {
	const [stickers, setStickers] = React.useState([]);
	const [websocket, setWebsocket] = React.useState(
		new WebSocket("ws://46.182.24.183:3002/")
	);
	React.useEffect(() => {
		websocket.onopen = () => {
			console.log("opened");
		};
		websocket.onclose = () => {
			console.log("closed");
		};
		websocket.onmessage = event => {
			console.log("MESSAGE SOCKET");
			let data = JSON.parse(event.data);
			console.log(data);
			if (data.type === "data" && data.value !== "empty") {
				console.log("UPDATING GAMEBOARD");
				setStickers(stickers => [...stickers, data.value]);
				console.log(stickers);
			}
		};
	}, []);

	const [text, setText] = React.useState("");
	const handleChangeText = e => {
		setText(e.target.value);
	};

	const [isModalOpen, toggleModal] = React.useState(true);
	const openModal = () => {
		toggleModal(true);
	};
	const closeModal = () => {
		websocket.send(JSON.stringify({ data: text }));
		toggleModal(false);
	};
	return (
		<div style={{ display: "flex" }}>
			<div className="ep-game">
				<div className="game-header">One Word</div>
				<div className="game-descr">One Word</div>
				<div onClick={() => props.onEndGame("EAP")} className="next-button">
					NEXT GAME
				</div>
				<ModalWindow isOpen={isModalOpen} onClose={closeModal}>
					<div className="post--it">
						<div className="ep-create-pin__header">
							1. Please describe the last sprint in{" "}
							<span style={{ color: "rgb(255, 240, 58" }}>one word:</span>
							<div style={{ display: "flex", alignItems: "center" }}>
								<textarea
									onChange={e => handleChangeText(e)}
									className="pin-text-input"
								/>
								<button
									onClick={closeModal}
									style={{ marginLeft: "15px", marginTop: "0px" }}
									className="ep-create-pin__create-button-2 green-button-2"
								>
									Post
								</button>
							</div>
						</div>
					</div>
				</ModalWindow>
				<div style={{ padding: "20px", width: "100vw" }}>
					{stickers !== []
						? stickers.map((value, index) => {
								return <Sticker key={index} text={value} />;
						  })
						: " "}
				</div>
			</div>
		</div>
	);
}
