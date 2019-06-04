import React, { Component } from 'react';

class MonsterChallenge extends Component {

  render() {
    return <div className="challenge">
      <h4>Challenge</h4>
      <p>Challenge Rating: {this.props.children.cr} {this.props.children.challengeAdjusted && <span className="adjusted-challenge-rating">({Math.ceil(this.props.children.challengeAdjusted)})</span>}</p>
      <div class="btn-toolbar justify-content-between" role="toolbar">
        <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => this.props.decreaseChallengeTotalHP(this.props.children)}>Decrease Total HP</button>
        <button type="button" className="btn btn-outline-success btn-sm" onClick={() => this.props.increaseChallengeTotalHP(this.props.children)}>Increase Total HP</button>
      </div>
      <div class="btn-toolbar justify-content-between" role="toolbar">
        <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => this.props.decreaseChallengeAC(this.props.children)}>Decrease AC</button>
        <button type="button" className="btn btn-outline-success btn-sm" onClick={() => this.props.increaseChallengeAC(this.props.children)}>Increase AC</button>
      </div>
      <div class="btn-toolbar justify-content-between" role="toolbar">
        <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => this.props.decreaseChallengeToHit(this.props.children)}>Decrease Hit Chance</button>
        <button type="button" className="btn btn-outline-success btn-sm" onClick={() => this.props.increaseChallengeToHit(this.props.children)}>Increase Hit Chance</button>
      </div>
      <div class="btn-toolbar justify-content-between" role="toolbar">
        <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => this.props.decreaseChallengeDamage(this.props.children)}>Decrease Damage</button>
        <button type="button" className="btn btn-outline-success btn-sm" onClick={() => this.props.increaseChallengeDamage(this.props.children)}>Increase Damage</button>
      </div>
      <div class="btn-toolbar justify-content-between" role="toolbar">
        <button type="button" className="btn btn-outline-danger" onClick={() => this.props.decreaseChallengeEverything(this.props.children)}>Decrease Everything</button>
        <button type="button" className="btn btn-outline-success" onClick={() => this.props.increaseChallengeEverything(this.props.children)}>Increase Everything</button>
      </div>
    </div>
  }
}

export default MonsterChallenge;
