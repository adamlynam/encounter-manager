import React, { Component } from 'react';

class MonsterResistances extends Component {

  renderResistances = (monster) => {
    return <div className="resistances">
      {this.props.children.resist && <div className="ability"><strong>Resistant</strong> to damage from {this.props.children.resist}</div>}
      {this.props.children.immune && <div className="ability"><strong>Immune</strong> to damage from {this.props.children.immune}</div>}
      {this.props.children.conditionImmune && <div className="ability"><strong>Immune</strong> to conditions {this.props.children.conditionImmune}</div>}
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
