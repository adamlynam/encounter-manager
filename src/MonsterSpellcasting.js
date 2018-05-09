import React, { Component } from 'react';
import SmartSpellText from './SmartSpellText';

class MonsterSpellcasting extends Component {

  renderAtWillSpells = (spells) => {
    return <div className="abilities">
      <div className="ability">
        <div className="ability-name">Unlimited</div>
        <div className="list">
          {spells.map((spell, index) => {
            return <SmartSpellText key={index}>{spell}</SmartSpellText>
          })}
        </div>
      </div>
    </div>
  }

  getDailySpellFrequency = (frequency) => {
    return parseInt(frequency, 10) + '/day' + (frequency.includes('e') ? ' each' : '');
  }

  renderDailySpells = (frequencies) => {
    return <div className="abilities">{Object.keys(frequencies).reverse().map(frequency => {
      return <div key={frequency} className="ability">
        <div className="ability-name">{this.getDailySpellFrequency(frequency)}</div>
        <div className="list">
          {frequencies[frequency].map((spell, index) => {
            return <SmartSpellText key={index}>{spell}</SmartSpellText>
          })}
        </div>
      </div>
    })}
    </div>
  }

  renderPreparedSpells = (levels) => {
    return <div className="abilities">{Object.keys(levels).map(level => {
      return <div key={level} className="ability">
        <div className="ability-name">Level {level} Spells{levels[level].slots && ' (' + levels[level].slots + ' slots)'}</div>
        <div className="list">
          {levels[level].spells.map((spell, index) => {
            return <SmartSpellText key={index}>{spell}</SmartSpellText>
          })}
        </div>
      </div>
    })}
    </div>
  }

  render() {
    return <div className="spellcasting">
      {this.props.children.spellcasting && this.props.children.spellcasting.map((type, index) => {
        return <div key={index}>
          <h4>{type.name}</h4>
          <div className="abilities">
            <div className="ability">
              {type.headerEntries.join(', ')}
            </div>
          </div>
          {type.will && this.renderAtWillSpells(type.will)}
          {type.daily && this.renderDailySpells(type.daily)}
          {type.spells && this.renderPreparedSpells(type.spells)}
        </div>
      })}
    </div>
  }
}

export default MonsterSpellcasting;
