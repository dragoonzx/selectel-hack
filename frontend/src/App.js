import React , {Component} from 'react';
import './App.css';
import Header from './header/header'
import StartScreen from "./start-screen/start-screen";
import OneWordGame from "./one-word-game/one-word-game";

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            appStatus: 'OW' //'OW', 'EAP', 'TLP'
        }
    }
    render() {
        return (
            <>
                <Header></Header>
                {this.state.appStatus === 'start' && <StartScreen></StartScreen>}
                {this.state.appStatus === 'OW' && <OneWordGame/>}
            </>
        );
    }
}

export default App;
