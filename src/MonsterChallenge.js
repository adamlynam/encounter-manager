import React, { Component } from 'react';
import MonsterChallengeEditor from './MonsterChallengeEditor';

class MonsterChallenge extends Component {

  render() {
    return <div className="challenge">
      <h4>Challenge</h4>
      <p>Challenge Rating: {this.props.children.cr}</p>
      <MonsterChallengeEditor
        decreaseChallengeTotalHP={this.props.decreaseChallengeTotalHP}
        increaseChallengeTotalHP={this.props.increaseChallengeTotalHP}
        decreaseChallengeAC={this.props.decreaseChallengeAC}
        increaseChallengeAC={this.props.increaseChallengeAC}
        decreaseChallengeToHit={this.props.decreaseChallengeToHit}
        increaseChallengeToHit={this.props.increaseChallengeToHit}
        decreaseChallengeDamage={this.props.decreaseChallengeToHit}
        increaseChallengeDamage={this.props.increaseChallengeToHit}
        decreaseChallengeEverything={this.props.decreaseChallengeEverything}
        increaseChallengeEverything={this.props.increaseChallengeEverything} >{this.props.children}</MonsterChallengeEditor>
    </div>
  }
}

export default MonsterChallenge;
