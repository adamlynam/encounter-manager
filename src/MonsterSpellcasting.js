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
    return parseInt(frequency, 10) + ' per day' + (frequency.includes('e') ? ', each' : '');
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
        <div className="slots">{levels[level].slots && [...Array(levels[level].slots)].map((item, index) => {
          return <span onClick={() => this.props.togglePreparedSpellSlots(this.props.children, level, index)}>{(
            this.props.children.usedPreparedSpellSlots &&
            this.props.children.usedPreparedSpellSlots[level] &&
            this.props.children.usedPreparedSpellSlots[level][index]) ?
            '\uf14a' :
            '\uf096'}
          </span>
        })}
        </div>
        <div className="ability-name">Level {level} Spells</div>
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
