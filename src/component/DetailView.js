import React, { Component } from "react";

class DetailView extends Component{
  constructor(props){
    super(props);
    this.state = {
      
    }
  }


  render(){
    return(
      <div className={this.props.openModel ? "detail-wrapper active" : "detail-wrapper"}>
        <div className="detail-model">
          <div className="model-header">
            <span className="model-productName">{this.props.product.productName}</span>
            <button
              onClick={this.props.handleCloseModel}
            >
              ×
            </button>
          </div>
          <img
            src={this.props.product.imgLink}
          />
          <hr/>
          <div className="detail-information">
            <p>商品簡述:</p>
            <p>{this.props.product.information}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default DetailView;