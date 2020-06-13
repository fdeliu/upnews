import React, { Component } from 'react';
import Clock from 'react-clock';


class MyClock extends Component {
    state = {
        date: new Date(),
      }
    
      componentDidMount() {
        setInterval(
          () => this.setState({ date: new Date() }),
          1000
        );
      }      
    render() {
        
        return (
            <div className="rightSide white-text">
              <Clock
                value={this.state.date}
                renderNumbers={true}
                size={200}
                />
             </div>
        )
    }
}

export default MyClock;