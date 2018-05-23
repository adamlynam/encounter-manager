import React, { Component } from 'react';
import './App.css';
import MonsterTools from './MonsterTools';
import MonsterSearch from './MonsterSearch';
import EncounterInfo from './EncounterInfo';
import MonstersInfo from './MonstersInfo';
import Monster from './Monster';
import InitativeTracker from './InitativeTracker';
import Rolls from './Rolls';

import cos from './data/bestiary/bestiary-cos.json';
import dmg from './data/bestiary/bestiary-dmg.json';
import hotdq from './data/bestiary/bestiary-hotdq.json';
import lmop from './data/bestiary/bestiary-lmop.json';
import mm from './data/bestiary/bestiary-mm.json';
import mtf from './data/bestiary/bestiary-mtf.json';
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
        ...mtf.monster,
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
      searchSelected: null,
      searchResults: new Map(),
  		monstersAdded: new Map(),
      nextMonsterKey: 1,
      creatures: new Map(),
      nextCreatureKey: 1,
      showRolls: false,
      rolls: [],
      currentInitative: null,
      addInitativeName: '',
      addInitativeValue: '',
      initativeAdded: new Map(),
      selectedMonster: null,
  	};
  }

  mapToJson(map) {
    return JSON.stringify([...map]);
  }

  jsonToMap(jsonStr) {
      return new Map(JSON.parse(jsonStr));
  }

  componentDidMount() {
    var newState = {};
    if (localStorage.getItem('monstersAdded')) {
      newState.monstersAdded = this.jsonToMap(localStorage.getItem('monstersAdded'));
    }
    if (localStorage.getItem('nextMonsterKey')) {
      newState.nextMonsterKey = JSON.parse(localStorage.getItem('nextMonsterKey'));
    }
    if (localStorage.getItem('creatures')) {
      newState.creatures = this.jsonToMap(localStorage.getItem('creatures'));
    }
    if (localStorage.getItem('nextCreatureKey')) {
      newState.nextCreatureKey = JSON.parse(localStorage.getItem('nextCreatureKey'));
    }
    if (localStorage.getItem('initativeAdded')) {
      newState.initativeAdded = this.jsonToMap(localStorage.getItem('initativeAdded'));
    }
    if (localStorage.getItem('showRolls')) {
      newState.showRolls = JSON.parse(localStorage.getItem('showRolls'));
    }
    if (localStorage.getItem('rolls')) {
      newState.rolls = JSON.parse(localStorage.getItem('rolls'));
    }
    if (localStorage.getItem('currentInitative')) {
      newState.currentInitative = JSON.parse(localStorage.getItem('currentInitative'));
    }
    if (localStorage.getItem('selectedMonster')) {
      newState.selectedMonster = JSON.parse(localStorage.getItem('selectedMonster'));
    }
    this.setState(newState);
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.monstersAdded = this.mapToJson(this.state.monstersAdded);
    localStorage.nextMonsterKey = JSON.stringify(this.state.nextMonsterKey);
    localStorage.creatures = this.mapToJson(this.state.creatures);
    localStorage.nextCreatureKey = JSON.stringify(this.state.nextCreatureKey);
    localStorage.initativeAdded = this.mapToJson(this.state.initativeAdded);
    localStorage.showRolls = JSON.stringify(this.state.showRolls);
    localStorage.rolls = JSON.stringify(this.state.rolls);
    localStorage.currentInitative = JSON.stringify(this.state.currentInitative);
    localStorage.selectedMonster = JSON.stringify(this.state.selectedMonster);
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
      searchSelected: null,
      searchResults: searchResults,
		});
  }

  captureKeyDownSearch = (event) => {
    switch (event.keyCode) {
      case ARROW_KEY_UP:
        this.setState((previousState, currentProps) => {
          return {
            searchSelected: previousState.searchSelected !== null ? Math.max(previousState.searchSelected - 1, 0) : previousState.searchResults.size - 1,
          }
    		});
        break;
      case ARROW_KEY_DOWN:
        this.setState((previousState, currentProps) => {
          return {
            searchSelected: previousState.searchSelected !== null ? Math.min(previousState.searchSelected + 1, previousState.searchResults.size - 1) : 0,
          }
    		});
        break;
      case ENTER_KEY:
        if (this.state.searchSelected !== null) {
          this.addMonster(Array.from(this.state.searchResults)[this.state.searchSelected][0])
        }
        break;
      default:
        break;
    }
  }

  toggleRollsShown = () => {
    this.setState((previousState, currentProps) => {
			return {
        showRolls: !previousState.showRolls,
			};
    });
  }

  addMonster = (index) => {
    this.setState((previousState, currentProps) => {
      var monstersAdded = new Map(previousState.monstersAdded);
      monstersAdded.set(
        previousState.nextMonsterKey,
        Object.assign({}, Object.assign(previousState.monsters[index],
          {
            key: previousState.nextMonsterKey,
            initative: this.rollInitative(previousState.monsters[index]),
            statBlockShown: false,
            statsShown: false,
            languagesShown: false,
            resistancesShown: false,
            traitsShown: true,
            actionsShown: true,
            reactionsShown: true,
            legendaryActionsShown: false,
            instances: [previousState.nextCreatureKey],
            usedInnateSpellSlots: [],
            usedPreparedSpellSlots: [],
          }
        ))
      );
			return {
        searchText: '',
        searchSelected: null,
        searchResults: [],
        monstersAdded: monstersAdded,
        nextMonsterKey: previousState.nextMonsterKey + 1,
				creatures: this.addToCreatureList(
          previousState.creatures,
          previousState.monsters[index],
          previousState.nextCreatureKey),
        nextCreatureKey: previousState.nextCreatureKey + 1,
			};
    });
  }

  removeMonster = (monsterKey) => {
    this.setState((previousState, currentProps) => {
      var monstersAdded = new Map(previousState.monstersAdded);
      monstersAdded.delete(monsterKey);
      var creatures = new Map(previousState.creatures);
      previousState.monstersAdded.get(monsterKey).instances.forEach(instance => {
        creatures.delete(instance);
      });
			return {
        monstersAdded: monstersAdded,
        creatures: creatures,
			};
    });
  }

  addMonsterProperties = (monster, newProperties) => {
    this.setState((previousState, currentProps) => {
      var monstersAdded = new Map(previousState.monstersAdded);
      monstersAdded.set(
        monster.key,
        Object.assign({}, Object.assign(
          monster,
          newProperties
        ))
      );
			return {
        monstersAdded: monstersAdded,
			};
    });
  }

  closeAllStatBlocks = () => {
    this.setState((previousState, currentProps) => {
      var monstersAdded = new Map();
      previousState.monstersAdded.forEach((value, key, map) => {
        monstersAdded.set(
          key,
          Object.assign({}, Object.assign(
            value,
            {
              statBlockShown: false,
            }
          ))
        );
      });
			return {
        monstersAdded: monstersAdded,
			};
    });
  }

  showStatBlock = (monster) => {
    this.addMonsterProperties(monster, {
      statBlockShown: true,
    });
  }

  toggleStatBlockShown = (monster) => {
    this.addMonsterProperties(monster, {
      statBlockShown: !monster.statBlockShown,
    });
  }

  toggleStatsShown = (monster) => {
    this.addMonsterProperties(monster, {
      statsShown: !monster.statsShown,
    });
  }

  toggleSavesShown = (monster) => {
    this.addMonsterProperties(monster, {
      savesShown: !monster.savesShown,
    });
  }

  toggleLanguagesShown = (monster) => {
    this.addMonsterProperties(monster, {
      languagesShown: !monster.languagesShown,
    });
  }

  toggleResistancesShown = (monster) => {
    this.addMonsterProperties(monster, {
      resistancesShown: !monster.resistancesShown,
    });
  }

  toggleTraitsShown = (monster) => {
    this.addMonsterProperties(monster, {
      traitsShown: !monster.traitsShown,
    });
  }

  showActions = (monster) => {
    this.addMonsterProperties(monster, {
      actionsShown: true,
    });
  }

  toggleActionsShown = (monster) => {
    this.addMonsterProperties(monster, {
      actionsShown: !monster.actionsShown,
    });
  }

  toggleReactionsShown = (monster) => {
    this.addMonsterProperties(monster, {
      reactionsShown: !monster.reactionsShown,
    });
  }

  toggleLegendaryActionsShown = (monster) => {
    this.addMonsterProperties(monster, {
      legendaryActionsShown: !monster.legendaryActionsShown,
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
      monstersAdded.set(monster.key, Object.assign(previousState.monstersAdded.get(monster.key), {
        instances: [
          ...previousState.monstersAdded.get(monster.key).instances,
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
      monstersAdded.set(monster.key, Object.assign({},
        Object.assign(previousState.monstersAdded.get(monster.key),
        {
          instances: previousState.monstersAdded.get(monster.key).instances.filter(item => item !== key),
        }
      )));
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
      creatures.set(key, Object.assign({},
        Object.assign(creatures.get(key),
        {
          editingHealth: !creatures.get(key).editingHealth,
          editHealthValue: creatures.get(key).health,
        }
      )));
			return {
				creatures: creatures,
			};
    });
  }

  updateCreatureHealthText = (key, text) => {
    this.setState((previousState, currentProps) => {
      var creatures = new Map(previousState.creatures);
      creatures.set(key, Object.assign({},
        Object.assign(creatures.get(key),
        {
          editHealthValue: text,
        }
      )));
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
      var longestNumber = parseInt(longestNumberResults[0], 10);
      if (!isNaN(longestNumber)) {
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
      creatures.set(key, Object.assign({},
        Object.assign(creatures.get(key),
        newProperties
      )));
      return {
        creatures: creatures,
      };
    });
  }

  toggleInnateSpellSlots = (monster, frequency, index) => {
    var usedInnateSpellSlots = this.state.monstersAdded.get(monster.key).usedInnateSpellSlots ? [...this.state.monstersAdded.get(monster.key).usedInnateSpellSlots] : [];
    usedInnateSpellSlots[frequency] = usedInnateSpellSlots[frequency] ? usedInnateSpellSlots[frequency] : [];
    usedInnateSpellSlots[frequency][index] = usedInnateSpellSlots[frequency][index] ? !usedInnateSpellSlots[frequency][index] : true;
    this.addMonsterProperties(monster, {
      usedInnateSpellSlots: usedInnateSpellSlots,
    });
  }

  togglePreparedSpellSlots = (monster, level, index) => {
    var usedPreparedSpellSlots = this.state.monstersAdded.get(monster.key).usedPreparedSpellSlots ? [...this.state.monstersAdded.get(monster.key).usedPreparedSpellSlots] : [];
    usedPreparedSpellSlots[level] = usedPreparedSpellSlots[level] ? usedPreparedSpellSlots[level] : [];
    usedPreparedSpellSlots[level][index] = usedPreparedSpellSlots[level][index] ? !usedPreparedSpellSlots[level][index] : true;
    this.addMonsterProperties(monster, {
      usedPreparedSpellSlots: usedPreparedSpellSlots,
    });
  }

  saveRoll = (name, total, rolls, modifier) => {
    this.setState((previousState, currentProps) => {
			return {
        showRolls: true,
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

  getNextKeyInInitative = () => {
    var initativeOrder = [...Array.from(this.state.monstersAdded), ...Array.from(this.state.initativeAdded)]
      .sort((a,b) => {
        return b[1].initative - a[1].initative;
      })
      .map(([key, monster]) => {
        return key;
      });
    if (initativeOrder.length > 0) {
      if (this.state.currentInitative && initativeOrder.indexOf(this.state.currentInitative) + 1 < initativeOrder.length) {
        return initativeOrder[initativeOrder.indexOf(this.state.currentInitative) + 1];
      }
      return initativeOrder[0];
    }
    else {
      return null;
    }
  }

  advanceInitative = () => {
    var nextKey = this.getNextKeyInInitative();
    this.setState((previousState, currentProps) => {
			return {
        currentInitative: nextKey,
        selectedMonster: nextKey,
			};
    });
  }

  updateInitativeName = (event) => {
    this.setState({
      addInitativeName: event.target.value,
		});
  }

  updateInitativeValue = (event) => {
    this.setState({
      addInitativeValue: event.target.value,
		});
  }

  captureKeyDownInitative = (event) => {
    switch (event.keyCode) {
      case ENTER_KEY:
        this.addExtraToInitative();
        break;
      default:
        break;
    }
  }

  addExtraToInitative = () => {
    var initative = parseInt(this.state.addInitativeValue, 10);
    if (!isNaN(initative)) {
      this.setState((previousState, currentProps) => {
        var initativeAdded = new Map(previousState.initativeAdded);
        initativeAdded.set(
          previousState.nextMonsterKey,
          {
            key: previousState.nextMonsterKey,
            name: previousState.addInitativeName,
            initative: initative,
          }
        );
        return {
          addInitativeName: '',
          addInitativeValue: '',
          initativeAdded: initativeAdded,
          nextMonsterKey: previousState.nextMonsterKey + 1,
        };
      });
    }
  }

  removeExtraFromInitative = (extraKey) => {
    this.setState((previousState, currentProps) => {
      var initativeAdded = new Map(previousState.initativeAdded);
      initativeAdded.delete(extraKey);
			return {
        initativeAdded: initativeAdded
			};
    });
  }

  removeFromInitative = (monsterKey) => {
    if (this.state.initativeAdded.has(monsterKey)) {
      this.removeExtraFromInitative(monsterKey);
    }
    else if (this.state.monstersAdded.has(monsterKey)) {
      this.removeMonster(monsterKey);
    }
  }

  setSelectedMonster = (monster) => {
    this.setState((previousState, currentProps) => {
      return {
        selectedMonster: monster.key,
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
    return total;
  }

  rollInitative = (monster) => {
    return this.roller(
      monster.name + ' Initative',
      1,
      20,
      MonsterTools.calculateModifier(monster.dex));
  }

  render = () => {
    return <div>
      {this.state.showRolls ? <Rolls>{this.state.rolls}</Rolls> : <div className="dice-rolls"></div>}
      <div className="dice-roll-toggle" onClick={() => this.toggleRollsShown()}>
        <div className="arrow">{this.state.showRolls ? '▶' : '◀'}</div>
      </div>
      <div className="container-fluid main-container">
        <div className="row">
          <div className="col-lg">
            <MonsterSearch
              monsters={this.state.monsters}
              searchText={this.state.searchText}
              searchSelected={this.state.searchSelected}
              searchResults={this.state.searchResults}
              updateSearchText={this.updateSearchText}
              captureKeyDownSearch={this.captureKeyDownSearch}
              addMonster={this.addMonster} />
          </div>
          <div className="col-lg">
            <div className="single-dice">
              <img className="dice" src="/img/d4.png" alt="d4 dice" onClick={() => this.roller('Straight d4', 1, 4, 0)} />
              <img className="dice" src="/img/d6.png" alt="d6 dice" onClick={() => this.roller('Straight d6', 1, 6, 0)} />
              <img className="dice" src="/img/d8.png" alt="d8 dice" onClick={() => this.roller('Straight d8', 1, 8, 0)} />
              <img className="dice" src="/img/d10.png" alt="d10 dice" onClick={() => this.roller('Straight d10', 1, 10, 0)} />
              <img className="dice" src="/img/d12.png" alt="d12 dice" onClick={() => this.roller('Straight d12', 1, 12, 0)} />
              <img className="dice" src="/img/d20.png" alt="d20 dice" onClick={() => this.roller('Straight d20', 1, 20, 0)} />
            </div>
          </div>
        </div>
        <div className="row monster-area">
          <div className="col-lg-4">
            <MonstersInfo
              monstersAdded={this.state.monstersAdded}
              creatures={this.state.creatures}
              removeMonster={this.removeMonster}
              addCreature={this.addCreature}
              removeCreature={this.removeCreature}
              toggleCreatureHealthEdit={this.toggleCreatureHealthEdit}
              updateCreatureHealthText={this.updateCreatureHealthText}
              setCreatureHealth={this.setCreatureHealth}
              roller={this.roller}
              currentInitative={this.state.currentInitative}
              selectedMonster={this.state.selectedMonster}
              setSelectedMonster={this.setSelectedMonster} />
            <EncounterInfo
              monsters={this.state.monstersAdded} />
          </div>
          <div className="col-lg-6">
            {this.state.selectedMonster && this.state.monstersAdded.get(this.state.selectedMonster) && <Monster
              roller={this.roller}
              currentInitative={this.state.currentInitative}
              selectedMonster={this.state.selectedMonster}
              toggleInnateSpellSlots={this.toggleInnateSpellSlots}
              togglePreparedSpellSlots={this.togglePreparedSpellSlots} >
              {this.state.monstersAdded.get(this.state.selectedMonster)}
            </Monster>}
          </div>
          <div className="col-lg-2">
            <InitativeTracker
              monsters={this.state.monstersAdded}
              extras={this.state.initativeAdded}
              currentInitative={this.state.currentInitative}
              advanceInitative={this.advanceInitative}
              addInitativeName={this.state.addInitativeName}
              updateInitativeName={this.updateInitativeName}
              addInitativeValue={this.state.addInitativeValue}
              updateInitativeValue={this.updateInitativeValue}
              captureKeyDownInitative={this.captureKeyDownInitative}
              addExtraToInitative={this.addExtraToInitative}
              removeFromInitative={this.removeFromInitative} />
          </div>
        </div>
      </div>
    </div>;
  }
}

export default App;
