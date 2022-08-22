import React from "react";
import"./Paginado.css"

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumbers = [];
  //redondea todos los personajes por los personajes por pagina
  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      {pageNumbers &&
        pageNumbers.map((number) => (
          <ul className="pagination" key={number}>
            <li  onClick={() => paginado(number)}>
              <a>{number} </a>
            </li>
          </ul>
        ))}
    </nav>
  );
}
