import React, { Component } from 'react';
import MonsterTools from './MonsterTools';

class EncounterInfo extends Component {

  render = () => {
    return <div className="encounter-info bs-callout bs-callout-info">
      <div className="experience">Encounter Value: {this.calculateTotalXP(this.props.monsters)} XP</div>
    </div>;
  }

  calculateTotalXP = (monsters) => {
    return Array.from(monsters)
      .map(([key, monster]) => monster)
      .reduce((accumulator, monster) => {
        return accumulator + MonsterTools.parseMonsterXp(monster) * monster.instances.length;
      }, 0);
  }
}

export default EncounterInfo;
