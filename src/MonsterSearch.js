import React, { Component } from 'react';

class MonsterSearch extends Component {
  render() {
    return (
      <div className="monster-search">
        <p>Search</p>
        <input type="text" value={this.props.searchText} onChange={this.props.updateSearchText} />
        {(this.props.searchText !== '') ?
          this.props.monsterNames
            .filter(monsterName =>
              monsterName.toLowerCase().indexOf(this.props.searchText.toLowerCase()) !== -1)
            .map((monsterName, index) => {
              return <p key={index} >{monsterName}</p>
            })
          :
          ''}
      </div>
    );
  }
}

export default MonsterSearch;
