import React, { Component } from 'react';

class InitativeTracker extends Component {

  render = () => {
    return <div className="initative-tracker">
      <h3>Initative</h3>
      <ul className="list-group">
      {[...Array.from(this.props.monsters), ...Array.from(this.props.extras)]
      .sort((a,b) => {
        return b[1].initative - a[1].initative;
      })
      .map(([key, monster]) => {
        return <li key={key} className={'list-group-item initative-row' + (key === this.props.currentInitative ? ' current' : '')}>
          <span className="monster-name">{monster.name}</span>
          <button type="button" className="remove-initative btn btn-danger btn-sm" onClick={() => this.props.removeFromInitative(key)}>-</button>
          <span className="monster-initative">{monster.initative}</span>
        </li>
      })}
      </ul>
      <button type="button" className="btn btn-primary" onClick={() => this.props.advanceInitative()}>Next in Initative</button>
      <hr />
      <div className="form-row">
        <div className="col">
          <input className="form-control" type="text" id="initative-name" placeholder="Name" value={this.props.addInitativeName} onChange={this.props.updateInitativeName} onKeyDown={this.props.captureKeyDownInitative} />
        </div>
        <div className="col">
          <input className="form-control" type="text" id="initative-value" placeholder="Initative" value={this.props.addInitativeValue} onChange={this.props.updateInitativeValue} onKeyDown={this.props.captureKeyDownInitative} />
        </div>
      </div>
      <button type="button" className="btn btn-primary" onClick={() => this.props.addExtraToInitative()}>Add to Initative</button>
    </div>;
  }
}

export default InitativeTracker;
