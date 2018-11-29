import React, { Component } from "react";
import SearchBar from "./SearchBar";
import ScrollArea from "react-scrollbar";

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      openCart: false, //判斷現在是否開啟購物車頁面
      cartItem: this.props.shoppingCartProducts
    };
  }

  openCartView = (e) => {
    console.log(this.state.openCart);
    this.setState(
      prevState => ({
        openCart: !(prevState.openCart)
      })
    )
  }

  render() {

    //建立購物車畫面
    let cartItems; 
    cartItems = this.state.cartItem.map(
      product => {
        return(
          <li className="cart-product" key={product.id}>
            <img
              className="cart-product-img"
              src={product.imgLink}
            >
            </img>
            <div className="cart-product-info">
              <p className="cart-product-name">{product.productName}</p>
              <p className="cart-product-price">${product.price}</p>
            </div>
            <div className="cart-product-total">
              <p className="cart-product-qty">X{product.quantity}</p>
              <p className="cart-product-total">${product.totalPrice}</p>
            </div>
            <a
              className="cart-product-remove"
              href="#"
              onClick={this.props.removeCartProduct.bind(this,product.id)}
            >
            ×
            </a>
          </li>
        );
      });

    let cartView;

    if(cartItems.length < 1){
      cartView = <div></div>
    }
    else{
      cartView = 
      <ul className="cart-products">
        {cartItems}
      </ul>
    }

    return (
      <header>
        <div className="container">
          <img
            src="https://drive.google.com/uc?export=view&id=1GYnHh1RzfHyJcyBVxrvojWiqg9-A5Ges"
            className="logo"
          ></img>
          <div className="search-area">
            <SearchBar 
              handleSearch={this.props.handleSearch}>
            </SearchBar>
          </div>
          <div className="shopping-cart">
            <div className="cart-info">
              <table>
                <tbody>
                  <tr>
                    <td>No of Item</td>
                    <td> : </td>
                    <td>{this.props.totalItem}</td>
                  </tr>
                  <tr>
                    <td>Total Cost</td>
                    <td> : </td>
                    <td>{this.props.totalPrice}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="cart-icon">
              <img 
                className={this.props.iconShake ? "tada" : ""}
                src="https://res.cloudinary.com/smallga/image/upload/v1543392995/icon/shopping-purse-icon.png"
                onClick={this.openCartView}
              >
              </img>
            </div>
            <div className={this.state.openCart ? "cart-view active" : "cart-view"}>
              <ScrollArea
                style={{ width: 360, height: 320 }}
                speed={0.8}
                smoothScrolling={true}
                stopScrollPropagation={true}
              >
                  {cartView}
              </ScrollArea>
              <div className ="cart-acton-area">
                <button
                 className={this.props.checkout ? "" : "disable"}
                >
                  結帳 ${this.props.totalPrice}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;