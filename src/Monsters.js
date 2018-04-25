import React, { Component } from 'react';
import MonsterTools from './MonsterTools';
import SmartEntryText from './SmartEntryText';

const ENTER_KEY = 13;

class Monster extends Component {
  render() {
    return <div className="monsters">
      {Array.from(this.props.monstersAdded).reverse().map(([key, monster]) => {
        var monsterSpeeds = MonsterTools.parseMonsterSpeeds(monster);
        return (
          <div key={key} className={'monster card' + (key === this.props.currentInitative ? ' current' : '')}>
            <div className="card-header toggle" onClick={() => this.props.toggleStatBlockShown(monster)}>
              <h3>{monster.name}</h3>
              <button type="button" className="remove-monster btn btn-danger btn-sm" onClick={(event) => {
                event.preventDefault()
                event.stopPropagation();
                event.nativeEvent.stopImmediatePropagation();
                this.props.removeMonster(key);
              }}>-</button>
              <div className="monster-ac">{MonsterTools.parseMonsterAc(monster)}</div>
              <div className="monster-speed">
                {monsterSpeeds.groundSpeed && <div className="ground-speed">{monsterSpeeds.groundSpeed}</div>}
                {monsterSpeeds.burrowSpeed && <div className="burrow-speed">{monsterSpeeds.burrowSpeed}</div>}
                {monsterSpeeds.climbSpeed && <div className="climb-speed">{monsterSpeeds.climbSpeed}</div>}
                {monsterSpeeds.flySpeed && <div className="fly-speed">{monsterSpeeds.flySpeed}</div>}
                {monsterSpeeds.swimSpeed && <div className="swim-speed">{monsterSpeeds.swimSpeed}</div>}
              </div>
              <img className="monster-image" src={'/img/monsters/' + monster.name + '.png'} alt={monster.name + ' image'} />
              <img className={'monster-size ' + MonsterTools.parseMonsterSize(monster)} src={'/img/' + MonsterTools.parseMonsterSize(monster) + '.png'} alt={'Monster Size'} />
              <h4 className="stat-block-arrow">{monster.statBlockShown ? '▲' : '▼'}</h4>
            </div>
            <div className="card-body">
              {monster.statBlockShown && <h4 className="toggle" onClick={() => this.props.toggleStatsShown(monster)}>Stats {monster.statsShown ? '▲' : '▼'}</h4>}
              {monster.statBlockShown && monster.statsShown && this.renderStats(monster)}
              {monster.statBlockShown && <h4 className="toggle" onClick={() => this.props.toggleSavesShown(monster)}>Saving Throws {monster.savesShown ? '▲' : '▼'}</h4>}
              {monster.statBlockShown && monster.savesShown && this.renderSaves(monster)}
              {monster.statBlockShown && <h4 className="toggle" onClick={() => this.props.toggleLanguagesShown(monster)}>Languages {monster.languagesShown ? '▲' : '▼'}</h4>}
              {monster.statBlockShown && monster.languagesShown && this.renderLanguages(monster)}
              {monster.statBlockShown && (monster.resist || monster.immune || monster.conditionImmune) && <h4 className="toggle" onClick={() => this.props.toggleResistancesShown(monster)}>Resistances {monster.resistancesShown ? '▲' : '▼'}</h4>}
              {monster.statBlockShown && (monster.resist || monster.immune || monster.conditionImmune) && monster.resistancesShown && this.renderResistances(monster)}
              {monster.statBlockShown && <hr />}
              {monster.statBlockShown && monster.trait && <h4 className="toggle" onClick={() => this.props.toggleTraitsShown(monster)}>Traits {monster.traitsShown ? '▲' : '▼'}</h4>}
              {monster.statBlockShown && monster.trait && monster.traitsShown && this.renderAbilities(monster.trait)}
              {monster.statBlockShown && monster.action && <h4 className="toggle" onClick={() => this.props.toggleActionsShown(monster)}>Attacks {monster.actionsShown ? '▲' : '▼'}</h4>}
              {monster.statBlockShown && monster.action && monster.actionsShown && this.renderAbilities(monster.action)}
              {monster.statBlockShown && monster.reaction && <h4 className="toggle" onClick={() => this.props.toggleReactionsShown(monster)}>Reactions {monster.reactionsShown ? '▲' : '▼'}</h4>}
              {monster.statBlockShown && monster.reaction && monster.reactionsShown && this.renderAbilities(monster.reaction)}
              {monster.statBlockShown && monster.legendary && <h4 className="toggle" onClick={() => this.props.toggleLegendaryActionsShown(monster)}>Legendary Actions {monster.legendaryActionsShown ? '▲' : '▼'}</h4>}
              {monster.statBlockShown && monster.legendary && monster.legendaryActionsShown && this.renderAbilities(monster.legendary)}
              {monster.statBlockShown && <hr />}
              {monster.instances.map(key => {
                return this.renderCreature(key, this.props.creatures.get(key), monster);
              })}
              <button type="button" className="btn btn-primary btn-sm btn-block" onClick={() => this.props.addCreature(monster)}>Add Creature</button>
            </div>
          </div>
        );
      })}
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
      {this.renderStat('Str', monster.str)}
      {this.renderStat('Dex', monster.dex)}
      {this.renderStat('Con', monster.con)}
      {this.renderStat('Int', monster.int)}
      {this.renderStat('Wis', monster.wis)}
      {this.renderStat('Cha', monster.cha)}
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

  renderLanguages = (monster) => {
    return <div className="languages ability">{monster.languages ? monster.languages : 'None'}</div>
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

  renderCreature = (key, creature, monster) => {
    return <div key={key} className="creature-details">
      <div className="identifier bs-callout bs-callout-info">{this.props.creatures.get(key).uniqueDescription}</div>
      <div className="health">
        <span className="health-remaining" style={this.healthRemainingCss(monster, creature)} />
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
      </div>
      <button type="button" className="remove-creature btn btn-danger btn-sm" onClick={() => this.props.removeCreature(monster, key)}>-</button>
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
