import React from 'react';
import Draggable from 'react-draggable';
import './pin-component.css';

class PinBoardComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pins: props.pins,
    };
  }
    



    onStart = () => {
        this.setState({activeDrags: ++this.state.activeDrags});
      };
    
      onStop = (e, data) => {
        //console.log(data);
        this.setState({activeDrags: --this.state.activeDrags});
        let location = {
          text: data.node.innerText,
          x: data.x,
          y: data.y,
        }
        this.props.updateLocation(location);
      };

      
    render(){
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop, OnDrag: this.onDrag};
        return (
            <div className="ep-board dotted">
              {this.props.pins.map((item,index) => (
                    <Draggable key={index} defaultPosition={{x: item.x, y: item.y}} bounds={{top: 0, left: 0, right: window.innerWidth*0.55, bottom: window.innerHeight*0.65}} {...dragHandlers}>
                        <div className="ep-pin">
                            {item.text}
                        </div>
              </Draggable>))}
            </div>
        )
      }
}

export default PinBoardComponent;