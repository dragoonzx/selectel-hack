import React from "react";
import "./header.css";
import ModalWindow from "../components/ModalWindow";

function Header(props) {
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
	const [isHelpActive, setHelpActive] = React.useState(false);
	const helpHandler = () => {
		setHelpActive(true);
	};
	const closeHelp = () => {
		setHelpActive(false);
	};

	const [helpWindow, setHelpWindow] = React.useState({
		helpWindowHeader: "",
		helpWindowBody: ""
	});
	const passwordCheck = async () => {
		let result = await fetch(
			`http://46.182.24.183:8000/user/${userInfo.login}/${userInfo.password}`,
			{ method: "GET", header: "Access-Control-Allow-Origin: *" }
		);
		let resultAsync = await result.json();
		console.log(resultAsync);
		if (!resultAsync.detail && resultAsync !== false) {
			setUserName(resultAsync);
			closeSignInWindow();
		} else {
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
			<ModalWindow isOpen={isHelpActive} onClose={() => closeHelp()}>
				{props.status === "EAP" && (
					<>
						<h2 style={{ color: "var(--light-color)" }}>Effort and Pain</h2>
						<div style={{ color: "white" }}>
							1. Instruct the participants to place the post-its in relation of
							each comparatively (e.g. this one requires higher effort that that
							other one, and is causing less pain). <br></br>2. Look for the
							items with high return (high pain, low effort). <br></br>This
							activity is inspired on Fabio Pereira post on Technical Debt Wall
							Retrospective. It is very effective for filtering out the items,
							prioritizing on the ones with higher return.
						</div>
					</>
				)}
				{props.status === "OW" && (
					<>
						<h2 style={{ color: "var(--light-color)" }}>One Word Game</h2>
						<div style={{ color: "white" }}>
							The One Word is a simple check in activity that allows the
							participants to share their feelings before getting into the data
							and details for the meeting itself. It is a good opening for a
							meeting as it acknowledge people feelings and get them speaking
							from the very beginning.
						</div>
					</>
				)}
				{props.status === "TLP" && (
					<>
						<h2 style={{ color: "var(--light-color)" }}>Three Little Pigs</h2>
						<div style={{ color: "white" }}>
							Draw and explain the participants the 3 columns:<br></br>
							<ul>
								<li>
									House of straw – what do we do that just about hangs together,
									but could topple over at any minute? (e.g. “our deployment
									script is very manual, and prone to error – we could break
									production very easily”)
								</li>
								<br />
								<li>
									House of sticks – what do we do that is pretty solid, but
									could be improved? (e.g. “our automated tests are pretty good,
									but sometime they fail for no reason, and we have to run them,
									which is a pain”)
								</li>
								<br />
								<li>
									House of bricks – what do we do that is rock solid? (e.g. “our
									automated deployment and cutover has never failed. It rocks”)
								</li>
							</ul>
						</div>
					</>
				)}
			</ModalWindow>
			<h1 className="header__logo">
				RETRO<span style={{ color: "#AAABCE" }}>CTIVITIES</span>
			</h1>
			<div className="right__rectangle">
				<button className="right__help__button" onClick={() => helpHandler()}>
					<div className="right__button__text">?</div>
				</button>
				{userName === null ? (
					<button className="right__button" onClick={() => openSignInWindow()}>
						<div className="right__button__text">SIGN IN</div>
					</button>
				) : (
					<div className="right_text">{userName}</div>
				)}
			</div>
		</div>
	);
}

export default Header;
