import React, { Component } from 'react';

class SmartEntryText extends Component {

  render() {
    return (
      <div className="smart-entry-text">{this.renderRolls(this.props.children)}</div>
    );
  }

  renderD20Roll = modifier => {
    return <span className="d20-roll roll" onClick={() => this.props.roller(1, 20, modifier)}>+{modifier} </span>;
  }

  renderPolyRoll = (number, sides, modifier) => {
    return <span className="poly-roll roll" onClick={() => this.props.roller(number, sides, modifier)}>({number}d{sides}{modifier ? '+' + modifier : ''}) </span>;
  }

  renderRolls = text => {
    return text.split(' ').map(word => {
      // match d20 rolls
      var d20Rolls = word.match(new RegExp('^\\+([0-9]+)'));
      if (d20Rolls != null) {
        return this.renderD20Roll(parseInt(d20Rolls[1]));
      }

      // match poly dice rolls
      var polyRolls = word.match(new RegExp('^\\(([0-9]+)d([0-9]+)\\+?([0-9]+)?\\)'));
      if (polyRolls != null) {
        return this.renderPolyRoll(parseInt(polyRolls[1]), parseInt(polyRolls[2]), parseInt(polyRolls[3]));
      }

      return word + ' ';
    })
  }
}

export default SmartEntryText;
