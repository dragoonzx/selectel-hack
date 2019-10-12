import React from "react";
import "./one-word-game.css";
import ModalWindow from "../components/ModalWindow";
import Sticker from "./sticker";

export default function OneWordGame() {
	const [stickers, setStickers] = React.useState([]);
	const [websocket, setWebsocket] = React.useState(
		new WebSocket("ws://46.182.24.183:3002/")
	);
	const handleStickers = stickers => {
		setStickers(stickers);
	};
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
				stickers.push(data.value);
				handleStickers(stickers);
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
	console.log(text);
	console.log(stickers);
	return (
		<div style={{ display: "flex" }}>
			<div className="ep-game">
				<div className="game-header">One Word</div>
				<div className="game-descr">One Word</div>

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
									style={{ marginLeft: "25px", marginTop: "0px" }}
									className="ep-create-pin__create-button green-button"
								>
									Post
								</button>
							</div>
						</div>
					</div>
				</ModalWindow>
				<div style={{ padding: "20px", width: "100vw" }}>
					{text !== "" && isModalOpen == false ? <Sticker text={text} /> : ""}
					{stickers !== []
						? stickers.map(value => {
								return <Sticker text={value} />;
						  })
						: " "}
				</div>
			</div>
		</div>
	);
}
