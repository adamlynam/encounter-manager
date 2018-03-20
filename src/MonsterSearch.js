import React, { Component } from 'react';

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
    return <ul className="monster-name-results">
      {Array.from(this.props.searchResults).map(([key, monster]) => {
        resultIndex++;
        return <li className={'monster-name' + ((resultIndex == this.props.searchSelected) ? ' selected' : '')} key={key} onClick={() => this.props.addMonster(key)} >{monster.name}</li>
      })}
      </ul>
  }
}

export default MonsterSearch;
