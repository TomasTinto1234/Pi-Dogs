import axios from "axios";

//el thunk puede ser usado para retrasar el envío de una acción hasta que se cumpla una línea de código asíncrona.
//el thunk puede ser usado para retrasar el envío de una acción hasta que se cumpla una línea de código asíncrona.
//el thunk puede ser usado para retrasar el envío de una acción hasta que se cumpla una línea de código asíncrona.
//el thunk puede ser usado para retrasar el envío de una acción hasta que se cumpla una línea de código asíncrona.

export const getAll = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/dogs"); //aca en donde se conecta el front con el back
      return dispatch({
        type: "GET_DOGS",
        payload: json.data, //esta es toda la informacion que me llega del back
      });
    } catch (error) {
      console.log(error);
    }
  };
};
// export const getAllDogs1 = () => (dispatch) => {
//   return fetch("http://localhost:3001/dogs")
//     .then((respose) => respose.json())
//     .then((json) => dispatch({ type: "GET_ALL_DOGS", payload: json }))
//     .catch((error) => console.error("Error:", error));
// };

export const getAllDogs = () => (dispatch) => {
  return fetch("http://localhost:3001/dogs")
    .then((response) => response.json())
    .then((json) => {
      dispatch({
        type: "GET_ALL_DOGS",
        payload: json,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export function getNameDog(name) {
  return async function (dispatch) {
    try {
      const json = await axios(`http://localhost:3001/dogs?name=${name}`);
      return dispatch({
        type: "GET_NAME_DOG",
        payload: json.data, // este json.data es lo que yo le asigno en axios, cuando le pongo un name
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    try {
      const json = await axios("http://localhost:3001/temperaments");
      return dispatch({
        type: "GET_TEMPERAMENT",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterByTemperaments(payload) {
  return {
    type: "FILTER_BY_TEMPERAMENTS",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}
export function orderByWeight(payload) {
  return {
    type: "ORDER_WEIGHT",
    payload,
  };
}
export function getBreeds() {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/dogs", {});
      let breedsdoble = json.data.map((dog) => dog.breeds);
      let breeds = [...new Set(breedsdoble)];
      return dispatch({
        type: "GET_BREEDS",
        payload: breeds,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function filterBreeds(payload) {
  return {
    type: "FILTER_BY_BREEDS",
    payload,
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios("http://localhost:3001/dogs/" + id);
      console.log(json);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function createDog(payload) {
  //y este payload es lo que me va a llegar en el front
  return async function (dispatch) {
    // ||
    try {
      // ||
      const response = await axios.post("http://localhost:3001/dogs", payload); //aca quiero en esta ruta hacer el post del payload
      return dispatch({
        type: "CREATE_DOG",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const deleteDog = (id) => {
  console.log(id);
  return async function (dispatch) {
    try {
      await axios.delete(`http://localhost:3001/dogs/${id}`);
      return dispatch({
        type: "DELETE_DOG",
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function clean() {
  return {
    type: "CLEAN",
  };
}
