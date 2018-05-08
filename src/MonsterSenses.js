import React, { Component } from 'react';

class MonsterSenses extends Component {

  render() {
    return <div className="senses">
      {this.props.children.senses && <h4>Senses</h4>}
      {this.props.children.senses && <div className="ability"><strong>Senses</strong> include {this.props.children.senses}</div>}
    </div>
  }
}

export default MonsterSenses;
