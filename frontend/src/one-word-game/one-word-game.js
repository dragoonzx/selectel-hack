import React from "react";
import "./one-word-game.css";

export default function OneWordGame() {
	const [text, setText] = React.useState("");
	const handleChangeText = e => {
		setText(e.target.value);
	};
	console.log(text);
	return (
		<div style={{ display: "flex" }}>
			<div className="post--it">
				<div className="ep-create-pin__header">
					1. Please describe the last sprint in{" "}
					<span style={{ color: "rgb(255, 240, 58" }}>one word</span>:
					<textarea
						onChange={e => handleChangeText(e)}
						className="pin-text-input"
					/>
					<button
						onClick={() => console.log("post")}
						style={{ marginLeft: "25px", marginTop: "0px" }}
						className="ep-create-pin__create-button green-button"
					>
						Post
					</button>
				</div>
			</div>
			<div className="ep-board dotted"></div>
		</div>
	);
}
