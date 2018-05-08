import React, { Component } from 'react';

class MonsterSpellcasting extends Component {

  render() {
    return <div className="monster-details">
      {this.props.children.spellcasting && <h4>Spellcasting</h4>}
      {this.props.children.spellcasting && <div className="ability">This monster can cast spells.</div>}
    </div>
  }
}

export default MonsterSpellcasting;
