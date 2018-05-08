import React, { Component } from 'react';

class MonsterImage extends Component {
  render() {
    return <img className="monster-image" src={'/img/monsters/' + this.props.children.name + '.png'} alt={this.props.children.name + ' image'} />
  }
}

export default MonsterImage;
