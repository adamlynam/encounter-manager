import React, { Component } from 'react';
import MonsterAc from './MonsterAc';
import MonsterSize from './MonsterSize';
import MonsterImage from './MonsterImage';
import MonsterName from './MonsterName';
import MonsterSpeed from './MonsterSpeed';
import MonsterDetails from './MonsterDetails';

class Monster extends Component {
  render() {
    return <div className={'monster-info monster card' + (this.props.children.key === this.props.currentInitative ? ' current' : '') + (this.props.children.key === this.props.selectedMonster ? ' selected' : '')}>
      <div className="card-header">
        <MonsterAc>{this.props.children}</MonsterAc>
        <MonsterSize>{this.props.children}</MonsterSize>
        <MonsterImage>{this.props.children}</MonsterImage>
        <MonsterName>{this.props.children}</MonsterName>
        <MonsterSpeed>{this.props.children}</MonsterSpeed>
      </div>
      <div className="card-body">
        <MonsterDetails
          roller={this.props.roller}
          toggleInnateSpellSlots={this.props.toggleInnateSpellSlots}
          togglePreparedSpellSlots={this.props.togglePreparedSpellSlots} >
          {this.props.children}
        </MonsterDetails>
      </div>
    </div>
  }
}

export default Monster;
