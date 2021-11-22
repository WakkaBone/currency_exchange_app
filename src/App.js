import './App.css';
import React, {useEffect} from "react";
import Converter from "./Components/Converter";
import CurrentRates from "./Components/CurrentRates";
import {Routes, Route} from 'react-router-dom'
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import {useDispatch} from "react-redux";
import {getLatestRatesFetch} from "./redux/actions";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLatestRatesFetch())
    }, [])

  return (
    <div>
        <Header/>
      <Routes>
        <Route path='/converter' element={<Converter/>}/>
        <Route path='/currentRates' element={<CurrentRates/>}/>
        <Route path='/' element={<Converter/>}/>
        <Route path='/*' element={<h2 style={{textAlign: 'center'}}>Oops, looks like such page doesn't exist</h2>}/>
      </Routes>
        <Footer/>
    </div>
  );
}

export default App;