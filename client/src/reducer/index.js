const initialState = {
  // inicializo el estado de cada reducer con un objeto, array vacio
  dogs: [],
  temperament: [],
  breeds: [],
  detail: [],
  filterDogs: [],
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state, // me retorno el estado actual
        dogs: action.payload, //se envia todo lo que te envia la accion dogs
        filterDogs: action.payload,
      };

    case "GET_NAME_DOG":
      return {
        ...state,
        dogs: action.payload,
      };
    case "GET_TEMPERAMENT":
      return {
        ...state,
        temperament: action.payload,
      };
    case "FILTER_BY_TEMPERAMENTS":
      const allDogs = state.filterDogs;
      const temperamentFilter =
        action.payload === "Alltemp"
        ? allDogs
        : allDogs.filter((e) => e.temperament?.includes(action.payload));
        
        return {
          ...state,
          dogs: temperamentFilter,
        };
        case "GET_BREEDS": 
          return {
            ...state,
            breeds: action.payload,
          };
          case "FILTER_BY_BREEDS":
      const allDogs1 = state.filterDogs;
      const breedsFilter =
        action.payload === "allRazas"
          ? allDogs1
          : allDogs1.filter((d) => d.breeds === action.payload);
      return {
        ...state,
        dogs: breedsFilter,
      };
    case "FILTER_CREATED":
      const allDogsCreated = state.filterDogs;
      const createdFilter =
        action.payload === "createdInDb"
          ? allDogsCreated.filter((e) => e.createdInDb)
          : allDogsCreated.filter((e) => !e.createdInDb);
      return {
        ...state,
        dogs: action.payload === "all" ? state.filterDogs : createdFilter,
      };
    case "ORDER_BY_NAME":
      let order =
        action.payload === "asc"
          ? state.dogs.sort(function (a, b) {  // accede a mi estado dogs que es el que se esta renderizando y le hace un sort
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {    // va comparando dos valores y ponerlo en orden 
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: order,
      };
    case "ORDER_WEIGHT":
      const orderDog = state.dogs.filter((d) => d.weightMax);
      console.log(action.payload);
      const filterWeight =
        action.payload === "weight asc"
          ? orderDog.sort(function (a, b) {
         
              return a.weightMin - b.weightMin;
            })
          : orderDog
              .sort(function (a, b) {
                return a.weightMax - b.weightMax;
              })
              .reverse();

      return {
        ...state,
        dogs: filterWeight,
      };
    case "ORDER_BY_WEIGHT":
      const orderByPeso =
        action.payload === "weight asc"
          ? state.dogs.sort(function (b, a) {
              if (a.weightMax !== "Nan" && b.weightMin !== "Nan") {
                return b.weightMax - a.weightMax;
              } else if (a.weightMax === "Nan" || b.weightMax === "Nan") {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.weightMin !== "Nan" && b.weightMax !== "Nan") {
                return b.weightMin - a.weightMax;
              } else if (a.weightMin === "Nan" || b.weightMin === "Nan") {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: orderByPeso,
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };
    case "CREATE_DOG":
      return {
        ...state,
      };

    case "DELETE_DOG":
      return {
        ...state,
      };
    case "CLEAN":
      return {
        ...state,
        detail: {},
      };

    default:
      return state;
  }
}

export default rootReducer;
