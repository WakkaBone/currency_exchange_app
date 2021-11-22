import React from 'react';
import {BsTelegram, BsWhatsapp, BsInstagram} from 'react-icons/bs'
import {MdEmail} from 'react-icons/md'

const Footer = () => {
    const copy = (text) => {
        navigator.clipboard.writeText(text)
        alert('Copied to clipboard!')
    }
    return (
        <footer>
            <div>&copy; 2021, all rights reserved</div>
            <div><BsTelegram onClick={() => copy('@wakkabone')} className='marginRight'/> <BsWhatsapp
                onClick={() => copy('@wakkabone')} className='marginRight'/>
                <BsInstagram onClick={() => copy('wakkabone')} className='marginRight'/> <MdEmail
                    onClick={() => copy('wakkarap@yandex.ru')} className='marginRight'/></div>
        </footer>
    );
};

export default Footer;