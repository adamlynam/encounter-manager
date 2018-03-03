import React, { Component } from 'react';
import './App.css';
import Monster from './Monster';
import MonsterSearch from './MonsterSearch';

import mm from './data/bestiary/bestiary-mm.json';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      monsters: mm.monster,
      searchText: '',
  		monstersAdded: new Map(),
      creatures: new Map(),
      nextCreatureKey: 5,
  	};
  }

  updateSearchText = (event) => {
    this.setState({
      searchText: event.target.value,
		});
  }

  parseMonsterHealth = (monster) => {
    var exp = new RegExp('([0-9]*).*');
    return monster.hp.match(exp)[1];
  }

  addMonster = (index) => {
    this.setState((previousState, currentProps) => {
      var monstersAdded = new Map(previousState.monstersAdded);
      monstersAdded.set(mm.monster[index].name, {
        key: mm.monster[index].name,
        defaultHealth: this.parseMonsterHealth(mm.monster[index]),
        instances: [],
      });
			return {
        monstersAdded: monstersAdded,
        searchText: '',
			};
    });
  }

  addCreature = (monster) => {
    this.setState((previousState, currentProps) => {
      var monstersAdded = new Map(previousState.monstersAdded);
      monstersAdded.set(monster.key, Object.assign(previousState.monstersAdded.get(monster.key), {
        instances: [
          ...previousState.monstersAdded.get(monster.key).instances,
          previousState.nextCreatureKey],
      }));
      var creatures = new Map(previousState.creatures);
      creatures.set(previousState.nextCreatureKey, Object.assign({}, {
        key: previousState.nextCreatureKey,
        health: monster.defaultHealth,
      }));
			return {
        monstersAdded: monstersAdded,
				creatures: creatures,
        nextCreatureKey: previousState.nextCreatureKey + 1,
			};
    });
  }

  removeCreature = (monster, key) => {
    this.setState((previousState, currentProps) => {
      var monstersAdded = new Map(previousState.monstersAdded);
      monstersAdded.set(monster.key, Object.assign(previousState.monstersAdded.get(monster.key), {
        instances: previousState.monstersAdded.get(monster.key).instances.filter(item => item !== key),
      }));
      var creatures = new Map(previousState.creatures);
      creatures.delete(key);
			return {
        monstersAdded: monstersAdded,
				creatures: creatures,
			};
    });
  }

  setCreatureHealth = (key, newHealth) => {
    this.setState((previousState, currentProps) => {
      var creatures = new Map(previousState.creatures);
      creatures.set(key, Object.assign(creatures.get(key), {
        health: newHealth,
      }));
			return {
				creatures: creatures,
			};
    });
  }

  render = () => {
    return (
      <div>
        <MonsterSearch monsters={this.state.monsters} searchText={this.state.searchText} updateSearchText={this.updateSearchText} addMonster={this.addMonster} />
        {Array.from(this.state.monstersAdded).map(([key, monster]) => {
          return <Monster key={key} creatures={this.state.creatures} addCreature={this.addCreature} removeCreature={this.removeCreature} setCreatureHealth={this.setCreatureHealth}>{monster}</Monster>
        })}
      </div>
    );
  }
}

export default App;
