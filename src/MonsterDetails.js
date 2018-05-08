import React, { Component } from 'react';
import MonsterResistances from './MonsterResistances';
import MonsterActions from './MonsterActions';
import MonsterStats from './MonsterStats';
import MonsterSavingThrows from './MonsterSavingThrows';
import MonsterLanguages from './MonsterLanguages';

class MonsterDetails extends Component {
  render() {
    return <div className="monster-details">
      <MonsterResistances>{this.props.children}</MonsterResistances>
      <MonsterActions title="Traits" roller={this.props.roller} >{this.props.children.trait}</MonsterActions>
      <MonsterActions title="Attacks" roller={this.props.roller} >{this.props.children.action}</MonsterActions>
      <MonsterActions title="Reactions" roller={this.props.roller} >{this.props.children.reaction}</MonsterActions>
      <MonsterActions title="Legendary Actions" roller={this.props.roller} >{this.props.children.legendary}</MonsterActions>
      <hr />
      <MonsterStats roller={this.props.roller} >{this.props.children}</MonsterStats>
      <MonsterSavingThrows roller={this.props.roller} >{this.props.children}</MonsterSavingThrows>
      <MonsterLanguages>{this.props.children}</MonsterLanguages>
    </div>
  }
}

export default MonsterDetails;
