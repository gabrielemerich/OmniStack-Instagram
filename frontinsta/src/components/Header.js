import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

import logo from '../assets/logo.svg'
import send2 from '../assets/send2.svg'

export default function Header(){
    return(
        <header id="main-header">
            <div className="header-content">
                <Link to="/">
                    <img style={{width:30}} src={logo} alt="insta"></img>
                </Link>
                <Link to="/new">
                    <img style={{width:30}} src={send2} alt="enviar publicacao"></img>
                </Link>
            </div>
        </header>
    )
}