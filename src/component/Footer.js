import React, { Component } from "react";

const Footer = (props) => {
  return(
    <footer>
      <p className ="footer-link">
        <a href="https://github.com/smallga/react-shopping-cart"
           target="_blank"
        >
          GitHub
        </a>
        <span> / </span>
        <a href="mailto:smallgag@gmail.com"
           target="_blank"
        >
          寄信給我
        </a>
      </p>
      <p className ="footer-massage">
        © 2018 <strong>Food</strong> - Food Store
      </p>
    </footer>
  )
}

export default Footer;