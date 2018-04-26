import React, { Component } from 'react';
import MonsterTools from './MonsterTools';

class MonsterSearch extends Component {
  render() {
    return (
      <div className="monster-search">
        <p>Search to add Monster</p>
        <input type="text" value={this.props.searchText} onChange={this.props.updateSearchText} onKeyDown={this.props.captureKeyDownSearch} />
        {this.props.searchResults && this.renderSearchResults()}
      </div>
    );
  }

  renderSearchResults = () => {
    var resultIndex = -1;
    return <ul className="monster-results">
      {this.props.searchResults.size > 0 && <li className="heading">
        <span className="monster-name">Monster</span>
        <span className="monster-xp">XP</span>
        <span className="monster-cr">CR</span>
      </li>}
      {Array.from(this.props.searchResults).map(([key, monster]) => {
        resultIndex++;
        return <li className={'monster-result' + ((resultIndex == this.props.searchSelected) ? ' selected' : '')} key={key} onClick={() => this.props.addMonster(key)} >
          <span className="monster-name">{monster.name}</span>
          <span className="monster-xp">{MonsterTools.parseMonsterXp(monster)}</span>
          <span className="monster-cr">{MonsterTools.parseMonsterCr(monster)}</span>
        </li>
      })}
      </ul>
  }
}

export default MonsterSearch;
