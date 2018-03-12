import React, { Component } from 'react';

class Rolls extends Component {

  render() {
    return <div className="dice-rolls">
      {this.props.children.map((roll, index) => {
        return <div key={index} className="dice-roll">
          <span className="roll-total">{roll.total}</span>
          <span className="roll-rolls">={roll.rolls.join('+')}</span>
          {roll.modifier != undefined && <span className="roll-modifier">+{roll.modifier}</span>}
        </div>
      })}
    </div>;
  }
}

export default Rolls;
