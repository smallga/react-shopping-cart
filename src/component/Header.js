import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import SearchBar from "./SearchBar";
import ScrollArea from "react-scrollbar";
import EmptyCartPage from "./emptyPage/EmptyCartPage"
import FinalCartPage from "./FinalCartPage"

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      openCart: false, //判斷現在是否開啟購物車頁面
      finalView: false,
    };
  }

  componentDidMount() { //在元素生成時將判斷是否點擊購物車的判斷加入事件中
    document.addEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  componentWillUnmount() { //元素要被回收時，是否點擊購物車的判斷移出事件中
    document.removeEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  handleClickOutside = (e) => { //判斷是否點擊購車外面
    const cartDomNode = findDOMNode(this.refs.cartView); //找到購物車真正的DOM元素
    if(cartDomNode.classList.contains("active")
    && (!cartDomNode || !cartDomNode.contains(e.target))){ //判斷點擊事件是否包含在購物車底下，若無關閉視窗
      this.setState({
        openCart: false
      });
      e.stopPropagation(); //為了防止點擊購物車button時會再執行的事件
    }
  }


  openCartView = (e) => { //開啟購物車
    console.log(this.state.openCart);
    this.setState(
      prevState => ({
        openCart: !(prevState.openCart)
      })
    )
  }

  changeFinalView = () => {
    this.props.removeAllCartProduct();
    this.setState({finalView: true})
  }

  render() {

    //建立購物車畫面
    let cartItems; 
    cartItems = this.props.shoppingCartProducts.map(
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

    let cartLength = cartItems.length;

    if(cartLength < 1 && !this.state.finalView){
      cartView = <EmptyCartPage></EmptyCartPage>
    }
    else if(cartLength < 1 && this.state.finalView) {
      cartView = <FinalCartPage></FinalCartPage>
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
            {/* <div className="cart-info">
              <table>
                <tbody>
                  <tr>
                    <td>商品項目</td>
                    <td> : </td>
                    <td>{this.props.totalItem}</td>
                  </tr>
                  <tr>
                    <td>總共花費</td>
                    <td> : </td>
                    <td>{this.props.totalPrice}</td>
                  </tr>
                </tbody>
              </table>
            </div> */}
            <div className="cart-icon" onClick={this.openCartView}>
              <img 
                className={this.props.iconShake ? "tada" : ""}
                src="https://res.cloudinary.com/smallga/image/upload/v1634265846/icon/ic-shopping-cart.png"
              >
              </img>
              {cartLength > 0 &&<span className="cart-counter">
                {cartLength > 9 ? '9+' : cartLength}
              </span>}
            </div>
            <div ref="cartView" className={this.state.openCart ? "cart-view active" : "cart-view"}>
              <ScrollArea
                className = "cart-Scroll"
                speed={0.8}
                smoothScrolling={true}
                stopScrollPropagation={true}
              >
                  {cartView}
              </ScrollArea>
              <div className ="cart-acton-area">
                <button
                 className={this.props.checkout ? "" : "disable"}
                 onClick={this.changeFinalView}
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