import React, { Component } from 'react';

class Monster extends Component {
  render() {
    return (
      <div className="monster">
        <h5>{this.props.children.key}</h5>
        <img className="monster-image" src="https://static.5etools.com/img/MM/Goblin.png?ver=1.19.0" />
        {this.props.children.instances.map(key => {
          return <div key={key} className="monster-details">
            <span className="identifier">{key}</span>
            <span className="health-modifier-button" onClick={() => this.props.setCreatureHealth(key, this.props.creatures.get(key).health - 10)}>-10</span>
            <span className="health-modifier-button" onClick={() => this.props.setCreatureHealth(key, this.props.creatures.get(key).health - 1)}>-1</span>
            <span className="health">{this.props.creatures.get(key).health}</span>
            <span className="health-modifier-button" onClick={() => this.props.setCreatureHealth(key, this.props.creatures.get(key).health + 1)}>+1</span>
            <span className="health-modifier-button" onClick={() => this.props.setCreatureHealth(key, this.props.creatures.get(key).health + 10)}>+10</span>
            <span className="remove-creature" onClick={() => this.props.removeCreature(this.props.children, key)}>-</span>
          </div>
        })}
        <div className="add-creature" onClick={() => this.props.addCreature(this.props.children)}>+</div>
      </div>
    );
  }
}

export default Monster;
