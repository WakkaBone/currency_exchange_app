import React, {useRef, useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import {FixedSizeList} from "react-window";
import {FaSearchDollar} from "react-icons/fa"
import {AiFillEuroCircle} from 'react-icons/ai'
import {FcCurrencyExchange} from 'react-icons/fc'

const CurrentRates = () => {
    const allRates = useSelector(state => state.latestRates)
    const containerRef = useRef()
    const searchRef = useRef()
    const [array, setArray] = useState([])
    const [searchMode, setSearchMode] = useState(false)
    const [filteredCurrency, setFilteredCurrency] = useState([])

    const makeArray = () => {
        const arr = []
        const keys = Object.keys(allRates)
        const values = Object.values(allRates)
        for (let i = 0; i < keys.length; i++) {
            arr.push({currency: keys[i], value: values[i]})
        }
        return arr
    }

    useEffect(() => {
        if (allRates) setArray(makeArray())
    }, [allRates])

    const strongestFirstHandler = () => {
        const newArr = [...array].sort((a, b) => a.value > b.value ? 1 : -1)
        setArray(newArr)
    }
    const weakestFirstHandler = () => {
        const newArr = [...array].sort((a, b) => a.value < b.value ? 1 : -1)
        setArray(newArr)
    }
    const ascendingOrderHandler = () => {
        const newArr = [...array].sort((a, b) => a.currency > b.currency ? 1 : -1)
        setArray(newArr)
    }
    const descendingOrderHandler = () => {
        const newArr = [...array].sort((a, b) => b.currency > a.currency ? 1 : -1)
        setArray(newArr)
    }
    const searchHandler = () => {
        setSearchMode(true)
        setFilteredCurrency(makeArray(allRates).filter(({currency}) => currency.toLowerCase().trim() === searchRef.current.value.toLowerCase().trim()))
    }
    const backToAll = () => {
        setSearchMode(false)
        ascendingOrderHandler()
    }
    return (
        <main>
            <div ref={containerRef} style={{display: 'flex', flexDirection: 'column'}}>
                <div className='centerContent'><h1>Current rates</h1></div>
                <div className='centerContent'><strong>Base currency is <u>EUR</u> <AiFillEuroCircle/></strong></div>
                <div className='centerContent'><input ref={searchRef} type='search' placeholder='enter currency name'/>
                    <button className='btn-primary' onClick={searchHandler}><FaSearchDollar/></button>
                </div>
                <div className='centerContent'>
                    <button className='btn-primary' onClick={backToAll}>Reset all filters</button>
                </div>
                <div className='centerContent'>
                    <button className='btn-primary' onClick={strongestFirstHandler}>Strongest currencies first</button>
                </div>
                <div className='centerContent'>
                    <button className='btn-primary' onClick={weakestFirstHandler}>Weakest currencies first</button>
                </div>
                <div className='centerContent'>
                    <button className='btn-primary' onClick={ascendingOrderHandler}>Sort in ascending order</button>
                </div>
                <div className='centerContent'>
                    <button className='btn-primary' onClick={descendingOrderHandler}>Sort in descending order</button>
                </div>
            </div>
            <div>
                {searchMode ? filteredCurrency.length ? filteredCurrency.map(({currency, value}, index) => <ul
                        key={index}>
                        <li><FcCurrencyExchange/>
                            <strong>{currency}</strong>: {value} <sub>/1EUR</sub></li>
                    </ul>) : 'Nothing was found' :
                    array.length &&
                    <FixedSizeList innerElementType="ul" style={{overflowX: 'hidden', width: '50%'}}
                                   useIsScrolling={true}
                                   itemData={array} itemCount={array.length} itemSize={30}
                                   height={containerRef.current.clientHeight} width={500}>
                        {({data, index, style, isScrolling}) => {
                            return isScrolling ? <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> : (
                                <li style={style}><FcCurrencyExchange/>
                                    <strong>{data[index].currency}</strong>: {data[index].value} <sub>/1EUR</sub></li>)
                        }}
                    </FixedSizeList>}
            </div>
        </main>
    );
};

export default CurrentRates;