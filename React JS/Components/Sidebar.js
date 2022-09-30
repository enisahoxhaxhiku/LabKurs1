import React from 'react'

import {Link} from 'react-router-dom';

const Sidebar = () => {

  return (
    <div className="sidebar-main-container">
        <div className="sidebar-container">
            <Link className='link link-sidebar' to="/">Home</Link>
            
            
            
            {localStorage.getItem('token') && (
            localStorage.getItem('Role')==="Admin" ||
            localStorage.getItem('Role')==="HeadAdmin"  ||
            localStorage.getItem('Role')==="bHead"  ||
            localStorage.getItem('Role')==="dHead"  ||
            localStorage.getItem('Role')==="worker" ) && <Link className='link link-sidebar' to="/staff">Perdoruesi</Link>}
            
            
            
            {localStorage.getItem('token') && (
            localStorage.getItem('Role')==="Admin" ||
            localStorage.getItem('Role')==="HeadAdmin" ) && <Link className='link link-sidebar' to="/branches">Takiimet</Link>}
            
            
            
            {localStorage.getItem('token') && (
            localStorage.getItem('Role')==="Admin" ||
            localStorage.getItem('Role')==="HeadAdmin"  ||
            localStorage.getItem('Role')==="bHead") && <Link className='link link-sidebar' to="/departments">Lokacioni</Link>}
            
            
            
            {localStorage.getItem('token') && (
            localStorage.getItem('Role')==="Admin" ||
            localStorage.getItem('Role')==="HeadAdmin"  ||
            localStorage.getItem('Role')==="bHead"  ||
            localStorage.getItem('Role')==="dHead"  ||
            localStorage.getItem('Role')==="secretary" ) && <Link className='link link-sidebar' to="/bills">Rekomandimet</Link>}
            
            
            
            {localStorage.getItem('token') && (
            localStorage.getItem('Role')==="Admin" ||
            localStorage.getItem('Role')==="HeadAdmin"  ||
            localStorage.getItem('Role')==="bHead"  ||
            localStorage.getItem('Role')==="dHead"  ||
            localStorage.getItem('Role')==="worker" ) && <Link className='link link-sidebar' to="/woods">Koha</Link>}
            
            
            
            {localStorage.getItem('token') && (
            localStorage.getItem('Role')==="Admin" ||
            localStorage.getItem('Role')==="HeadAdmin"  ||
            localStorage.getItem('Role')==="bHead"  ||
            localStorage.getItem('Role')==="dHead"  ||
            localStorage.getItem('Role')==="worker" ) && <Link className='link link-sidebar' to="/complaints">Restaurantet</Link>}
            
            
            
          
            
        </div>
    </div>

  )
}

export default Sidebar