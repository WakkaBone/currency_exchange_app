import React from 'react';
import {useNavigate} from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    return (
        <header>
            <nav>
                <div onClick={() => navigate('/')} className='logo'/>
                <div>
                        <ul>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/converter"><h4>Converter</h4></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/currentRates"><h4>Current rates</h4></a>
                            </li>
                        </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;