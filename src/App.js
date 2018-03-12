import React, { Component } from 'react';
import './App.css';
import Monster from './Monster';
import MonsterSearch from './MonsterSearch';
import Rolls from './Rolls';

import cos from './data/bestiary/bestiary-cos.json';
import dmg from './data/bestiary/bestiary-dmg.json';
import hotdq from './data/bestiary/bestiary-hotdq.json';
import lmop from './data/bestiary/bestiary-lmop.json';
import mm from './data/bestiary/bestiary-mm.json';
import oota from './data/bestiary/bestiary-oota.json';
import phb from './data/bestiary/bestiary-phb.json';
import pota from './data/bestiary/bestiary-pota.json';
import rot from './data/bestiary/bestiary-rot.json';
import skt from './data/bestiary/bestiary-skt.json';
import tftyp from './data/bestiary/bestiary-tftyp.json';
import toa from './data/bestiary/bestiary-toa.json';
import ttp from './data/bestiary/bestiary-ttp.json';
import vgm from './data/bestiary/bestiary-vgm.json';
import xge from './data/bestiary/bestiary-xge.json';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      monsters: [
        ...cos.monster,
        ...dmg.monster,
        ...hotdq.monster,
        ...lmop.monster,
        ...mm.monster,
        ...oota.monster,
        ...phb.monster,
        ...pota.monster,
        ...rot.monster,
        ...skt.monster,
        ...tftyp.monster,
        ...toa.monster,
        ...ttp.monster,
        ...vgm.monster,
        ...xge.monster,
      ],
      searchText: '',
  		monstersAdded: new Map(),
      creatures: new Map(),
      nextCreatureKey: 1,
      rolls: [],
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
            actionsShown: false,
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

  toggleActionsShown = (monster) => {
    this.setState((previousState, currentProps) => {
      var monstersAdded = new Map(previousState.monstersAdded);
      monstersAdded.set(
        monster.name,
        Object.assign(
          monster,
          {
            actionsShown: !monster.actionsShown,
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

  saveRoll = (name, total, rolls, modifier) => {
    this.setState((previousState, currentProps) => {
			return {
				rolls: [
          ...previousState.rolls,
          {
            name: name,
            total: total,
            rolls: rolls,
            modifier: modifier,
          }
        ],
			};
    });
  }

  roller = (name, number, sides, modifier) => {
    var rolls = [];
    for (var i = 0; i < number; i++) {
      rolls.push(Math.floor(Math.random() * sides) + 1);
    }
    var total = rolls.reduce((a, b) => a + b, 0) + (modifier ? modifier : 0);
    this.saveRoll(name, total, rolls, (modifier ? modifier : 0));
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
            toggleActionsShown={this.toggleActionsShown}
            addCreature={this.addCreature}
            removeCreature={this.removeCreature}
            setCreatureHealth={this.setCreatureHealth}
            roller={this.roller}>
              {monster}
          </Monster>
        })}
        <Rolls>{this.state.rolls}</Rolls>
      </div>
    );
  }
}

export default App;
