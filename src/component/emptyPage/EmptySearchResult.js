import React, { Component } from "react";


class EmptySearchResult extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div className = "empty-result">
        <img
          src="https://res.cloudinary.com/smallga/image/upload/v1543654313/image/%E6%B2%92%E6%9C%89%E6%89%BE%E5%B0%8B%E7%B5%90%E6%9E%9C.png"
        >
        </img>
        <p className = "empty-result-message">{this.props.noResultMessage}</p>
        <p className = "empty-result-tip">{this.props.noResultTip}</p>
      </div>
    )
  }
}

export default EmptySearchResult;