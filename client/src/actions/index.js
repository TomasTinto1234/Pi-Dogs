import axios from "axios";


export const getAll = () => {
  return async function (dispatch) {
     try {
      const json = await axios.get("http://localhost:3001/dogs");    //aca en donde se conecta el front con el back
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
     } catch (error) {
        console.log(error)
     }
    
  };
}

export function getNameDog(name) {
  return async function (dispatch) {
    const json = await axios(`http://localhost:3001/dogs?name=${name}`);
    return dispatch({
      type: "GET_NAME_DOG",
      payload: json.data,
    });
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
      console.log(error)
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
    type: "ORDER_BY_WEIGHT",
    payload,
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios("http://localhost:3001/dogs/" + id);
     console.log(json)
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });

    } catch (error) {
      console.log(error)
    }
  };
}

export function createDog(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/dogs", payload);
      return dispatch({
        type: "CREATE_DOG",
        payload: response.data,
      });
      
    } catch (error) {
      console.log(error)
    }
  };
}

export const deleteDog = (id) => {
  console.log(id)
  return async function(dispatch){
    try {
      await axios.delete (`http://localhost:3001/dogs/${id}`)
      return dispatch({
        type: "DELETE_DOG"
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function clean() {
  return {
    type: "CLEAN",
  };
}

