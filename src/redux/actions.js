export const GET_LATEST_RATES = 'GET_LATEST_RATES'
export const GET_LATEST_RATES_FAIL = 'GET_LATEST_RATES_FAIL'

export const getLatestRates = rates => ({type: GET_LATEST_RATES, payload: rates})
export const getLatestRatesFail = () => ({type: GET_LATEST_RATES_FAIL, payload: 'Something went wrong: unable to get rates'})

export const getLatestRatesFetch = () => (dispatch) => {
    fetch(`${process.env.REACT_APP_BASEURL}/latest?access_key=${process.env.REACT_APP_APIKEY}`, {method: 'get'})
        .then(response => response.json())
        .then(result => {
            if(result.rates) dispatch(getLatestRates(result.rates))
            else dispatch(getLatestRatesFail())
    })
        .catch(e => {if(e) console.log(e)})
}