import React from "react";
import './Input.css';

export function Input(props) {
  return (
    <div className="SearchBar">
      <input
        type="text"
        onChange={props.handleChange}
        className="inputField"
        onKeyPress={props.handleKeyPress}
      />
      <input
        type="submit"
        onClick={props.handleClick}
        className="submitBtn"
        value="Find"
      />
    </div>
  );
}
