import React, { Component } from 'react';
import MonsterTools from './MonsterTools';

class MonsterSkills extends Component {

  renderSkill = (statName, statMod, proficient) => {
    return <div className="skill roll" onClick={() => this.props.roller(statName + ' Check', 1, 20, statMod)}>
      <span className="skill-proficient">{proficient ? '*' : '\u00a0'}</span>
      <span className="skill-name">{statName}</span>
      <span className="skill-modifier">({statMod})</span>
    </div>
  }

  renderSkills = (monster) => {
    var skills = MonsterTools.parseMonsterSkills(monster);
    return <div className="skills">
      {this.renderSkill(
        'Acrobatics',
        skills.acrobatics ? skills.acrobatics : MonsterTools.calculateModifier(this.props.children.dex),
        skills.acrobatics ? true : false)}
      {this.renderSkill(
        'Animal Handling',
        skills.animalHandling ? skills.animalHandling : MonsterTools.calculateModifier(this.props.children.wis),
        skills.animalHandling ? true : false)}
      {this.renderSkill(
        'Arcana',
        skills.arcana ? skills.arcana : MonsterTools.calculateModifier(this.props.children.int),
        skills.arcana ? true : false)}
      {this.renderSkill(
        'Athletics',
        skills.athletics ? skills.athletics : MonsterTools.calculateModifier(this.props.children.str),
        skills.athletics ? true : false)}
      {this.renderSkill(
        'Deception',
        skills.deception ? skills.deception : MonsterTools.calculateModifier(this.props.children.cha),
        skills.deception ? true : false)}
      {this.renderSkill(
        'History',
        skills.history ? skills.history : MonsterTools.calculateModifier(this.props.children.int),
        skills.history ? true : false)}
      {this.renderSkill(
        'Insight',
        skills.insight ? skills.insight : MonsterTools.calculateModifier(this.props.children.wis),
        skills.insight ? true : false)}
      {this.renderSkill(
        'Intimidation',
        skills.intimidation ? skills.intimidation : MonsterTools.calculateModifier(this.props.children.cha),
        skills.intimidation ? true : false)}
      {this.renderSkill(
        'Investigation',
        skills.investigation ? skills.investigation : MonsterTools.calculateModifier(this.props.children.int),
        skills.investigation ? true : false)}
      {this.renderSkill(
        'Medicine',
        skills.medicine ? skills.medicine : MonsterTools.calculateModifier(this.props.children.wis),
        skills.medicine ? true : false)}
      {this.renderSkill(
        'Nature',
        skills.nature ? skills.nature : MonsterTools.calculateModifier(this.props.children.int),
        skills.nature ? true : false)}
      {this.renderSkill(
        'Perception',
        skills.perception ? skills.perception : MonsterTools.calculateModifier(this.props.children.wis),
        skills.perception ? true : false)}
      {this.renderSkill(
        'Performance',
        skills.performance ? skills.performance : MonsterTools.calculateModifier(this.props.children.cha),
        skills.performance ? true : false)}
      {this.renderSkill(
        'Persuasion',
        skills.persuasion ? skills.persuasion : MonsterTools.calculateModifier(this.props.children.cha),
        skills.persuasion ? true : false)}
      {this.renderSkill(
        'Religion',
        skills.religion ? skills.religion : MonsterTools.calculateModifier(this.props.children.int),
        skills.religion ? true : false)}
      {this.renderSkill(
        'Slight of Hand',
        skills.sleightOfHand ? skills.sleightOfHand : MonsterTools.calculateModifier(this.props.children.dex),
        skills.sleightOfHand ? true : false)}
      {this.renderSkill(
        'Stealth',
        skills.stealth ? skills.stealth : MonsterTools.calculateModifier(this.props.children.dex),
        skills.stealth ? true : false)}
      {this.renderSkill(
        'Survival',
        skills.survival ? skills.survival : MonsterTools.calculateModifier(this.props.children.wis),
        skills.survival ? true : false)}
    </div>
  }

  render() {
    return <div className="skils">
      <h4>Skills</h4>
      {this.renderSkills(this.props.children)}
    </div>
  }
}

export default MonsterSkills;
