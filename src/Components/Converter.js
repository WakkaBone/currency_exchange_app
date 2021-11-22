import React, {useState, useRef, Fragment} from 'react';
import {useSelector} from "react-redux";
import {MdCalculate} from 'react-icons/md'

const Converter = () => {
    const [amount, setAmount] = useState(0)
    const [resultMessage, setResultMessage] = useState('')
    const allRates = useSelector(state => state.latestRates)
    const errorMessage = useSelector(state => state.errorMessage)
    const currencyFromRef = useRef()
    const currencyToRef = useRef()

    const optionsConstructor = () => {
        const keys = Object.keys(allRates)
        return keys.map((currency, index) => <option key={index} value={currency}>{currency}</option>)
    }

    const convertHandler = () => {
        const calculateResult = () => {
            const currencyFromValue = allRates[currencyFromRef.current.value]
            const currencyToValue = allRates[currencyToRef.current.value]
            return amount * currencyToValue / currencyFromValue
        }
        setResultMessage(`${amount} ${currencyFromRef.current.value} = ${calculateResult()} ${currencyToRef.current.value}`)
    }

    return (
        <main style={{flexDirection: 'column'}}>
            <h1>Currency converter</h1>
            {errorMessage ? errorMessage :
                <Fragment>

                    <div className="form-floating">
                        <select id='currencyFrom' className="form-select form-select-lg mb-3"
                                aria-label="Floating label select example" ref={currencyFromRef}>
                            {allRates ? optionsConstructor() : <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>}
                        </select>
                        <label htmlFor='currencyFrom'>Convert from</label>
                    </div>
                    <div className="form-floating">
                        <select id='currencyTo' className="form-select form-select-lg mb-3"
                                aria-label="Floating label select example" ref={currencyToRef}>
                            {allRates ? optionsConstructor() : <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>}
                        </select>
                        <label htmlFor='currencyTo'>Convert to</label>
                    </div>
                    <form className="form-floating">
                        <input type="number" id='amount' className="form-control"
                               onChange={(e) => setAmount(+e.target.value)}
                               placeholder="amount of money you want to convert"/>
                        <label htmlFor="amount">Amount of money</label>
                    </form>

                    <div className='resultContainer'>
                        <div><button className='btn btn-primary' onClick={convertHandler}>Check <MdCalculate/></button></div>
                        <div><p className='result'>{resultMessage ? <Fragment><h3>Result: </h3><p>{resultMessage}</p></Fragment>: ''}</p></div>
                    </div>

                </Fragment>}
        </main>
    );
};

export default Converter;