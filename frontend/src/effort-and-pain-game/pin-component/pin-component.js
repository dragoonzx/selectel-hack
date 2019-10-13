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
        console.log('OnStart');
      };
    
      onStop = (e, data) => {
        console.log('OnStop');
        let location = {
          text: data.node.innerText,
          x: data.x,
          y: data.y,
        }
        console.log(this.props.pins);
        this.props.updateLocation(location);
      };

      
    render(){
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop, OnDrag: this.onDrag};
        return (
            <div className="ep-board dotted">
                <div className="pain">PAIN</div>
                <div className="effort">E
                    F
                    F
                    O
                    R
                    T</div>
              {this.props.pins.map((item,index) => (
                    <Draggable key={index} position={{x: item.x, y: item.y}} bounds={{top: 0, left: 0, right: window.innerWidth*0.55, bottom: window.innerHeight*0.65}} {...dragHandlers}>
                        <div title={item.x} className="ep-pin">
                            {item.text}
                        </div>
              </Draggable>))}
            </div>
        )
      }
}

export default PinBoardComponent;