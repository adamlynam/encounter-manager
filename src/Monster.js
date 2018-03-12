import React, { Component } from 'react';
import SmartEntryText from './SmartEntryText';

const longestNumberRegex = new RegExp('[0-9]+');

class Monster extends Component {


  parseMonsterAc = monster => {
    return parseInt(monster.ac.match(longestNumberRegex));
  }

  parseMonsterSpeeds = monster => {
    return {
      groundSpeed: this.parseGroundSpeed(monster),
      burrowSpeed: this.parseBurrowSpeed(monster),
      climbSpeed: this.parseClimbSpeed(monster),
      flySpeed: this.parseFlySpeed(monster),
      swimSpeed: this.parseSwimSpeed(monster),
    };
  }

  parseGroundSpeed = monster => {
    var speeds = monster.speed.split(',');
    var groundSpeed = speeds[0];
    return groundSpeed === undefined ? undefined : parseInt(
      longestNumberRegex.exec(groundSpeed)[0]);
  }

  parseSpeedWithText = (monster, text) => {
    var speed = monster.speed.split(',')
      .find(speed => {
        return speed.includes(text);
      });
    return speed === undefined ? undefined : parseInt(
      longestNumberRegex.exec(speed)[0]);
  }

  parseFlySpeed = monster => {
    return this.parseSpeedWithText(monster, 'fly');
  }

  parseSwimSpeed = monster => {
    return this.parseSpeedWithText(monster, 'swim');
  }

  parseClimbSpeed = monster => {
    return this.parseSpeedWithText(monster, 'climb');
  }

  parseBurrowSpeed = monster => {
    return this.parseSpeedWithText(monster, 'burrow');
  }

  calculateModifier = value => {
    return Math.floor((value - 10) / 2);
  }

  render() {
    var monsterSpeeds = this.parseMonsterSpeeds(this.props.children);
    return (
      <div className="monster">
        <h4>{this.props.children.name}</h4>
        <div className="remove-monster remove-button" onClick={() => this.props.removeMonster(this.props.children)}>-</div>
        <div className="monster-ac">{this.parseMonsterAc(this.props.children)}</div>
        <div className="monster-speed">
          {monsterSpeeds.groundSpeed && <div className="ground-speed">{monsterSpeeds.groundSpeed}</div>}
          {monsterSpeeds.burrowSpeed && <div className="burrow-speed">{monsterSpeeds.burrowSpeed}</div>}
          {monsterSpeeds.climbSpeed && <div className="climb-speed">{monsterSpeeds.climbSpeed}</div>}
          {monsterSpeeds.flySpeed && <div className="fly-speed">{monsterSpeeds.flySpeed}</div>}
          {monsterSpeeds.swimSpeed && <div className="swim-speed">{monsterSpeeds.swimSpeed}</div>}
        </div>
        <img className="monster-image" src={'/img/monsters/' + this.props.children.name + '.png'} alt={this.props.children.name + ' image'} />
        <h5 className="toggle" onClick={() => this.props.toggleStatsShown(this.props.children)}>Stats {this.props.children.statsShown ? '▲' : '▼'}</h5>
        {this.props.children.statsShown &&
        <div className="stats">
          {this.renderStat('Str', this.props.children.str)}
          {this.renderStat('Dex', this.props.children.dex)}
          {this.renderStat('Con', this.props.children.con)}
          {this.renderStat('Int', this.props.children.int)}
          {this.renderStat('Wis', this.props.children.wis)}
          {this.renderStat('Cha', this.props.children.cha)}
        </div>}
        <h5 className="toggle" onClick={() => this.props.toggleActionsShown(this.props.children)}>Attacks {this.props.children.actionsShown ? '▲' : '▼'}</h5>
        {this.props.children.actionsShown && this.renderActions(this.props.children.action)}
        {this.props.children.instances.map(key => {
          return <div key={key} className="creature-details">
            <span className="identifier">{key}</span>
            <span className="health-modifier-button" onClick={() => this.props.setCreatureHealth(key, this.props.creatures.get(key).health - 10)}>-10</span>
            <span className="health-modifier-button" onClick={() => this.props.setCreatureHealth(key, this.props.creatures.get(key).health - 1)}>-1</span>
            <span className="health">{this.props.creatures.get(key).health}</span>
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
    var statMod = this.calculateModifier(statValue);
    return <div className="stat roll" onClick={() => this.props.roller(1, 20, statMod)}>
      <span className="stat-name">{statName}</span>
      <span className="stat-value">{statValue}</span>
      <span className="stat-modifier">({statMod})</span>
    </div>
  }

  renderActions = (actions) => {
    return <div className="actions">
      {actions.map(action => {
        return <div key={action.name} className="action">
          <div className="action-name">{action.name}</div>
          {this.renderEntries(action.entries)}
        </div>;
      })}
    </div>;
  }

  renderEntries = (entries) => {
    return <div className="entries">
      {entries.map(entry => {
        if (typeof entry === 'string' || entry instanceof String) {
          return <SmartEntryText roller={this.props.roller}>{entry}</SmartEntryText>;
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
          <SmartEntryText roller={this.props.roller}>{item.entry}</SmartEntryText>
        </div>;
      })}
    </div>;
  }
}

export default Monster;
