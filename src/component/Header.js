import React, { Component } from "react";
import SearchBar from "./SearchBar";

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <header>
        <div className="container">
          <SearchBar 
            hadleSerach={this.props.handleSearch}>
          </SearchBar>
        </div>
      </header>
    )
  }
}

export default Header;