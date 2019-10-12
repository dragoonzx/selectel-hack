import React from "react";
import "./header.css";

function Header() {
	return (
		<div className="app-header">
			<h1 className="header__logo">
				RETRO<span style={{ color: "#AAABCE" }}>CTIVITIES</span>
			</h1>
			<div className="right__rectangle">
				<button
					className="right__help__button"
					onClick={() => console.log("click help")}
				>
					<div className="right__button__text">?</div>
				</button>
				<button
					className="right__button"
					onClick={() => console.log("click sign in")}
				>
					<div className="right__button__text">SIGN IN</div>
				</button>
			</div>
		</div>
	);
}

export default Header;
