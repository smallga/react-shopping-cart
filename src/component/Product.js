import React, { Component } from "react";
import Conter from "./Counter"

class Product extends Component {
  constructor(props){
    super(props);
    this.state = {
      quantity: 1
    };
  }

  handleUpdateQuantity = (productQty) => { //更新商品數量
    this.setState(
      {
        quantity: productQty
      }
    )
  }

  handleAddCart = () => { //將商品加入購物車

    let totalPrice = this.props.price * this.state.quantity; //計算總價格

    let productDetail = {
      id: this.props.id,
      productName: this.props.productName,
      price: this.props.price,
      quantity: this.state.quantity,
      imgLink: this.props.imgLink,
      totalPrice: totalPrice
    }

    this.props.handleAddCart(productDetail); //將商品資訊回傳父組件，加入購物車

  }

  render(){
    return(
      <div className="product">
        <div className="product-img">
          <img
            src={this.props.imgLink}
            onClick={this.props.openMadel.bind(this,this.props.id)}
          >
          </img>
        </div>
        <h4>
          {this.props.productName}
        </h4>
        <p className="product-price">
          {"$"}{this.props.price}
        </p>
        <Conter 
          handleUpdateQuantity={this.handleUpdateQuantity}
          productQuantity={this.state.quantity}
        >
        </Conter>
        <div className="product-add-action">
          <button
            className="product-addCart-btn"
            onClick={this.handleAddCart}
          >
          加入購物車
          </button>
        </div>
      </div>
    )
  }
  
}

export default Product;