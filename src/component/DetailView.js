import React, { Component } from "react";
import { findDOMNode } from "react-dom";

class DetailView extends Component{
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() { //在元素生成時將判斷是否點擊資訊欄的判斷加入事件中
    document.addEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  componentWillUnmount() { //元素要被回收時，是否點擊資訊欄的判斷移出事件中
    document.removeEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  handleClickOutside = (e) => { //判斷是否點擊資訊欄視窗的外面
    const domNode = findDOMNode(this.refs.modal);//尋找 Modal 的DOM
    if(!domNode || !domNode.contains(e.target)){ //若是點擊的元素不在Modal底下，關閉視窗
      this.props.handleCloseModel(e);
    }
  }


  render(){
    return(
      <div className={this.props.openModel ? "detail-wrapper active" : "detail-wrapper"}>
        <div className="detail-model" ref="modal">
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