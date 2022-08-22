import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDog } from "../actions";
import "./SearchBar.css"

export default function SearchBar({setCurrentPage}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
 

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value.toLowerCase());
  }

  function handleSubmit(e) {
    e.preventDefault()
    if(!name ){
      alert("hay que poner un nombre existente"); 
  }
    dispatch(getNameDog(name.toLowerCase()))
    setCurrentPage(1);
    setName("")
}

  return (
    <div className="search-box">
      <div className="search-box">
      <input
        className="input-search"
        type="text"
        placeholder="  Dogs name..." autoFocus
        onChange={(e) => handleInputChange(e)}
        ></input>
      <button type="submit" className="select" onClick={(e)=> handleSubmit(e)}>buscar</button>
        </div>
    </div>
  );
}
