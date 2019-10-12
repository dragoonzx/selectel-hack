import React from "react";
import "./modal.css";

export default function ModalWindow(props) {
	if (props.isOpen === false) return null;
	const close = e => {
		if (props.onClose) {
			props.onClose();
		}
	};
	return (
		<div>
			<div className="modal">{props.children}</div>
			<div className="bg" onClick={e => close(e)} />
		</div>
	);
}
