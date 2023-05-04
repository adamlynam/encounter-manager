import React, { Component } from 'react';

const rollRegex = new RegExp('{@[^}]+ [^}]+}');

class SmartEntryText extends Component {

  render() {
    var annotatedText = [];
    var remainingString = this.props.children;
    for (var result; (result = rollRegex.exec(remainingString)); ) {
      annotatedText.push(result.input.slice(0, result.index));
      annotatedText.push(this.renderRoll(result[0]));
      remainingString = result.input.slice(result.index + result[0].length);
    }
    annotatedText.push(remainingString);
    return annotatedText;
  }

  renderRoll = roll => {
    // match d20 rolls
    var d20Rolls = roll.match(new RegExp('{@hit ([^}]+)}'));
    if (d20Rolls != null) {
      return this.renderD20Roll(parseInt(d20Rolls[1], 10) + (this.props.d20Bonus ? this.props.d20Bonus : 0));
    }

    // match poly dice rolls
    var polyRolls = roll.match(new RegExp('{@dice ([0-9]+)d([0-9]+)\\+?([0-9]+)?}'));
    if (polyRolls != null) {
      return this.renderPolyRoll(parseInt(polyRolls[1], 10), parseInt(polyRolls[2], 10), parseInt(polyRolls[3], 10)  + (this.props.polyBonus ? this.props.polyBonus : 0));
    }

    return roll;
  }

  renderD20Roll = modifier => {
    return <span className="d20-roll roll" onClick={() => this.props.roller(this.props.entryName, 1, 20, modifier)}>+{modifier}</span>;
  }

  renderPolyRoll = (number, sides, modifier) => {
    return <span className="poly-roll roll" onClick={() => this.props.roller(this.props.entryName, number, sides, modifier)}>{number}d{sides}{modifier ? '+' + modifier : ''}</span>;
  }
}

export default SmartEntryText;
