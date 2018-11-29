import  React, { Component } from 'react';
import  SearchBtn from './SerachBtn'

class SearchBar extends Component {

  constructor(props){
    super(props)
    this.state = {
      searchTerm : ''
    }
  }

  handleSearch = (e) => { //傳回父組件，通知搜尋字串更改
    this.setState(
      { searchTerm: this.refs.searchTerm.value},
      () => {
        this.props.handleSearch(this.state.searchTerm);
      }
    )
  }

  render() {
    return (
      <div className="search">
        <input 
          ref="searchTerm"
          type="search" 
          placeholder="Serach for Food"
          className="search-keyword"
          onChange={this.handleSearch}
        ></input>
        <SearchBtn className="search-button" onClick={this.props.hadleSerach}></SearchBtn>
      </div>
    )
  }
}

export default SearchBar;