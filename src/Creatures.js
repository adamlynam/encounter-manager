import React, { Component } from 'react';
import MonsterTools from './MonsterTools';

const ENTER_KEY = 13;

class Creatures extends Component {

  selectAll = (event) => {
    event.target.select();
  }

  healthRemainingCss = (monster, creature) => {
    return {
      height: Math.min(100, Math.max(0, creature.health / MonsterTools.parseMonsterHealth(monster) * 100)) + '%',
    }
  }

  render() {
    return <div className="creatures">{this.props.children.map(key => {
        var creature = this.props.creatures.get(key);
        return <div key={key} className="creature-details">
          <div className="identifier bs-callout bs-callout-info">{this.props.creatures.get(key).uniqueDescription}</div>
          <div className="health">
            <span className="health-remaining" style={this.healthRemainingCss(this.props.monster, creature)} />
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
          <button type="button" className="remove-creature btn btn-danger btn-sm" onClick={() => this.props.removeCreature(this.props.monster, key)}>-</button>
        </div>
      })}
      <button type="button" className="btn btn-primary btn-sm btn-block" onClick={() => this.props.addCreature(this.props.monster)}>Add Creature</button>
    </div>
  }
}

export default Creatures;
