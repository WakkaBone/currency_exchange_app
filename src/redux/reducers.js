import {GET_LATEST_RATES, GET_LATEST_RATES_FAIL} from "./actions";

export const currencyReducer = (state = {}, action) => {
    switch (action.type){
        case GET_LATEST_RATES: return {...state, latestRates: action.payload}
        case GET_LATEST_RATES_FAIL: return {...state, errorMessage: action.payload}
        default: return state
    }
}