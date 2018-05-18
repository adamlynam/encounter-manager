import React, { Component } from 'react';
import SmartSpellText from './SmartSpellText';

const OFFSET = 100;

class MonsterSpellcasting extends Component {

  renderAtWillSpells = (spells) => {
    return <div className="abilities">
      <div className="ability">
        <div className="ability-name">Unlimited</div>
        <div className="list">
          {spells.map((spell, index) => {
            return this.renderSpell(spell, index, 0);
          })}
        </div>
      </div>
    </div>
  }

  isFrequencyForEachSpell = (frequency) => {
    return frequency.includes('e');
  }

  getDailySpellFrequency = (frequency) => {
    return parseInt(frequency, 10);
  }

  modifiedEachFrequency = (frequency, index) => {
    return this.getDailySpellFrequency(frequency) * OFFSET + index;
  }

  renderDailySpells = (frequencies) => {
    return <div className="abilities">{Object.keys(frequencies).reverse().map(frequency => {
      return <div key={frequency} className="ability">
        <div className="slots">{!this.isFrequencyForEachSpell(frequency) && [...Array(this.getDailySpellFrequency(frequency))].map((item, index) => {
          return <span key={index} onClick={() => this.props.toggleInnateSpellSlots(this.props.children, frequency, index)}>{(
            this.props.children.usedInnateSpellSlots &&
            this.props.children.usedInnateSpellSlots[frequency] &&
            this.props.children.usedInnateSpellSlots[frequency][index]) ?
            '\uf14a' :
            '\uf096'}
          </span>
        })}
        </div>
        <div className="ability-name">{this.getDailySpellFrequency(frequency)} per day{this.isFrequencyForEachSpell(frequency) ? ', each' : ''}</div>
        <div className="list">
          {frequencies[frequency].map((spell, index) => {
            return this.renderSpell(spell,
              this.modifiedEachFrequency(frequency, index),
              this.isFrequencyForEachSpell(frequency) ? this.getDailySpellFrequency(frequency) : 0);
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
          return <span key={index} onClick={() => this.props.togglePreparedSpellSlots(this.props.children, level, index)}>{(
            this.props.children.usedPreparedSpellSlots &&
            this.props.children.usedPreparedSpellSlots[level] &&
            this.props.children.usedPreparedSpellSlots[level][index]) ?
            '\uf14a' :
            '\uf096'}
          </span>
        })}
        </div>
        <div className="ability-name">{level > 0 ? 'Level ' + level + ' Spells' : 'Cantrips'}</div>
        <div className="list">
          {levels[level].spells.map((spell, index) => {
            return this.renderSpell(spell, index, 0);
          })}
        </div>
      </div>
    })}
    </div>
  }

  renderSpell = (spell, spellIndex, slots) => {
    return <div className="spell" key={spellIndex}>
      <div className="slots">{[...Array(slots)].map((item, index) => {
        return <span key={index} onClick={() => this.props.toggleInnateSpellSlots(this.props.children, spellIndex, index)}>{(
          this.props.children.usedInnateSpellSlots &&
          this.props.children.usedInnateSpellSlots[spellIndex] &&
          this.props.children.usedInnateSpellSlots[spellIndex][index]) ?
          '\uf14a' :
          '\uf096'}
        </span>
      })}
      </div>
      <SmartSpellText>{spell}</SmartSpellText>
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
