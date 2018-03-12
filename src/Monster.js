import React, { Component } from 'react';
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
    var speeds = monster.speed.split(',');
    var flySpeed = speeds
      .find(speed => {
        return speed.includes(text);
      });
      console.log(flySpeed);
    return flySpeed === undefined ? undefined : parseInt(
      longestNumberRegex.exec(flySpeed)[0]);
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
          <div className="stat"><span className="stat-name">Str</span><span className="stat-value">{this.props.children.str}</span><span className="stat-modifier">({this.calculateModifier(this.props.children.str)})</span></div>
          <div className="stat"><span className="stat-name">Dex</span><span className="stat-value">{this.props.children.dex}</span><span className="stat-modifier">({this.calculateModifier(this.props.children.dex)})</span></div>
          <div className="stat"><span className="stat-name">Con</span><span className="stat-value">{this.props.children.con}</span><span className="stat-modifier">({this.calculateModifier(this.props.children.con)})</span></div>
          <div className="stat"><span className="stat-name">Int</span><span className="stat-value">{this.props.children.int}</span><span className="stat-modifier">({this.calculateModifier(this.props.children.int)})</span></div>
          <div className="stat"><span className="stat-name">Wis</span><span className="stat-value">{this.props.children.wis}</span><span className="stat-modifier">({this.calculateModifier(this.props.children.wis)})</span></div>
          <div className="stat"><span className="stat-name">Cha</span><span className="stat-value">{this.props.children.cha}</span><span className="stat-modifier">({this.calculateModifier(this.props.children.cha)})</span></div>
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
          return <div className="entry-name">{entry}</div>;
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
          <div className="item-entry">{item.entry}</div>
        </div>;
      })}
    </div>;
  }
}

export default Monster;
