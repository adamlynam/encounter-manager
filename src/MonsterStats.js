import React, { Component } from 'react';
import MonsterTools from './MonsterTools';

class MonsterStats extends Component {

  renderStat = (statName, statValue) => {
    var statMod = MonsterTools.calculateModifier(statValue);
    return <div className="stat roll" onClick={() => this.props.roller(statName + ' Check', 1, 20, statMod)}>
      <span className="stat-name">{statName}</span>
      <span className="stat-value">{statValue}</span>
      <span className="stat-modifier">({statMod})</span>
    </div>
  }

  renderStats = (monster) => {
    return <div className="stats">
      {this.renderStat('Strength', this.props.children.str)}
      {this.renderStat('Dexterity', this.props.children.dex)}
      {this.renderStat('Consitution', this.props.children.con)}
      {this.renderStat('Intelligence', this.props.children.int)}
      {this.renderStat('Wisdom', this.props.children.wis)}
      {this.renderStat('Charisma', this.props.children.cha)}
    </div>
  }

  render() {
    return <div className="stats">
      <h4>Stats</h4>
      {this.renderStats(this.props.children)}
    </div>
  }
}

export default MonsterStats;
