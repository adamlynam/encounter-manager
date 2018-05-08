import React, { Component } from 'react';
import MonsterTools from './MonsterTools';

class MonsterSavingThrows extends Component {

  renderSave = (statName, statMod, proficient) => {
    return <div className="stat roll" onClick={() => this.props.roller(statName + ' Saving Throw', 1, 20, statMod)}>
      <span className="stat-proficient">{proficient ? '*' : '\u00a0'}</span>
      <span className="stat-name">{statName}</span>
      <span className="stat-modifier">({statMod})</span>
    </div>
  }

  renderSaves = (monster) => {
    var saves = MonsterTools.parseMonsterSaves(monster);
    return <div className="stats">
      {this.renderSave(
        this.props.shortNames ? 'Str' : 'Strength',
        saves.str ? saves.str : MonsterTools.calculateModifier(this.props.children.str),
        saves.str ? true : false)}
      {this.renderSave(
        this.props.shortNames ? 'Dex' : 'Dexterity',
        saves.dex ? saves.dex : MonsterTools.calculateModifier(this.props.children.dex),
        saves.dex ? true : false)}
      {this.renderSave(
        this.props.shortNames ? 'Con' : 'Consitution',
        saves.con ? saves.con : MonsterTools.calculateModifier(this.props.children.con),
        saves.con ? true : false)}
      {this.renderSave(
        this.props.shortNames ? 'Int' : 'Intelligence',
        saves.int ? saves.int : MonsterTools.calculateModifier(this.props.children.int),
        saves.int ? true : false)}
      {this.renderSave(
        this.props.shortNames ? 'Wis' : 'Wisdom',
        saves.wis ? saves.wis : MonsterTools.calculateModifier(this.props.children.wis),
        saves.wis ? true : false)}
      {this.renderSave(
        this.props.shortNames ? 'Cha' : 'Charisma',
        saves.cha ? saves.cha : MonsterTools.calculateModifier(this.props.children.cha),
        saves.cha ? true : false)}
    </div>
  }

  render() {
    return <div className="saving-throws">
      <h4>Saving Throws</h4>
      {this.renderSaves(this.props.children)}
    </div>
  }
}

export default MonsterSavingThrows;
