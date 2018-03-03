import React, { Component } from 'react';

class MonsterSearch extends Component {
  render() {
    return (
      <div className="monster-search">
        <p>Search to add Monster</p>
        <input type="text" value={this.props.searchText} onChange={this.props.updateSearchText} />
        <ul className="monster-name-results">
          {(this.props.searchText !== '')
            ?
            this.props.monsters
              .map((monster, index) => {
                if (monster.name.toLowerCase().indexOf(this.props.searchText.toLowerCase()) !== -1) {
                  return <li className="monster-name" key={index} onClick={() => this.props.addMonster(index)} >{monster.name}</li>
                }
                else {
                  return '';
                }
              })
            :
            ''}
        </ul>
      </div>
    );
  }
}

export default MonsterSearch;
