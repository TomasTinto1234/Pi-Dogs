import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAll,
  getTemperaments,
  filterByTemperaments,
  filterCreated,
  orderByName,
  orderByWeight,
} from "../actions";
import Card from "./Card";
import SearchBar from "./SearchBar";
import Paginado from "./Paginado";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs); //trae todo lo que este en el reducer de dogs
  const [, /*orden*/ setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1); //seteado el estado local, la pag actual y el estado que setee la pag
  const [dogsPerPage /*setDogsPerPage*/] = useState(8); //los perros por paginas
  const indexOfLastDog = currentPage * dogsPerPage; //Mi paginas por los dogs por pag
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs?.slice(indexOfFirstDog, indexOfLastDog); //divide el array de perros para cada pag, dejando 8porpag
  const [, /*[order*/ setOrder] = useState("");
  const allTemperaments = useSelector((state) => state.temperament);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAll()); //es lo mimso que el mapdistpachtoprops
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAll()); // por si se bugeea
  }

  function handleFilterTemperaments(e) {
    dispatch(filterByTemperaments(e.target.value));
    setCurrentPage(1);
    setOrder(`${e.target.value}`);
  }

  function handleFilterCreated(e) {
    if (e.length === 0) {
      alert("no hay perro para mostrar");
    } else {
      dispatch(filterCreated(e.target.value));
      setCurrentPage(1);
      setOrden(`${e.target.value}`);
    }
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`${e.target.value}`);
  }

  function handleByWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrden(`${e.target.value}`);
  }

  return (
    <div>
      <div>
        <SearchBar setCurrentPage={setCurrentPage} />
        <div>
          <div className="columns">
            <Link to="/dogs">
              <button className="select">CREA UN PERRO</button>
            </Link>
          </div>

          <div>
            <div className="columns">
              <select className="select" onChange={(e) => handleSort(e)}>
                <option>Orden mayor a menor </option>
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
              </select>
              <select className="select" onChange={(e) => handleByWeight(e)}>
                <option>Orden Por Peso</option>
                <option value="asc">menor Peso</option>
                <option value="desc">mayor Peso</option>
              </select>
            </div>
            <div className="columns">
              <select
                className="select"
                onChange={(e) => handleFilterCreated(e)}
              >
                <option value="all">Todas Las Razas</option>
                <option value="api">Razas Existentes</option>
                <option value="createdInDb">
                  Razas Creadas En Base de Datos
                </option>
              </select>

              <select
                className="select"
                onChange={(e) => handleFilterTemperaments(e)}
              >
                <option key={0} value="all">
                  Temperamentos
                </option>
                {allTemperaments &&
                  allTemperaments
                    ?.sort(function (a, b) {
                      if (a.name < b.name) return -1;
                      if (a.name > b.name) return 1;
                      return 0;
                    })
                    .map((e) => {
                      return (
                        <option key={e.id} value={e.name}>
                          {e.name}
                        </option>
                      );
                    })}
              </select>
            </div>
            <div className="caja-card1">
              <Link to="/">
                <button className="select">
                  <span>Welcome Page</span>
                </button>
              </Link>
            </div>
            <button
              className="select"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              RECARGAR PERROS
            </button>
            <Paginado // aca le agrego las props que necesita el paginado para funcionar
              dogsPerPage={dogsPerPage}
              allDogs={allDogs.length}
              paginado={paginado}
            />
          </div>
        </div>
      </div>
      <div className="container">
        {currentDogs.length === 0 ? ( //si no hay perros que me muestre esta imagen
          <div>
            <h1>NO HAY PERROS PARA MOSTRAR</h1>
            <img
              src="https://i.pinimg.com/originals/79/a4/b9/79a4b912377bcf73101684d62ea9590f.gif"
              alt="img not found"
              width="400px"
              height="450px"
            />
          </div>
        ) : (
          currentDogs?.map((e) => {
            return (
              <div className="caja" key={e.id}>
                <Link to={"/detail/" + e.id}>
                  <Card
                    key={e.id}
                    name={e.name}
                    image={e.image}
                    weightMin={e.weightMin}
                    weightMax={e.weightMax}
                    heightMin={e.heightMin}
                    heightMax={e.heightMax}
                    temperament={e.temperament}
                    life_span={e.life_span}
                  />
                </Link>
              </div>
            );
          })
        )}
      </div>
      <div className="icons-wrapper">
			<Fragment>

          <a  href="https://www.instagram.com/tomas_tinto/" target="_blank" class="ri-instagram-line icon">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="img not found"
              width="40px"
              height="45px"
			  />
          </a>

	
          <a href="https://www.facebook.com/tititinto/" target="_blank" class="ri-facebook-circle-line icon">
            <img
              src="data:image/png;base64,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"
              alt="img not found"
              width="40px"
              height="45px"
			  />
          </a>

		
        <a href="https://web.whatsapp.com/" target="_blank" class="ri-whatsapp-line icon"><img
              src="https://png.pngtree.com/element_our/md/20180626/md_5b321c98efaa6.jpg"
              alt="img not found"
              width="40px"
              height="45px"
			  /></a>

       
	
              <a href="https://github.com/TomasTinto1234" class="ri-instagram-line icon" target='_blank' rel="noreferrer"><img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="img not found"
              width="40px"
              height="45px"
			  /></a>
   
              <a href="https://www.linkedin.com/in/tomas-tinto-320a85236/" class="ri-facebook-circle-line icon" target='_blank' rel="noreferrer">
			  <img
              src="data:image/png;base64,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"
              alt="img not found"
              width="40px"
              height="45px"
			  />
              </a>

	
	  </Fragment>
      </div>
    </div>
  );
}
