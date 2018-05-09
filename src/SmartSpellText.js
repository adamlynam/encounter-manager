import React, { Component } from 'react';

class SmartSpellText extends Component {

  formatSpellName = (spellName) => {
    return spellName.replace(new RegExp('{@spell (.*)}'), '$1');
  }

  render() {
    return (
      <div className="smart-entry-text">{this.formatSpellName(this.props.children)}</div>
    );
  }
}

export default SmartSpellText;
