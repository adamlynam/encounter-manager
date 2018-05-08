import React, { Component } from 'react';

class MonsterLanguages extends Component {

  renderLanguages = (monster) => {
    return <div className="languages ability">{this.props.children.languages ? this.props.children.languages : 'None'}</div>
  }

  render() {
    return <div className="languages">
      <h4>Languages</h4>
      {this.renderLanguages(this.props.children)}
    </div>
  }
}

export default MonsterLanguages;
