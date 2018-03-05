import React, { Component } from 'react';

class Monster extends Component {
  calculateModifier = value => {
    return Math.floor((value - 10) / 2);
  }

  render() {
    return (
      <div className="monster">
        <h4>{this.props.children.name}</h4>
        <div className="remove-monster remove-button" onClick={() => this.props.removeMonster(this.props.children)}>-</div>
        <img className="monster-image" src={'/img/' + this.props.children.name + '.png'} alt={this.props.children.name + ' image'} />
        <h5 className="stats-toggle" onClick={() => this.props.toggleStatsShown(this.props.children)}>Stats {this.props.children.statsShown ? '▲' : '▼'}</h5>
        {this.props.children.statsShown &&
        <div className="stats">
          <div className="stat"><span className="stat-name">Str</span><span className="stat-value">{this.props.children.str}</span><span className="stat-modifier">({this.calculateModifier(this.props.children.str)})</span></div>
          <div className="stat"><span className="stat-name">Dex</span><span className="stat-value">{this.props.children.dex}</span><span className="stat-modifier">({this.calculateModifier(this.props.children.dex)})</span></div>
          <div className="stat"><span className="stat-name">Con</span><span className="stat-value">{this.props.children.con}</span><span className="stat-modifier">({this.calculateModifier(this.props.children.con)})</span></div>
          <div className="stat"><span className="stat-name">Int</span><span className="stat-value">{this.props.children.int}</span><span className="stat-modifier">({this.calculateModifier(this.props.children.int)})</span></div>
          <div className="stat"><span className="stat-name">Wis</span><span className="stat-value">{this.props.children.wis}</span><span className="stat-modifier">({this.calculateModifier(this.props.children.wis)})</span></div>
          <div className="stat"><span className="stat-name">Cha</span><span className="stat-value">{this.props.children.cha}</span><span className="stat-modifier">({this.calculateModifier(this.props.children.cha)})</span></div>
        </div>}
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
}

export default Monster;
