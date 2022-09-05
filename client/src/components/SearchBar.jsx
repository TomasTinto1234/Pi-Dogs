import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDog } from "../actions";
import "./SearchBar.css"

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();                 
    setName(e.target.value);
    console.log(name)          //yo voy guardando lo que el usuario esta tipiando, en mi estado local name
  }

  function handleSubmit(e) {
    e.preventDefault()
    if(!name /*|| !e === name*/ ){
      alert("hay que poner un perro existente"); 
  }
    dispatch(getNameDog(name))
    setName("")

}

  return (
    <div className="search-box">
      <div className="search-box">
      <input
        className="input-search"
        type="input"
        placeholder="  Dogs name..." 
        onChange={(e) => handleInputChange(e)}
        />
      <button type="submit" className="select" onClick={(e)=> handleSubmit(e)}>Buscar</button>
        </div>
    </div>
  );
}
