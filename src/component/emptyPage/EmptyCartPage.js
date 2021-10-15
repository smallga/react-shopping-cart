import React, { Component } from "react";


class EmptyCartPage extends Component{
  constructor(){
    super();
  }

  render() {
    return(
      <div className = "empty-cart">
        <img
          src="https://res.cloudinary.com/smallga/image/upload/v1634265846/icon/ic-no-shopping-cart.png"
        >
        </img>
        <div>目前尚未有商品</div>
      </div>
    )
  }
}

export default EmptyCartPage;