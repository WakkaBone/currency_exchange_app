import {currencyReducer} from "./reducers";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

export const store = createStore(currencyReducer, composeWithDevTools(applyMiddleware(thunk)))