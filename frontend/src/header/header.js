import React from "react";
import "./header.css";
import ModalWindow from "../components/ModalWindow";

function Header() {
	const [isSignInOpen, setOpenSignIn] = React.useState(false);
	const openSignInWindow = () => {
		setOpenSignIn(true);
	};
	const [userName, setUserName] = React.useState(null);

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
	const passwordCheck = async () => {
		let result = await fetch(`http://46.182.24.183:8000/user/${userInfo.login}/${userInfo.password}`, {method:'GET',
		header:
		'Access-Control-Allow-Origin: *'});
		let resultAsync = await result.json();
		console.log(resultAsync);
		if (!resultAsync.detail && resultAsync !== false){
			setUserName(resultAsync);
			closeSignInWindow();
		}else{

		}
		console.log(resultAsync);
	};
	console.log(userInfo);
	return (
		<div className="app-header">
			<ModalWindow isOpen={isSignInOpen} onClose={() => closeSignInWindow()}>
				<div className="wrap">
					<div className="avatar">
						<img src={require("../test.svg")}></img>
					</div>
					<input
						type="text"
						placeholder="username"
						onChange={loginHandler}
						required
					></input>
					<div className="bar">
						<i></i>
					</div>
					<input
						type="password"
						placeholder="password"
						onChange={passwordHandler}
						required
					></input>
					<a href="" className="forgot_link">
						forgot ?
					</a>
					<button onClick={passwordCheck}>Sign in</button>
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
				{userName === null ? <button className="right__button" onClick={() => openSignInWindow()}>
					<div className="right__button__text">SIGN IN</div>
				</button>: <div className="right_text">{userName}</div>}
			</div>
		</div>
	);
}

export default Header;
