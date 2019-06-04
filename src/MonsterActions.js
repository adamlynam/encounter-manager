import React, { Component } from 'react';
import SmartEntryText from './SmartEntryText';

class MonsterActions extends Component {

  renderList = (items) => {
    return <div className="list">
      {items.map(item => {
        return <div key={item.name} className="list-item">
          <div className="item-name">{item.name}</div>
          <SmartEntryText
            entryName={item.name}
            roller={this.props.roller}
            d20Bonus={this.props.monster.challengeToHitBonus}
            polyBonus={this.props.monster.challengeDamageBonus} >{item.entry}</SmartEntryText>
        </div>;
      })}
    </div>;
  }

  renderEntries = (entryName, entries) => {
    return <div className="entries">
      {entries.map((entry, index) => {
        if (typeof entry === 'string' || entry instanceof String) {
          return <SmartEntryText
            key={index}
            entryName={entryName}
            roller={this.props.roller}
            d20Bonus={this.props.monster.challengeToHitBonus}
            polyBonus={this.props.monster.challengeDamageBonus} >{entry}</SmartEntryText>;
        }
        else {
          return this.renderList(entry.items);
        }
      })}
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

  render() {
    return <div className="actions">
      {this.props.children && <h4>{this.props.title}</h4>}
      {this.props.children && this.renderAbilities(this.props.children)}
    </div>
  }
}

export default MonsterActions;
