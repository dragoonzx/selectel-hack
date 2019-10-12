import React, { Component } from 'react';
import './three-little-pigs-game.css';
import ModalWindow from "../components/ModalWindow";
import Switch from "./switch-component";


class ThreeLittlePigsGame extends Component {
    constructor(props){
        super(props);
        this.state= {
            cardText: '',
            cardType: 1,
            isModalOpen: false,
            cards: []
        }
        this.onCreateCard = this.onCreateCard.bind(this);
        this.onChangeCardText = this.onChangeCardText.bind(this);
        this.onCreateCardModal = this.onCreateCardModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChooseType = this.handleChooseType.bind(this);
    }

    onCreateCardModal() {
        this.setState({isModalOpen: true});
    }

    onChangeCardText(event){
        this.setState({cardText: event.target.value});
    }

    onCreateCard() {
        let newState = this.state.cards.concat({text: this.state.cardText, type: this.state.cardType});
        console.log(newState);
        this.state.cards = newState;
        this.state.cardText = '';
        this.state.cardType = 1;
        this.state.isModalOpen = false;
        console.log(this.state);
        this.forceUpdate();

    }

    closeModal(){
        this.setState({isModalOpen:false})
    }

    handleChooseType(event){
        this.setState({cardType: event})
    }
    render() {
        return (
            <>
                <ModalWindow onClose={this.closeModal} isOpen={this.state.isModalOpen}>
                    <div className="card-header"  style={{color: 'white'}}>Create your card:</div>
                    <Switch active={this.state.cardType} handleClick={this.handleChooseType}></Switch>
                    <input className="card-text-input" onChange={this.onChangeCardText}/>
                    <div className="green-button" onClick={this.onCreateCard}> Create </div>
                </ModalWindow>
            <div className="tlp-game">
                <div className="game-header">
                    Three little pigs
                </div>
                <div className="game-descr">
                    Foster a conversation about improvements for getting our structures more solid.
                </div>
                <div onClick={this.onCreateCardModal} className="add-button">
                    +
                </div>
                <div className="house house-straw inline">

                </div>
                <div className="vertical-divider inline"></div>
                <div className="house house-hut inline">

                </div>
                <div className="vertical-divider inline"></div>
                <div className="house house-stone inline">

                </div>
            </div>
            </>
        );
    }

}

export default ThreeLittlePigsGame;
