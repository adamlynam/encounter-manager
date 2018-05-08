import React, { Component } from 'react';
import MonsterTools from './MonsterTools';

class MonsterSpeed extends Component {
  render() {
    var monsterSpeeds = MonsterTools.parseMonsterSpeeds(this.props.children);
    return <div className="monster-speed">
      {monsterSpeeds.groundSpeed && <div className="ground-speed">{monsterSpeeds.groundSpeed}</div>}
      {monsterSpeeds.burrowSpeed && <div className="burrow-speed">{monsterSpeeds.burrowSpeed}</div>}
      {monsterSpeeds.climbSpeed && <div className="climb-speed">{monsterSpeeds.climbSpeed}</div>}
      {monsterSpeeds.flySpeed && <div className="fly-speed">{monsterSpeeds.flySpeed}</div>}
      {monsterSpeeds.swimSpeed && <div className="swim-speed">{monsterSpeeds.swimSpeed}</div>}
    </div>
  }
}

export default MonsterSpeed;
