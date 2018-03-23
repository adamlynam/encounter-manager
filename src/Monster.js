import React, { Component } from 'react';
import MonsterTools from './MonsterTools';
import SmartEntryText from './SmartEntryText';

const ENTER_KEY = 13;

class Monster extends Component {
  render() {
    var monsterSpeeds = MonsterTools.parseMonsterSpeeds(this.props.children);
    return (
      <div className="monster">
        <h3>{this.props.children.name}</h3>
        <div className="remove-monster remove-button" onClick={() => this.props.removeMonster(this.props.children)}>-</div>
        <div className="monster-ac">{MonsterTools.parseMonsterAc(this.props.children)}</div>
        <div className="monster-speed">
          {monsterSpeeds.groundSpeed && <div className="ground-speed">{monsterSpeeds.groundSpeed}</div>}
          {monsterSpeeds.burrowSpeed && <div className="burrow-speed">{monsterSpeeds.burrowSpeed}</div>}
          {monsterSpeeds.climbSpeed && <div className="climb-speed">{monsterSpeeds.climbSpeed}</div>}
          {monsterSpeeds.flySpeed && <div className="fly-speed">{monsterSpeeds.flySpeed}</div>}
          {monsterSpeeds.swimSpeed && <div className="swim-speed">{monsterSpeeds.swimSpeed}</div>}
        </div>
        <img className={'monster-size ' + MonsterTools.parseMonsterSize(this.props.children)} src={'/img/' + MonsterTools.parseMonsterSize(this.props.children) + '.png'} alt={'Monster Size'} />
        <h3 className="toggle stat-block-arrow" onClick={() => this.props.toggleStatBlockShown(this.props.children)}>{this.props.children.statBlockShown ? '▲' : '▼'}</h3>
        <img className="toggle monster-image" src={'/img/monsters/' + this.props.children.name + '.png'} alt={this.props.children.name + ' image'} onClick={() => this.props.toggleStatBlockShown(this.props.children)} />
        {this.props.children.statBlockShown && <h4 className="toggle" onClick={() => this.props.toggleStatsShown(this.props.children)}>Stats {this.props.children.statsShown ? '▲' : '▼'}</h4>}
        {this.props.children.statBlockShown && this.props.children.statsShown && this.renderStats(this.props.children)}
        {this.props.children.statBlockShown && <h4 className="toggle" onClick={() => this.props.toggleSavesShown(this.props.children)}>Saving Throws {this.props.children.savesShown ? '▲' : '▼'}</h4>}
        {this.props.children.savesShown && this.renderSaves(this.props.children)}
        {this.props.children.statBlockShown && (this.props.children.resist || this.props.children.immune || this.props.children.conditionImmune) && <h4 className="toggle" onClick={() => this.props.toggleResistancesShown(this.props.children)}>Resistances {this.props.children.resistancesShown ? '▲' : '▼'}</h4>}
        {this.props.children.statBlockShown && (this.props.children.resist || this.props.children.immune || this.props.children.conditionImmune) && this.props.children.resistancesShown && this.renderResistances(this.props.children)}
        {this.props.children.statBlockShown && this.props.children.trait && <h4 className="toggle" onClick={() => this.props.toggleTraitsShown(this.props.children)}>Traits {this.props.children.traitsShown ? '▲' : '▼'}</h4>}
        {this.props.children.statBlockShown && this.props.children.trait && this.props.children.traitsShown && this.renderAbilities(this.props.children.trait)}
        {this.props.children.statBlockShown && this.props.children.action && <h4 className="toggle" onClick={() => this.props.toggleActionsShown(this.props.children)}>Attacks {this.props.children.actionsShown ? '▲' : '▼'}</h4>}
        {this.props.children.statBlockShown && this.props.children.action && this.props.children.actionsShown && this.renderAbilities(this.props.children.action)}
        {this.props.children.instances.map(key => {
          return this.renderCreature(key, this.props.creatures.get(key));
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

  renderCreature = (key, creature) => {
    return <div key={key} className="creature-details">
      <span className="identifier">{this.props.creatures.get(key).uniqueDescription}</span>
      <span className="health">
        <span className="health-remaining" style={this.healthRemainingCss(this.props.children, creature)} />
        {!creature.editingHealth && <span onClick={() => this.props.toggleCreatureHealthEdit(key)}>{creature.health}</span>}
        {creature.editingHealth && <input
          className="health-edit"
          type="text"
          value={creature.editHealthValue}
          autoFocus={true}
          onFocus={this.selectAll}
          onChange={(event) => this.props.updateCreatureHealthText(key, event.target.value)}
          onKeyDown={(event) => {
            if (event.keyCode === ENTER_KEY) {
              this.props.setCreatureHealth(key, creature.editHealthValue);
            }}}
          onBlur={() => this.props.toggleCreatureHealthEdit(key)} />}
      </span>
      <span className="remove-creature remove-button" onClick={() => this.props.removeCreature(this.props.children, key)}>-</span>
    </div>;
  }

  healthRemainingCss = (monster, creature) => {
    return {
      height: Math.min(100, Math.max(0, creature.health / MonsterTools.parseMonsterHealth(monster) * 100)) + '%',
    }
  }

  selectAll = (event) => {
    event.target.select();
  }
}

export default Monster;
