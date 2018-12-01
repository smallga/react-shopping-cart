import React, { Component } from "react";


class EmptyCartPage extends Component{
  constructor(){
    super();
  }

  render() {
    return(
      <div className = "empty-cart">
        <img
          src="https://res.cloudinary.com/smallga/image/upload/v1543651180/image/%E8%B3%BC%E7%89%A9%E8%BB%8A%E7%82%BA%E7%A9%BA.jpg"
        >
        </img>
      </div>
    )
  }
}

export default EmptyCartPage;