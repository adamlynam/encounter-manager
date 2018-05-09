import React, { Component } from 'react';

class SmartSpellText extends Component {

  toTitleCase = (string) => {
    return string.replace(/\w\S*/g, txt => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  formatSpellName = (spellName) => {
    return this.toTitleCase(spellName.replace(new RegExp('{@spell (.*)}'), '$1'));
  }

  render() {
    return (
      <div className="smart-entry-text">{this.formatSpellName(this.props.children)}</div>
    );
  }
}

export default SmartSpellText;
