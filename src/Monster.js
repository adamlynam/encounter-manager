import React, { Component } from 'react';
import MonsterTools from './MonsterTools';
import SmartEntryText from './SmartEntryText';

class Monster extends Component {
  render() {
    var monsterSpeeds = MonsterTools.parseMonsterSpeeds(this.props.children);
    return (
      <div className="monster">
        <h4>{this.props.children.name}</h4>
        <div className="remove-monster remove-button" onClick={() => this.props.removeMonster(this.props.children)}>-</div>
        <div className="monster-ac">{MonsterTools.parseMonsterAc(this.props.children)}</div>
        <div className="monster-speed">
          {monsterSpeeds.groundSpeed && <div className="ground-speed">{monsterSpeeds.groundSpeed}</div>}
          {monsterSpeeds.burrowSpeed && <div className="burrow-speed">{monsterSpeeds.burrowSpeed}</div>}
          {monsterSpeeds.climbSpeed && <div className="climb-speed">{monsterSpeeds.climbSpeed}</div>}
          {monsterSpeeds.flySpeed && <div className="fly-speed">{monsterSpeeds.flySpeed}</div>}
          {monsterSpeeds.swimSpeed && <div className="swim-speed">{monsterSpeeds.swimSpeed}</div>}
        </div>
        <img className="monster-image" src={'/img/monsters/' + this.props.children.name + '.png'} alt={this.props.children.name + ' image'} />
        <h5 className="toggle" onClick={() => this.props.toggleStatsShown(this.props.children)}>Stats {this.props.children.statsShown ? '▲' : '▼'}</h5>
        {this.props.children.statsShown && this.renderStats(this.props.children)}
        <h5 className="toggle" onClick={() => this.props.toggleSavesShown(this.props.children)}>Saving Throws {this.props.children.savesShown ? '▲' : '▼'}</h5>
        {this.props.children.savesShown && this.renderSaves(this.props.children)}
        {(this.props.children.resist || this.props.children.immune || this.props.children.conditionImmune) && <h5 className="toggle" onClick={() => this.props.toggleResistancesShown(this.props.children)}>Resistances {this.props.children.resistancesShown ? '▲' : '▼'}</h5>}
        {(this.props.children.resist || this.props.children.immune || this.props.children.conditionImmune) && this.props.children.resistancesShown && this.renderResistances(this.props.children)}
        {this.props.children.trait && <h5 className="toggle" onClick={() => this.props.toggleTraitsShown(this.props.children)}>Traits {this.props.children.traitsShown ? '▲' : '▼'}</h5>}
        {this.props.children.trait && this.props.children.traitsShown && this.renderAbilities(this.props.children.trait)}
        {this.props.children.action && <h5 className="toggle" onClick={() => this.props.toggleActionsShown(this.props.children)}>Attacks {this.props.children.actionsShown ? '▲' : '▼'}</h5>}
        {this.props.children.action && this.props.children.actionsShown && this.renderAbilities(this.props.children.action)}
        {this.props.children.instances.map(key => {
          return <div key={key} className="creature-details">
            <span className="identifier">{key}</span>
            <span className="health-modifier-button" onClick={() => this.props.setCreatureHealth(key, this.props.creatures.get(key).health - 10)}>-10</span>
            <span className="health-modifier-button" onClick={() => this.props.setCreatureHealth(key, this.props.creatures.get(key).health - 1)}>-1</span>
            <span className="health">
              <span className="health-remaining" style={this.healthRemainingCss(this.props.children, this.props.creatures.get(key))} />
              {this.props.creatures.get(key).health}
            </span>
            <span className="health-modifier-button" onClick={() => this.props.setCreatureHealth(key, this.props.creatures.get(key).health + 1)}>+1</span>
            <span className="health-modifier-button" onClick={() => this.props.setCreatureHealth(key, this.props.creatures.get(key).health + 10)}>+10</span>
            <span className="remove-creature remove-button" onClick={() => this.props.removeCreature(this.props.children, key)}>-</span>
          </div>
        })}
        <div className="add-creature" onClick={() => this.props.addCreature(this.props.children)}>+</div>
      </div>
    );
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
      {this.renderStat('Str', this.props.children.str)}
      {this.renderStat('Dex', this.props.children.dex)}
      {this.renderStat('Con', this.props.children.con)}
      {this.renderStat('Int', this.props.children.int)}
      {this.renderStat('Wis', this.props.children.wis)}
      {this.renderStat('Cha', this.props.children.cha)}
    </div>
  }

  renderSaves = (monster) => {
    var saves = MonsterTools.parseMonsterSaves(monster);
    return <div className="stats">
      {this.renderSave(
        'Str',
        saves.str ? saves.str : MonsterTools.calculateModifier(monster.str),
        saves.str ? true : false)}
      {this.renderSave(
        'Dex',
        saves.dex ? saves.dex : MonsterTools.calculateModifier(monster.dex),
        saves.dex ? true : false)}
      {this.renderSave(
        'Con',
        saves.con ? saves.con : MonsterTools.calculateModifier(monster.con),
        saves.con ? true : false)}
      {this.renderSave(
        'Int',
        saves.int ? saves.int : MonsterTools.calculateModifier(monster.int),
        saves.int ? true : false)}
      {this.renderSave(
        'Wis',
        saves.wis ? saves.wis : MonsterTools.calculateModifier(monster.wis),
        saves.wis ? true : false)}
      {this.renderSave(
        'Cha',
        saves.cha ? saves.cha : MonsterTools.calculateModifier(monster.cha),
        saves.cha ? true : false)}
    </div>
  }

  renderResistances = (monster) => {
    return <div className="resistances">
      {monster.resist && <div className="ability"><strong>Resistant</strong> to damage from {monster.resist}</div>}
      {monster.immune && <div className="ability"><strong>Immune</strong> to damage from {monster.immune}</div>}
      {monster.conditionImmune && <div className="ability"><strong>Immune</strong> to conditions {monster.conditionImmune}</div>}
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

  healthRemainingCss = (monster, creature) => {
    return {
      height: Math.min(100, Math.max(0, creature.health / MonsterTools.parseMonsterHealth(monster) * 100)) + '%',
    }
  }
}

export default Monster;
