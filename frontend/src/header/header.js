import React from "react";
import "./header.css";

function Header() {
	return (
		<div className="app-header">
			<h1 className="header__logo">RETROCTIVITIES</h1>
			<div className="right__rectangle">
				<button
					className="right__button"
					onClick={() => console.log("click sign in")}
				>
					<p className="right__button__text">SIGN IN</p>
				</button>
			</div>
		</div>
	);
}

export default Header;
