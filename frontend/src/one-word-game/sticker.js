import React from "react";
import "./sticker.css";

export default function Sticker(props) {
	return (
		<div className="sticker">
			<div className="text">{props.text}</div>
		</div>
	);
}
