import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import Header from './component/Header';
import Products from "./component/Products";
import DetailView from "./component/DetailView";
import Footer from "./component/Footer";

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
      checkout: false, //可否結帳
      openModel: false, //是否開啟商品資訊視窗
      selectProduct: [], //選中商品
    };
  }

  getProduct = () => { //透過 axios 找尋 json 資料，用來初始化資料
    let url = "https://res.cloudinary.com/smallga/raw/upload/v1543484994/jsonData/productList.json"
    axios.get(url).then(
      response => {
        this.setState({
          productList: response.data
        })
      }
    )
  }

  handleCloseModel = () => { //將資訊室窗關閉
    this.setState({
      openModel: false
    })
  }

  handleOpenModel = (id, e) => { //透過id 找尋被選擇商品,並且打開Model

    let selectProduct;

    selectProduct = this.state.productList.find(
      product => {
        return product.id === id;
      }
    );

    this.setState({
      openModel: true,
      selectProduct: selectProduct
    })
    e.preventDefault();
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

    let checkout = false;

    if(this.state.shoppingCartProducts.length > 0){
      checkout = true;
    }
    
    this.setState(
      {
        checkout: checkout,
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
    },() =>{
      this.countShoppingProducts();
    })
    e.preventDefault();
  }

  removeAllCartProduct = () => {
    this.setState({
      shoppingCartProducts: []
    },() =>{
      this.countShoppingProducts();
    })
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
          removeAllCartProduct={this.removeAllCartProduct}
          checkout={this.state.checkout}
        >
        </Header>
        <Products
          handleAddCart={this.handleAddCart}
          productList={this.state.productList}
          searchTerm={this.state.searchTerm}
          handleOpenModel={this.handleOpenModel}
          noResultMessage={"沒有找尋結果"}
          noResultTip={"請重新輸入搜尋條件"}
        />
        <DetailView
          product={this.state.selectProduct}
          handleCloseModel={this.handleCloseModel}
          openModel={this.state.openModel}
        />

        <Footer/>
  
      </div>
    );
  }
}

export default App;
