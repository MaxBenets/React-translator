import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import translate from "./reducers/translate_reducer";

const reducers = combineReducers({translate});
const store = createStore(reducers, applyMiddleware(thunk))

export default store;
window.store = store