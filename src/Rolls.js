import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Rolls extends Component {

  componentDidUpdate() {
    var elem = ReactDOM.findDOMNode(this);
    elem.scrollTop = elem.scrollHeight;
  }

  render() {
    return <div className="dice-rolls">
      {this.props.children.map((roll, index) => {
        return <div key={index} className="dice-roll">
          {roll.name !== undefined && <span className="roll-name">{roll.name}</span>}
          <span className="roll-total">{roll.total}</span>
          {this.renderRolls(roll.rolls)}
          {roll.modifier !== undefined && <span className="roll-modifier">+{roll.modifier}</span>}
        </div>
      })}
    </div>;
  }

  renderRolls = rolls => {
    return <span className="roll-rolls">
      ={rolls.map(roll => {
        return this.renderRoll(roll);
      }).reduce((acc, x) => {
        return acc === null ? [x] : [acc, <span>+</span>, x];
      }, null)}
    </span>
  }

  renderRoll = roll => {
    return <span className={roll === 20 ? 'critical-success' : (roll === 1) ? 'critical-fail' : ''}>
      {roll}
    </span>
  }
}

export default Rolls;
