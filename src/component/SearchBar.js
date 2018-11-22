import  React, { Component } from 'react';
import  SearchBtn from './SerachBtn'

class SearchBar extends Component {

  constructor(props){
    super(props)
    this.state = {
      initText : ''
    }
  }

  render() {
    return (
      <div className="seach">
        <input 
          type="search" 
          placeholder="Serach for Food"
          onChange={this.props.hadleSerach}
        ></input>
        <SearchBtn className="search-button" onClick={this.props.hadleSerach}></SearchBtn>
      </div>
    )
  }
}

export default SearchBar;