import React, { Component } from 'react';
import './App.css';
import MonsterTools from './MonsterTools';
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

const ENTER_KEY = 13;
const ARROW_KEY_UP = 38;
const ARROW_KEY_DOWN = 40;
const longestNumberRegex = new RegExp('[0-9]+');

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
      searchSelected: undefined,
      searchResults: new Map(),
  		monstersAdded: new Map(),
      creatures: new Map(),
      nextCreatureKey: 1,
      rolls: [],
  	};
  }

  updateSearchText = (event) => {
    var searchResults = new Map();
    if (event.target.value) {
      this.state.monsters.forEach((monster, index) => {
        if (monster.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1) {
          searchResults.set(index, monster);
        }
      });
    }
    this.setState({
      searchText: event.target.value,
      searchSelected: undefined,
      searchResults: searchResults,
		});
  }

  captureKeyDownSearch = (event) => {
    switch (event.keyCode) {
      case ARROW_KEY_UP:
        this.setState((previousState, currentProps) => {
          return {
            searchSelected: previousState.searchSelected !== undefined ? Math.max(previousState.searchSelected - 1, 0) : previousState.searchResults.size - 1,
          }
    		});
        break;
      case ARROW_KEY_DOWN:
        this.setState((previousState, currentProps) => {
          return {
            searchSelected: previousState.searchSelected !== undefined ? Math.min(previousState.searchSelected + 1, previousState.searchResults.size - 1) : 0,
          }
    		});
        break;
      case ENTER_KEY:
        if (this.state.searchSelected !== undefined) {
          this.addMonster(Array.from(this.state.searchResults)[this.state.searchSelected][0])
        }
        break;
    }
  }

  addMonster = (index) => {
    this.setState((previousState, currentProps) => {
      var monstersAdded = new Map(previousState.monstersAdded);
      monstersAdded.set(
        previousState.monsters[index].name,
        Object.assign(
          previousState.monsters[index],
          {
            statBlockShown: false,
            statsShown: false,
            resistancesShown: false,
            traitsShown: false,
            actionsShown: true,
            instances: [previousState.nextCreatureKey],
          }
        )
      );
			return {
        searchText: '',
        searchSelected: undefined,
        searchResults: [],
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

  toggleMonsterSection = (monster, newProperties) => {
    this.setState((previousState, currentProps) => {
      var monstersAdded = new Map(previousState.monstersAdded);
      monstersAdded.set(
        monster.name,
        Object.assign(
          monster,
          newProperties
        )
      );
			return {
        monstersAdded: monstersAdded,
			};
    });
  }

  toggleStatBlockShown = (monster) => {
    this.toggleMonsterSection(monster, {
      statBlockShown: !monster.statBlockShown,
    });
  }

  toggleStatsShown = (monster) => {
    this.toggleMonsterSection(monster, {
      statsShown: !monster.statsShown,
    });
  }

  toggleSavesShown = (monster) => {
    this.toggleMonsterSection(monster, {
      savesShown: !monster.savesShown,
    });
  }

  toggleResistancesShown = (monster) => {
    this.toggleMonsterSection(monster, {
      resistancesShown: !monster.resistancesShown,
    });
  }

  toggleTraitsShown = (monster) => {
    this.toggleMonsterSection(monster, {
      traitsShown: !monster.traitsShown,
    });
  }

  toggleActionsShown = (monster) => {
    this.toggleMonsterSection(monster, {
      actionsShown: !monster.actionsShown,
    });
  }

  addToCreatureList = (creatures, monster, key) => {
    var newCreatures = new Map(creatures);
    newCreatures.set(key, Object.assign({}, {
      key: key,
      health: MonsterTools.parseMonsterHealth(monster),
      uniqueDescription: MonsterTools.generateMonsterDescription(monster),
      editingHealth: false,
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

  toggleCreatureHealthEdit = (key) => {
    this.setState((previousState, currentProps) => {
      var creatures = new Map(previousState.creatures);
      creatures.set(key, Object.assign(creatures.get(key), {
        editingHealth: !creatures.get(key).editingHealth,
        editHealthValue: creatures.get(key).health,
      }));
			return {
				creatures: creatures,
			};
    });
  }

  updateCreatureHealthText = (key, text) => {
    this.setState((previousState, currentProps) => {
      var creatures = new Map(previousState.creatures);
      creatures.set(key, Object.assign(creatures.get(key), {
        editHealthValue: text,
      }));
			return {
				creatures: creatures,
			};
    });
  }

  setCreatureHealth = (key, newHealth) => {
    var newProperties = {
      editingHealth: false,
    };
    var longestNumberResults = longestNumberRegex.exec(newHealth);
    if (longestNumberResults) {
      var longestNumber = parseInt(longestNumberResults[0]);
      if (longestNumber) {
        if (newHealth.includes && newHealth.includes('+')) {
          newProperties.health = this.state.creatures.get(key).health + longestNumber;
        }
        else if (newHealth.includes && newHealth.includes('-')) {
          newProperties.health = this.state.creatures.get(key).health - longestNumber;
        }
        else {
          newProperties.health = longestNumber;
        }
      }
    }
    this.setState((previousState, currentProps) => {
      var creatures = new Map(previousState.creatures);
      creatures.set(key, Object.assign(creatures.get(key), newProperties));
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
        <MonsterSearch
          monsters={this.state.monsters}
          searchText={this.state.searchText}
          searchSelected={this.state.searchSelected}
          searchResults={this.state.searchResults}
          updateSearchText={this.updateSearchText}
          captureKeyDownSearch={this.captureKeyDownSearch}
          addMonster={this.addMonster} />
        <div className="single-dice">
          <img className="dice" src="/img/d4.png" alt="d4 dice" onClick={() => this.roller('Straight d4', 1, 4, 0)} />
          <img className="dice" src="/img/d6.png" alt="d6 dice" onClick={() => this.roller('Straight d6', 1, 6, 0)} />
          <img className="dice" src="/img/d8.png" alt="d8 dice" onClick={() => this.roller('Straight d8', 1, 8, 0)} />
          <img className="dice" src="/img/d10.png" alt="d10 dice" onClick={() => this.roller('Straight d10', 1, 10, 0)} />
          <img className="dice" src="/img/d12.png" alt="d12 dice" onClick={() => this.roller('Straight d12', 1, 12, 0)} />
          <img className="dice" src="/img/d20.png" alt="d20 dice" onClick={() => this.roller('Straight d20', 1, 20, 0)} />
        </div>
        <div className="monsters">
          {Array.from(this.state.monstersAdded).reverse().map(([key, monster]) => {
            return <Monster
              key={key}
              creatures={this.state.creatures}
              removeMonster={this.removeMonster}
              toggleStatBlockShown={this.toggleStatBlockShown}
              toggleStatsShown={this.toggleStatsShown}
              toggleSavesShown={this.toggleSavesShown}
              toggleResistancesShown={this.toggleResistancesShown}
              toggleTraitsShown={this.toggleTraitsShown}
              toggleActionsShown={this.toggleActionsShown}
              addCreature={this.addCreature}
              removeCreature={this.removeCreature}
              toggleCreatureHealthEdit={this.toggleCreatureHealthEdit}
              updateCreatureHealthText={this.updateCreatureHealthText}
              setCreatureHealth={this.setCreatureHealth}
              roller={this.roller}>
                {monster}
            </Monster>
          })}
        </div>
        <Rolls>{this.state.rolls}</Rolls>
      </div>
    );
  }
}

export default App;
