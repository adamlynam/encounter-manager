import React, { Component } from 'react';
import './App.css';
import Monster from './Monster';
import MonsterSearch from './MonsterSearch';

import mm from './data/bestiary/bestiary-mm.json';

class App extends Component {

  constructor(props) {
    super(props);
    var creatures = new Map();
    creatures.set(1, {
        key: 1,
        health: 7,
      });
    creatures.set(2, {
        key: 2,
        health: 7,
      });
    creatures.set(3, {
        key: 3,
        health: 8,
      });
    creatures.set(4, {
        key: 4,
        health: 8,
      });
    var monsters = new Map();
    monsters.set('Goblin', {
      key: 'Goblin',
      defaultHealth: 7,
      instances: [
        1,
        2,
      ],
    });
    monsters.set('Orc', {
      key: 'Orc',
      defaultHealth: 8,
      instances: [
        3,
        4,
      ],
    });
    this.state = {
      monsterNames: mm.monster.map(monster => monster.name),
      searchText: '',
  		monsters: monsters,
      creatures: creatures,
      nextCreatureKey: 5,
  	};
  }

  updateSearchText = (event) => {
    this.setState({
      searchText: event.target.value,
		});
  }

  addCreature = (monster) => {
    this.setState((previousState, currentProps) => {
      var monsters = new Map(previousState.monsters);
      monsters.set(monster.key, Object.assign(previousState.monsters.get(monster.key), {
        instances: [
          ...previousState.monsters.get(monster.key).instances,
          previousState.nextCreatureKey],
      }));
      var creatures = new Map(previousState.creatures);
      creatures.set(previousState.nextCreatureKey, Object.assign({}, {
        key: previousState.nextCreatureKey,
        health: monster.defaultHealth,
      }));
			return {
        monsters: monsters,
				creatures: creatures,
        nextCreatureKey: previousState.nextCreatureKey + 1,
			};
    });
  }

  removeCreature = (monster, key) => {
    this.setState((previousState, currentProps) => {
      var monsters = new Map(previousState.monsters);
      monsters.set(monster.key, Object.assign(previousState.monsters.get(monster.key), {
        instances: previousState.monsters.get(monster.key).instances.filter(item => item !== key),
      }));
      var creatures = new Map(previousState.creatures);
      creatures.delete(key);
			return {
        monsters: monsters,
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
        <MonsterSearch monsterNames={this.state.monsterNames} searchText={this.state.searchText} updateSearchText={this.updateSearchText} />
        {Array.from(this.state.monsters).map(([key, monster]) => {
          return <Monster key={key} creatures={this.state.creatures} addCreature={this.addCreature} removeCreature={this.removeCreature} setCreatureHealth={this.setCreatureHealth}>{monster}</Monster>
        })}
      </div>
    );
  }
}

export default App;
