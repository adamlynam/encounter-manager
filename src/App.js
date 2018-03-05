import React, { Component } from 'react';
import './App.css';
import Monster from './Monster';
import MonsterSearch from './MonsterSearch';

import mm from './data/bestiary/bestiary-mm.json';
import vgm from './data/bestiary/bestiary-vgm.json';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      monsters: [
        ...mm.monster,
        ...vgm.monster
      ],
      searchText: '',
  		monstersAdded: new Map(),
      creatures: new Map(),
      nextCreatureKey: 1,
  	};
  }

  updateSearchText = (event) => {
    this.setState({
      searchText: event.target.value,
		});
  }

  parseMonsterHealth = (monster) => {
    var exp = new RegExp('([0-9]*).*');
    return parseInt(monster.hp.match(exp)[1]);
  }

  addMonster = (index) => {
    this.setState((previousState, currentProps) => {
      var monstersAdded = new Map(previousState.monstersAdded);
      monstersAdded.set(
        previousState.monsters[index].name,
        Object.assign(
          previousState.monsters[index],
          {
            statsShown: false,
            instances: [previousState.nextCreatureKey],
          }
        )
      );
			return {
        searchText: '',
        monstersAdded: monstersAdded,
				creatures: this.addToCreatureList(
          previousState.creatures,
          previousState.monsters[index],
          previousState.nextCreatureKey),
        nextCreatureKey: previousState.nextCreatureKey + 1,
			};
    });
  }

  removeMonster = (monster) => {
    this.setState((previousState, currentProps) => {
      var monstersAdded = new Map(previousState.monstersAdded);
      monstersAdded.delete(monster.name);
      var creatures = new Map(previousState.creatures);
      monster.instances.forEach(instance => {
        creatures.delete(instance);
      });
			return {
        monstersAdded: monstersAdded,
        creatures: creatures,
			};
    });
  }

  toggleStatsShown = (monster) => {
    this.setState((previousState, currentProps) => {
      var monstersAdded = new Map(previousState.monstersAdded);
      monstersAdded.set(
        monster.name,
        Object.assign(
          monster,
          {
            statsShown: !monster.statsShown,
          }
        )
      );
			return {
        monstersAdded: monstersAdded,
			};
    });
  }

  addToCreatureList = (creatures, monster, key) => {
    var newCreatures = new Map(creatures);
    newCreatures.set(key, Object.assign({}, {
      key: key,
      health: this.parseMonsterHealth(monster),
    }));
    return newCreatures;
  }

  addCreature = (monster) => {
    this.setState((previousState, currentProps) => {
      var monstersAdded = new Map(previousState.monstersAdded);
      monstersAdded.set(monster.name, Object.assign(previousState.monstersAdded.get(monster.name), {
        instances: [
          ...previousState.monstersAdded.get(monster.name).instances,
          previousState.nextCreatureKey],
      }));
			return {
        monstersAdded: monstersAdded,
				creatures: this.addToCreatureList(
          previousState.creatures,
          monster,
          previousState.nextCreatureKey),
        nextCreatureKey: previousState.nextCreatureKey + 1,
			};
    });
  }

  removeCreature = (monster, key) => {
    this.setState((previousState, currentProps) => {
      var monstersAdded = new Map(previousState.monstersAdded);
      monstersAdded.set(monster.name, Object.assign(previousState.monstersAdded.get(monster.name), {
        instances: previousState.monstersAdded.get(monster.name).instances.filter(item => item !== key),
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
          return <Monster
            key={key}
            creatures={this.state.creatures}
            removeMonster={this.removeMonster}
            toggleStatsShown={this.toggleStatsShown}
            addCreature={this.addCreature}
            removeCreature={this.removeCreature}
            setCreatureHealth={this.setCreatureHealth}>
              {monster}
          </Monster>
        })}
      </div>
    );
  }
}

export default App;
