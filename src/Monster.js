import React, { Component } from 'react';
import MonsterTools from './MonsterTools';
import SmartEntryText from './SmartEntryText';

class Monster extends Component {
  render() {
    var monsterSpeeds = MonsterTools.parseMonsterSpeeds(this.props.children);
    return <div className={'monster-info monster card' + (this.props.children.key === this.props.currentInitative ? ' current' : '') + (this.props.children.key === this.props.selectedMonster ? ' selected' : '')}>
      <div className="card-header">
        <div className="monster-ac">{MonsterTools.parseMonsterAc(this.props.children)}</div>
        <img className={'monster-size ' + MonsterTools.parseMonsterSize(this.props.children)} src={'/img/' + MonsterTools.parseMonsterSize(this.props.children) + '.png'} alt={'Monster Size'} />
        <img className="monster-image" src={'/img/monsters/' + this.props.children.name + '.png'} alt={this.props.children.name + ' image'} />
        <h3>{this.props.children.name}</h3>
        <div className="monster-speed">
          {monsterSpeeds.groundSpeed && <div className="ground-speed">{monsterSpeeds.groundSpeed}</div>}
          {monsterSpeeds.burrowSpeed && <div className="burrow-speed">{monsterSpeeds.burrowSpeed}</div>}
          {monsterSpeeds.climbSpeed && <div className="climb-speed">{monsterSpeeds.climbSpeed}</div>}
          {monsterSpeeds.flySpeed && <div className="fly-speed">{monsterSpeeds.flySpeed}</div>}
          {monsterSpeeds.swimSpeed && <div className="swim-speed">{monsterSpeeds.swimSpeed}</div>}
        </div>
      </div>
      <div className="card-body">
        {(this.props.children.resist || this.props.children.immune || this.props.children.conditionImmune) && <h4>Resistances</h4>}
        {(this.props.children.resist || this.props.children.immune || this.props.children.conditionImmune) && this.renderResistances(this.props.children)}
        {this.props.children.trait && <h4>Traits</h4>}
        {this.props.children.trait && this.renderAbilities(this.props.children.trait)}
        {this.props.children.action && <h4>Attacks</h4>}
        {this.props.children.action && this.renderAbilities(this.props.children.action)}
        {this.props.children.reaction && <h4>Reactions</h4>}
        {this.props.children.reaction && this.renderAbilities(this.props.children.reaction)}
        {this.props.children.legendary && <h4>Legendary Actions</h4>}
        {this.props.children.legendary && this.renderAbilities(this.props.children.legendary)}
        <hr />
        <h4>Stats</h4>
        {this.renderStats(this.props.children)}
        <h4>Saving Throws</h4>
        {this.renderSaves(this.props.children)}
        <h4>Languages</h4>
        {this.renderLanguages(this.props.children)}
      </div>
    </div>
  }

  renderStat = (statName, statValue) => {
    var statMod = MonsterTools.calculateModifier(statValue);
    return <div className="stat roll" onClick={() => this.props.roller(statName + ' Check', 1, 20, statMod)}>
      <span className="stat-name">{statName}</span>
      <span className="stat-value">{statValue}</span>
      <span className="stat-modifier">({statMod})</span>
    </div>
  }

  renderSave = (statName, statMod, proficient) => {
    return <div className="stat roll" onClick={() => this.props.roller(statName + ' Saving Throw', 1, 20, statMod)}>
      <span className="stat-proficient">{proficient ? '*' : '\u00a0'}</span>
      <span className="stat-name">{statName}</span>
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

  renderSaves = (monster) => {
    var saves = MonsterTools.parseMonsterSaves(monster);
    return <div className="stats">
      {this.renderSave(
        'Strength',
        saves.str ? saves.str : MonsterTools.calculateModifier(this.props.children.str),
        saves.str ? true : false)}
      {this.renderSave(
        'Dexterity',
        saves.dex ? saves.dex : MonsterTools.calculateModifier(this.props.children.dex),
        saves.dex ? true : false)}
      {this.renderSave(
        'Consitution',
        saves.con ? saves.con : MonsterTools.calculateModifier(this.props.children.con),
        saves.con ? true : false)}
      {this.renderSave(
        'Intelligence',
        saves.int ? saves.int : MonsterTools.calculateModifier(this.props.children.int),
        saves.int ? true : false)}
      {this.renderSave(
        'Wisdom',
        saves.wis ? saves.wis : MonsterTools.calculateModifier(this.props.children.wis),
        saves.wis ? true : false)}
      {this.renderSave(
        'Charisma',
        saves.cha ? saves.cha : MonsterTools.calculateModifier(this.props.children.cha),
        saves.cha ? true : false)}
    </div>
  }

  renderLanguages = (monster) => {
    return <div className="languages ability">{this.props.children.languages ? this.props.children.languages : 'None'}</div>
  }

  renderResistances = (monster) => {
    return <div className="resistances">
      {this.props.children.resist && <div className="ability"><strong>Resistant</strong> to damage from {this.props.children.resist}</div>}
      {this.props.children.immune && <div className="ability"><strong>Immune</strong> to damage from {this.props.children.immune}</div>}
      {this.props.children.conditionImmune && <div className="ability"><strong>Immune</strong> to conditions {this.props.children.conditionImmune}</div>}
    </div>;
  }

  renderAbilities = (abilities) => {
    return <div className="abilities">
      {abilities.map(ability => {
        return <div key={ability.name} className="ability">
          <div className="ability-name">{ability.name}</div>
          {this.renderEntries(ability.name, ability.entries)}
        </div>;
      })}
    </div>;
  }

  renderEntries = (entryName, entries) => {
    return <div className="entries">
      {entries.map(entry => {
        if (typeof entry === 'string' || entry instanceof String) {
          return <SmartEntryText entryName={entryName} roller={this.props.roller}>{entry}</SmartEntryText>;
        }
        else {
          return this.renderList(entry.items);
        }
      })}
    </div>;
  }

  renderList = (items) => {
    return <div className="list">
      {items.map(item => {
        return <div key={item.name} className="list-item">
          <div className="item-name">{item.name}</div>
          <SmartEntryText entryName={item.name} roller={this.props.roller}>{item.entry}</SmartEntryText>
        </div>;
      })}
    </div>;
  }
}

export default Monster;
