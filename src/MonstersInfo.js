import React, { Component } from 'react';
import MonsterTools from './MonsterTools';

const ENTER_KEY = 13;

class MonstersInfo extends Component {
  render() {
    return <div className="monsters-info">
      {Array.from(this.props.monstersAdded).reverse().map(([key, monster]) => {
        var monsterSpeeds = MonsterTools.parseMonsterSpeeds(monster);
        return (
          <div key={key} className={'monster card' + (key === this.props.currentInitative ? ' current' : '') + (key === this.props.selectedMonster ? ' selected' : '')}>
            <div className="card-header toggle" onClick={() => this.props.setSelectedMonster(monster)}>
              <img className="monster-image" src={'/img/monsters/' + monster.name + '.png'} alt={monster.name + ' image'} />
              <h3>{monster.name}</h3>
              <button type="button" className="remove-monster btn btn-danger btn-sm" onClick={(event) => {
                event.preventDefault()
                event.stopPropagation();
                event.nativeEvent.stopImmediatePropagation();
                this.props.removeMonster(key);
              }}>-</button>
            </div>
            <div className="card-body">
              <div className="container">
                <div className="row">
                  <div className="col-4">
                    <div className="monster-ac">{MonsterTools.parseMonsterAc(monster)}</div>
                    {this.renderSaves(monster)}
                  </div>
                  <div className="col-8">
                    {monster.instances.map(key => {
                      return this.renderCreature(key, this.props.creatures.get(key), monster);
                    })}
                    <button type="button" className="btn btn-primary btn-sm btn-block" onClick={() => this.props.addCreature(monster)}>Add Creature</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  }

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

export default MonstersInfo;
