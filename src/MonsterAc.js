import React, { Component } from 'react';
import MonsterTools from './MonsterTools';

class MonsterAc extends Component {
  render() {
    return <div className="monster-ac">{MonsterTools.parseMonsterAc(this.props.children)}</div>
  }
}

export default MonsterAc;
