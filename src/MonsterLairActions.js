import React, { Component } from 'react';

class MonsterLairActions extends Component {

  render() {
    return <div className="lair-actions">
      {this.props.children.cr && this.props.children.cr.lair && <h4>Lair Actions</h4>}
      {this.props.children.cr && this.props.children.cr.lair && <div className="ability">This monster has lair actions</div>}
    </div>
  }
}

export default MonsterLairActions;
