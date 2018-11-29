import React, { Component } from "react";

class Counter extends Component {
  constructor(props){
    super(props);
    this.state = {
      value : this.props.productQuantity // 商品數量
    }
  }

  handleIncrement = (e) => { //點擊 + 號時的動作
    this.setState(
      prevState => ({ //數值更新
        value: prevState.value + 1
      }),
      () => { //通知前面組件
        this.props.handleUpdateQuantity(this.state.value);
      }
    )
    e.preventDefault();
  }

  handleDecrement = (e) => { //點擊 - 號的動作
    if (this.state.value <= 1) { //若小於等於一無需動作
      return this.state.value;
    }
    else{
      this.setState( //數值更新
        prevState => ({
          value: prevState.value - 1
        }),
        () => { //通知前面組件
          this.props.handleUpdateQuantity(this.state.value);
        }
      )
    }
    e.preventDefault();
  }

  handleFeed = (e) => { //從 input 直接書入值
    this.setState(
      { //透過頁面設定的 ref 值，取得input 的值
        value: this.refs.feedQty.value
      },
      () => { //通知前面組件
        this.props.handleUpdateQuantity(this.state.value);
      }
    )
    e.preventDefault();
  }

  render() {
    return (
      <div className="counter-input">
        <a href="#" className="decrement-btn" onClick={this.handleDecrement}>
          -
        </a>
        <input
          ref="feedQty"
          className="quantity-input"
          value={this.state.value}
          onChange={this.handleFeed.bind(this)}>
        </input>
        <a href="#" className="increment-btn" onClick={this.handleIncrement}>
          +
        </a>
      </div>
    )
  }
}

export default Counter;