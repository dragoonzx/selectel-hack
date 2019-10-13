import React from "react";
import "./header.css";
import ModalWindow from "../components/ModalWindow";

function Header() {
	const [isSignInOpen, setOpenSignIn] = React.useState(false);
	const openSignInWindow = () => {
		setOpenSignIn(true);
	};
	const closeSignInWindow = () => {
		setOpenSignIn(false);
	};

	const [userInfo, setUserInfo] = React.useState({
		login: "",
		password: ""
	});

	const loginHandler = e => {
		setUserInfo({ ...userInfo, login: e.target.value });
	};
	const passwordHandler = e => {
		setUserInfo({
			...userInfo,
			password: e.target.value
		});
	};
	console.log(userInfo);
	return (
		<div className="app-header">
			<ModalWindow isOpen={isSignInOpen} onClose={() => closeSignInWindow()}>
				<div class="wrap">
					<div class="avatar">
						<img src={require("../test.svg")}></img>
					</div>
					<input
						type="text"
						placeholder="username"
						onChange={loginHandler}
						required
					></input>
					<div class="bar">
						<i></i>
					</div>
					<input
						type="password"
						placeholder="password"
						onChange={passwordHandler}
						required
					></input>
					<a href="" class="forgot_link">
						forgot ?
					</a>
					<button>Sign in</button>
				</div>
			</ModalWindow>
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
				<button className="right__button" onClick={() => openSignInWindow()}>
					<div className="right__button__text">SIGN IN</div>
				</button>
			</div>
		</div>
	);
}

export default Header;
