import React , {Component} from 'react';
import '../App.css';
import './start-screen.css';


class StartScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            isActive: false,
        }
        this.mouseLeave = this.mouseLeave.bind(this);
        this.mouseEnter = this.mouseEnter.bind(this);
    }

    mouseEnter(){
        this.setState({isActive: true});
    }

    mouseLeave(){
        this.setState({isActive: false});
    }
    render() {
        return (
            <div className="start-screen">
                <div className="game-header">Start Event</div>
                <div className="game-descr">choose your settings and wait teammates</div>

                <div className="event-panel">
                    <div className="event-panel__icon"></div>
                    <div className="event-panel__create-button">
                        Create event
                    </div>
                    <div className="event-panel__create-button">
                        Join to session
                    </div>

                </div>
                <div className="event-panel-second">
                    <div className={this.state.isActive ? "event-panel__retro-back jumping" : "event-panel__retro-back"}></div>
                    <div onMouseOver={this.mouseEnter} onMouseLeave={this.mouseLeave} className="event-panel__learning">
                        <div className="event-panel__learning-header">
                            Learn about Retrospectives more...
                        </div>
                        <div onClick={() => window.open('https://www.funretrospectives.com/')} className="event-panel__create-button">
                            Fun Retrospectives
                        </div>
                        <div onClick={() => window.open('https://habr.com/ru/company/scrumtrek/blog/292600/')} className="event-panel__create-button">
                            Habr.com: About Retro
                        </div>
                        <div onClick={()=>window.open('https://www.scrum.org/resources/what-is-a-sprint-retrospective')} className="event-panel__create-button">
                            Scrum.org: What is a sprint retrospective
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StartScreen;