import React, { Component } from 'react';
import MonsterAc from './MonsterAc';
import MonsterSize from './MonsterSize';
import MonsterImage from './MonsterImage';
import MonsterName from './MonsterName';
import MonsterSpeed from './MonsterSpeed';
import MonsterDetails from './MonsterDetails';

class Monster extends Component {
  render() {
    return <div className={'monster-info monster card' + (this.props.children.key === this.props.currentInitative ? ' current' : '') + (this.props.children.key === this.props.selectedMonster ? ' selected' : '')}>
      <div className="card-header">
        <MonsterAc>{this.props.children}</MonsterAc>
        <MonsterSize>{this.props.children}</MonsterSize>
        <MonsterImage>{this.props.children}</MonsterImage>
        <MonsterName>{this.props.children}</MonsterName>
        <MonsterSpeed>{this.props.children}</MonsterSpeed>
      </div>
      <div className="card-body">
        <MonsterDetails
          roller={this.props.roller}
          toggleInnateSpellSlots={this.props.toggleInnateSpellSlots}
          togglePreparedSpellSlots={this.props.togglePreparedSpellSlots}
          decreaseChallengeTotalHP={this.props.decreaseChallengeTotalHP}
          increaseChallengeTotalHP={this.props.increaseChallengeTotalHP}
          decreaseChallengeAC={this.props.decreaseChallengeAC}
          increaseChallengeAC={this.props.increaseChallengeAC}
          decreaseChallengeToHit={this.props.decreaseChallengeToHit}
          increaseChallengeToHit={this.props.increaseChallengeToHit}
          decreaseChallengeDamage={this.props.decreaseChallengeToHit}
          increaseChallengeDamage={this.props.increaseChallengeToHit}
          decreaseChallengeEverything={this.props.decreaseChallengeEverything}
          increaseChallengeEverything={this.props.increaseChallengeEverything} >
          {this.props.children}
        </MonsterDetails>
      </div>
    </div>
  }
}

export default Monster;
