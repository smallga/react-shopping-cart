import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import Header from './component/Header';
import Products from "./component/Products"

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      productList: [], //商品清單
      searchTerm: "", //搜尋字串
      totalPrice: 0, //總共價錢
      totalProduct: 0, //總共商品
      shoppingCartProducts: [],
      iconShake: false, //icon 震動參數
    };
  }

  getProduct = () => { //透過 axios 找尋 json 資料，用來初始化資料
    let url = "https://res.cloudinary.com/smallga/raw/upload/v1543225503/jsonData/productList.json"
    axios.get(url).then(
      response => {
        this.setState({
          productList: response.data
        })
      }
    )
  }

  handleSearch = (searchTerm) =>{ //更改搜尋字串
    this.setState(
      {
        searchTerm: searchTerm
      }
    )
  }

  countShoppingProducts = () =>{ //計算商品總數跟總價錢

    var totalPrice = 0;

    for(var product of this.state.shoppingCartProducts){
      totalPrice += product.totalPrice;
    }
    
    this.setState(
      {
        totalProduct: this.state.shoppingCartProducts.length,
        totalPrice: totalPrice
      }
    )
  }

  handleAddCart = (product) =>{ //將商品加入購物車

    let cartProduct = this.state.shoppingCartProducts;

    //透過找index 判斷是否有相同商品，若為-1代表沒相同商品
    let index = cartProduct.findIndex(
      x => {
        return x.id === product.id;
      }
    );

    console.log(index);

    if(index == -1){ //若是沒有相同商品，直接push
      this.setState(
        prevState => {
          shoppingCartProducts: prevState.shoppingCartProducts.push(product);
        },
        () => {
          this.countShoppingProducts();
        }
      )
    }
    else{ //若有相同商品，透過index更改，在改變狀態
      cartProduct[index].quantity = 
        cartProduct[index].quantity + product.quantity;
      cartProduct[index].totalPrice = 
      cartProduct[index].totalPrice + product.totalPrice
      this.setState(
        prevState => {
          shoppingCartProducts: cartProduct;
        },
        () => {
          this.countShoppingProducts();
        }
      )
    }
    //以下是將 icon 新增震動特效，通知使用者
    this.setState(
      {
        iconShake: true    
      }
    )
    setTimeout( //使之振動0.5秒
      () => {
        this.setState({
          iconShake: false
        })
      },
      500
    )
  }

  removeCartProduct = (id, e) =>{ //找出需要刪除的商品，並刪除
    let cartItem = this.state.shoppingCartProducts;
    let index = cartItem.findIndex(
      (x) => {
        return x.id === id;
      }
    )
    
    cartItem.splice(index, 1);

    this.setState({
      shoppingCartProducts: cartItem
    })
    //e.preventDefault();
  }
  

  componentWillMount() { //建置初始化商品
    this.getProduct();
  }

  render() {
    return (
      <div className="App">
        <Header
          handleSearch={this.handleSearch}
          totalItem={this.state.totalProduct}
          totalPrice={this.state.totalPrice}
          iconShake={this.state.iconShake}
          shoppingCartProducts={this.state.shoppingCartProducts}
          removeCartProduct={this.removeCartProduct}
        >
        </Header>
        <Products
          handleAddCart={this.handleAddCart}
          productList={this.state.productList}
          searchTerm={this.state.searchTerm}
        />
      </div>
    );
  }
}

export default App;
