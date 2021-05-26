import React from 'react';
import {Link} from 'react-router-dom';
import {FiLogIn, FiLogOut, FiSearch, FiBarChart2} from 'react-icons/fi';
import './style.css';

import Logo_Negativo from '../../image/Logo-Negativo-site.png';

    function verifyLogin(){
        const user = sessionStorage.getItem('adminPolimerizeName');

        if(user){
            return true;
        }

        return false;
    }

export default function RedirectUser(){
    return(
        <div className={'container-redirect'}>
            <div className={'header-redirect'}>
                <Link className={'logo-redirect'} to={'/'}>
                    <img src={Logo_Negativo} alt="" />
                </Link>
                <nav className={'nav-redirect'}>
                    <ul>
                        <li>
                            <Link to={'/sample/validate'}>
                                <span>Consultar Amostra</span>
                                <FiSearch/>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/admin/dashboard'}>
                                <span>Administração</span>
                                <FiBarChart2/>
                            </Link>
                        </li>
                        <li>
                            {verifyLogin()
                                ?   (
                                        <Link to={'/login'} >
                                            <span>Logout</span> 
                                            <FiLogOut/>
                                        </Link>
                                    )
                                :   (
                                        <Link to={'/login'} >
                                            <span>Login</span>
                                            <FiLogIn/>
                                        </Link>
                                    )
                            }
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={'main-redirect'}></div>
        </div>
    );
    
}