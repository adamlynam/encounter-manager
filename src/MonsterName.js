import React, { Component } from 'react';

class MonsterName extends Component {
  render() {
    return <h3>{this.props.children.name}</h3>
  }
}

export default MonsterName;
