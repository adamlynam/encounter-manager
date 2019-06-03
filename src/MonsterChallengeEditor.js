import React, { Component } from 'react';

class MonsterChallengeEditor extends Component {

  render() {
    return <div className="challenge-editor">
      <button type="button" className="btn btn-primary" onClick={() => this.props.decreaseChallengeTotalHP(this.props.children)}>Decrease Total HP</button>
      <button type="button" className="btn btn-primary" onClick={() => this.props.increaseChallengeTotalHP(this.props.children)}>Increase Total HP</button>
      <button type="button" className="btn btn-primary" onClick={() => this.props.decreaseChallengeAC(this.props.children)}>Decrease AC</button>
      <button type="button" className="btn btn-primary" onClick={() => this.props.increaseChallengeAC(this.props.children)}>Increase AC</button>
      <button type="button" className="btn btn-primary" onClick={() => this.props.decreaseChallengeToHit(this.props.children)}>Decrease Hit Chance</button>
      <button type="button" className="btn btn-primary" onClick={() => this.props.increaseChallengeToHit(this.props.children)}>Increase Hit Chance</button>
      <button type="button" className="btn btn-primary" onClick={() => this.props.decreaseChallengeDamage(this.props.children)}>Decrease Damage</button>
      <button type="button" className="btn btn-primary" onClick={() => this.props.increaseChallengeDamage(this.props.children)}>Increase Damage</button>
      <button type="button" className="btn btn-primary" onClick={() => this.props.decreaseChallengeEverything(this.props.children)}>Decrease Everything</button>
      <button type="button" className="btn btn-primary" onClick={() => this.props.increaseChallengeEverything(this.props.children)}>Increase Everything</button>
    </div>
  }
}

export default MonsterChallengeEditor;
