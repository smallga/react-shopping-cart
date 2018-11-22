import React, { Component } from 'react';

const SearchBtn = (props) => {
  const handleClcik = () => {
    props.onItemClick()
  }
  return <button className={props.className} onClick={handleClcik}></button>
}

export default SearchBtn