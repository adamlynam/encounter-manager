import React, { Component } from 'react';
import MonsterResistances from './MonsterResistances';
import MonsterSenses from './MonsterSenses';
import MonsterActions from './MonsterActions';
import MonsterSpellcasting from './MonsterSpellcasting';
import MonsterLairActions from './MonsterLairActions';
import MonsterLanguages from './MonsterLanguages';
import MonsterStats from './MonsterStats';
import MonsterSavingThrows from './MonsterSavingThrows';
import MonsterSkills from './MonsterSkills';

class MonsterDetails extends Component {
  render() {
    return <div className="monster-details">
      <MonsterSenses>{this.props.children}</MonsterSenses>
      <MonsterResistances>{this.props.children}</MonsterResistances>
      <MonsterActions title="Traits" roller={this.props.roller} >{this.props.children.trait}</MonsterActions>
      <MonsterActions title="Attacks" roller={this.props.roller} >{this.props.children.action}</MonsterActions>
      <MonsterActions title="Reactions" roller={this.props.roller} >{this.props.children.reaction}</MonsterActions>
      <MonsterSpellcasting
        roller={this.props.roller}
        toggleInnateSpellSlots={this.props.toggleInnateSpellSlots}
        togglePreparedSpellSlots={this.props.togglePreparedSpellSlots} >{this.props.children}</MonsterSpellcasting>
      <MonsterActions title="Legendary Actions" roller={this.props.roller} >{this.props.children.legendary}</MonsterActions>
      <MonsterLairActions roller={this.props.roller} >{this.props.children}</MonsterLairActions>
      <hr />
      <MonsterLanguages>{this.props.children}</MonsterLanguages>
      <MonsterStats roller={this.props.roller} >{this.props.children}</MonsterStats>
      <MonsterSavingThrows roller={this.props.roller} >{this.props.children}</MonsterSavingThrows>
      <MonsterSkills roller={this.props.roller} >{this.props.children}</MonsterSkills>
    </div>
  }
}

export default MonsterDetails;
