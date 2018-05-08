import React, { Component } from 'react';
import MonsterTools from './MonsterTools';

class MonsterSize extends Component {
  render() {
    return <img className={'monster-size ' + MonsterTools.parseMonsterSize(this.props.children)} src={'/img/' + MonsterTools.parseMonsterSize(this.props.children) + '.png'} alt={'Monster Size'} />
  }
}

export default MonsterSize;
