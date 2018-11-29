import React, { Component } from "react";
import Product from "./Product"

class Products extends Component {
  constructor(props){
    super(props);
    this.state = {
            
    }
  }


  render() {

    let productListData; //透過刪選之後的資料
    let term = this.props.searchTerm;
    let x;

    function searchingFor(term) {
      return function(x) {
        return x.productName.toLowerCase().includes(term.toLowerCase()) || !term;
      };
    }

    productListData = this.props.productList //建立Product顯示項目
      .filter(searchingFor(term))
      .map(product => {
        return (
          <Product
            key={product.id}
            id={product.id}
            price={product.price}
            productName={product.productName}
            imgLink={product.imgLink}
            handleAddCart={this.props.handleAddCart}
          />
        )
      });

    let productView;
    if(productListData.length <= 0 && term){
      productView = <div>No result</div>
    }
    else {
      productView = (
        <div className="productList">
          {productListData}
        </div>
      )
    }

    return(
      <div 
        className="product-wrapper"
      >
       {productView}
      </div>
    )
  }
}

export default Products;