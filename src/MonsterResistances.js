import React, { Component } from 'react';

class MonsterResistances extends Component {

  flattenListToString = (list) => {
    if (typeof list === 'string' || list instanceof String) {
      return '';
    }
    else {
      return list.map(item => {
        if (typeof item === 'string' || item instanceof String) {
          return item;
        }
        else if (item.note && item.resist) {
          return this.flattenListToString(item.resist) + ' (' + item.note + ')';
        }
        else if (item.note && item.immune) {
          return this.flattenListToString(item.immune) + ' (' + item.note + ')';
        }
        else if (item.note && item.conditionImmune) {
          return this.flattenListToString(item.conditionImmune) + ' (' + item.note + ')';
        }
        return '';
      }).join(', ');
    }
  }

  renderResistances = (monster) => {
    return <div className="resistances">
      {this.props.children.resist && <div className="ability"><strong>Resistant</strong> to damage from {this.flattenListToString(this.props.children.resist)}</div>}
      {this.props.children.immune && <div className="ability"><strong>Immune</strong> to damage from {this.flattenListToString(this.props.children.immune)}</div>}
      {this.props.children.conditionImmune && <div className="ability"><strong>Immune</strong> to conditions {this.flattenListToString(this.props.children.conditionImmune)}</div>}
    </div>;
  }

  render() {
    return <div className="resistances">
      {(this.props.children.resist || this.props.children.immune || this.props.children.conditionImmune) && <h4>Resistances</h4>}
      {(this.props.children.resist || this.props.children.immune || this.props.children.conditionImmune) && this.renderResistances(this.props.children)}
    </div>
  }
}

export default MonsterResistances;
