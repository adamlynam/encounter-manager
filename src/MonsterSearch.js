import React, { Component } from 'react';
import MonsterTools from './MonsterTools';

class MonsterSearch extends Component {
  render() {
    return (
      <div className="monster-search">
        <div className="form-group">
          <label className="col-form-label-lg" htmlFor="monster-search">Add Monster</label>
          <input id="monster-search" className="form-control form-control-lg" type="text" placeholder="Monster Name" value={this.props.searchText} onChange={this.props.updateSearchText} onKeyDown={this.props.captureKeyDownSearch} />
          {this.props.searchResults && this.renderSearchResults()}
        </div>
      </div>
    );
  }

  renderSearchResults = () => {
    var resultIndex = -1;
    return <table className="monster-results table table-striped table-bordered">
      <tbody>
        {Array.from(this.props.searchResults).map(([key, monster]) => {
          resultIndex++;
          return <tr className={'monster-result' + ((resultIndex === this.props.searchSelected) ? ' selected' : '')} key={key} onClick={() => this.props.addMonster(key)} >
            <td className="monster-name">{monster.name}</td>
            <td className="monster-xp">{MonsterTools.parseMonsterXp(monster)} XP</td>
            <td className="monster-cr">CR {MonsterTools.parseMonsterCr(monster)}</td>
          </tr>
        })}
      </tbody>
      </table>
  }
}

export default MonsterSearch;
