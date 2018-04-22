import React, { Component } from 'react';

class InitativeTracker extends Component {

  render = () => {
    return <div className="initative-tracker">
      <h3>Initative</h3>
      {Array.from(this.props.monsters)
      .sort((a,b) => {
        return b[1].initative - a[1].initative;
      })
      .map(([key, monster]) => {
        return <div key={key} className="initative-row"><span className="monster-name">{monster.name}</span><span className="monster-initative">{monster.initative}</span></div>
      })}
    </div>;
  }
}

export default InitativeTracker;
