import React, { Component } from 'react';

import MonsterAc from './MonsterAc';
import MonsterImage from './MonsterImage';
import MonsterName from './MonsterName';
import MonsterSavingThrows from './MonsterSavingThrows';
import Creatures from './Creatures';

class MonstersInfo extends Component {
  render() {
    return <div className="monsters-info">
      {Array.from(this.props.monstersAdded).reverse().map(([key, monster]) => {
        return (
          <div key={key} className={'monster card' + (key === this.props.currentInitative ? ' current' : '') + (key === this.props.selectedMonster ? ' selected' : '')}>
            <div className="card-header toggle" onClick={() => this.props.setSelectedMonster(monster)}>
              <MonsterImage>{monster}</MonsterImage>
              <MonsterName>{monster}</MonsterName>
              <button type="button" className="remove-monster btn btn-danger btn-sm" onClick={(event) => {
                event.preventDefault()
                event.stopPropagation();
                event.nativeEvent.stopImmediatePropagation();
                this.props.removeMonster(key);
              }}>-</button>
            </div>
            <div className="card-body">
              <div className="container">
                <div className="row">
                  <div className="col-4">
                    <MonsterAc>{monster}</MonsterAc>
                    <MonsterSavingThrows shortNames={true} roller={this.props.roller} >{monster}</MonsterSavingThrows>
                  </div>
                  <div className="col-8">
                    <Creatures
                      monster={monster}
                      creatures={this.props.creatures}
                      addCreature={this.props.addCreature}
                      removeCreature={this.props.removeCreature}
                      toggleCreatureHealthEdit={this.props.toggleCreatureHealthEdit}
                      updateCreatureHealthText={this.props.updateCreatureHealthText}
                      setCreatureHealth={this.props.setCreatureHealth} >{monster.instances}</Creatures>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  }
}

export default MonstersInfo;
