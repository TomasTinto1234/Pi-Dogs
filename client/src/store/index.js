import { legacy_createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer";

//thunk te permite escribir creadores de acciones que retornan una función en vez de un objeto de acción típico. Entonces, 
//el thunk puede ser usado para retrasar el envío de una acción hasta que se cumpla una línea de código asíncrona.
export const store = legacy_createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))