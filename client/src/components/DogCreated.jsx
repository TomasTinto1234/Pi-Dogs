import React, {Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDog, getTemperaments, clean, getBreeds } from "../actions";
import { useDispatch, useSelector } from "react-redux";


export function CreateDog() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperament);
  const breed = useSelector((state) => state.breeds)
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    image: "",
    life_span: "",
    heightMax: "",   // aca quiero meter los dos valores de...
    heightMin: "",
    weightMax: "",
    weightMin: "",
    breeds: "",
    temperament: [],
  });
  function validate(input) {  // input === ESTADO LOCAL
    let errors = {};
    if (!input.name) {
      errors.name = "el nombre tiene que ser completado";
    }
    else
  
    if (!input.heightMax) {
      errors.heightMax = "el peso tiene que ser completado";
    }
  else
    if (!input.weightMax) {
      errors.heightMax = "la altura tiene que ser completada"
    }
  else
    if (!input.life_span) {
      errors.life_span = "rango de vida";
    }
  
    return errors;
  }

  useEffect(() => {
    if(!temperaments.length){
      dispatch(getTemperaments());
      dispatch(getBreeds())
      dispatch(clean());
    }
  }, [dispatch,temperaments]);

  function handleChange(e) {
    setInput({  // aca  quiero ir guardando las cosas que el usuario va aescribiendo en el input, en un estado input
      ...input,
      [e.target.name]: e.target.value, // aca se trae todo lo que ya tenia y se lo setea a e.target.value
    });

    setErrors(
      validate({
        ...input,
        [e.target.value]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    !input.temperament.includes(e.target.value)
    ?setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    }): alert("el temperamento ya existe");
  }
  function handleSelectBreed (e) {
    e.preventDefault();
    setInput({
        ...input,
        breeds: e.target.value
    })
}
      function handleSubmit(e) {
        e.preventDefault();
        dispatch(createDog(input));
        console.log(input);
        alert(`${input.name.toUpperCase()} fue creado con exito `);
        setInput({
          name: "",
          image: "",
          life_span: "",
          heightMax: "",
          heightMin: "",
          weightMax: "",
          weightMin: "",
          breeds: "",
          temperament: [],
        });
        history.push("/home");
        return console.log("se creo")
      }

  function handleDelete(el) {
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== el),
    });
  }
  
  return (
    <div>
          <div><h3><u>Pi Tomas Tinto</u></h3></div>
		<div className="dog">
			<div className="dog-head">
				<div className="dog-ears ears-left"></div>
				<div className="dog-ears ears-right"></div>
				<div className="dog-eyes"></div>
				<div className="dog-mouth">
					<div className="dog-nose"></div>
					<div className="dog-tongue"></div>
				</div>
			</div>
			<div className="dog-tail"></div>
			<div className="dog-body">
				<div className="dog-foot"></div>
			</div>
			<div className="ball"></div>
		</div>

      <div className="icons">
			<Fragment>

          <a  href="https://www.instagram.com/tomas_tinto/" target="_blank" className="ri-instagram-line icon" rel="noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="img not found"
              width="40px"
              height="45px"
			  />
          </a>

	
          <a href="https://www.facebook.com/tititinto/" target="_blank" className="ri-facebook-circle-line icon" rel="noreferrer"> 
            <img
              src="data:image/png;base64,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"
              alt="img not found"
              width="40px"
              height="45px"
			  />
          </a>

		
        <a href="https://web.whatsapp.com/" target="_blank" className="ri-whatsapp-line icon" rel="noreferrer"><img
              src="https://png.pngtree.com/element_our/md/20180626/md_5b321c98efaa6.jpg"
              alt="img not found"
              width="40px"
              height="45px"
			  /></a>

       
	
              <a href="https://github.com/TomasTinto1234" className="ri-instagram-line icon" target='_blank' rel="noreferrer"><img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="img not found"
              width="40px"
              height="45px"
			  /></a>
   
              <a href="https://www.linkedin.com/in/tomas-tinto-320a85236/" className="ri-facebook-circle-line icon" target='_blank' rel="noreferrer">
			  <img
              src="data:image/png;base64,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"
              alt="img not found"
              width="40px"
              height="45px"
			  />
              </a>

	
	  </Fragment>
      </div>
      <Link to="/home">
        <button className="select">VOLVER</button>
      </Link>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <input
              className="input"
              type="text"
              id="outlined-required"
              label="Required"
              value={input.name}
              placeholder=" Nombre Del Perro"
              name="name"
              onChange={(e) => handleChange(e)}
              required //campo requerido
              />
              {errors.name && <p>{errors.name}</p>}
<div></div>
            <input
              className="input"
              type="number"
              min="1"
              value={input.heightMin}
              placeholder="Altura Minimo"
              name="heightMin"
              onChange={(e) => handleChange(e)}
              required
            />
            <div></div>
            <input
              className="input"
              type="number"
              min={input.heightMin}
              value={input.heightMax}
              placeholder="Altura Maximo"
              name="heightMax"
              onChange={(e) => handleChange(e)}
              required
            />
            <div></div>
            <input
              className="input"
              type="number"
              min="1"
              value={input.weightMin}
              placeholder="Peso Minimo"
              name="weightMin"
              onChange={(e) => handleChange(e)}
              required
            />
            <div></div>
            <input
              className="input"
              type="number"
              min={input.weightMin}
              value={input.weightMax}
              placeholder="Peso Maximo"
              name="weightMax"
              onChange={(e) => handleChange(e)}
              required
            />
            <div></div>
            <input
              className="input"
              type="text"
              value={input.life_span}
              placeholder="Vida Estimada"
              name="life_span"
              onChange={(e) => handleChange(e)}
              required
            />
<div></div>
            <input
              className="input"
              type="text"
              value={input.image}
              name="image"
              placeholder="Tu Imagen Aqui"
              onChange={(e) => handleChange(e)}
            />
            <div></div>
            <input
              className="input"
              type="input"
              value={input.breeds}
              name="breeds"
              placeholder="Tu raza Aqui"
              onChange={(e) => handleChange(e)}
            />
                    
<div></div>
<div>
<select 
              className="input"
              type="select"
              onChange={(e) => handleSelectBreed(e)}
              required
            >
              <option  required hidden={true}>Razas</option>
              {breed.map((e, b) => (
                <option className="searchTerm" key={b} value={e}>
                  {e} 
                </option>
              ))}
            </select>
                    </div>
                    <div></div>
            
            <select 
              className="input"
              type="select"
              onChange={(e) => handleSelect(e)}
              required
            >
              <option  required hidden={true}>Temperamentos</option>
              {temperaments.map((e, t) => (
                <option key={t} className="searchTerm" value={e.name}>
                  {e.name} 
                </option>
              ))}
            </select>

            <div>
              {input.temperament.map((e) => (
                <div key={e} className="searchTerm">
                  {e}
                  <button 
                    className="select"
                    type="button"
                    onClick={() => handleDelete(e)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button className="select" type="submit">
            Crea Tu Perro
          </button>
        </form>
      </div>
       
    </div>
  );
}
