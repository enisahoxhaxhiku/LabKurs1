import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';

export class Navigation extends Component{
 
    render(){
        function logout(){
            localStorage.clear();
            {window.location.href="/"}
          }

          function Admin(){
            const role = (localStorage.getItem("role"));
            if (role === "Admin"){
              return true;
            }
          }

          
        const token = (localStorage.getItem("token"));
        const emri = (localStorage.getItem("emri"));
        return(
            <Navbar bg="info" expand="lg">
                <NavLink className="navbar-brand" to="/">
                   <b>&nbsp;Librat</b> 
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav "/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                <NavLink className="nav-link d-inline p-1 text-light" to="/">
                    Librat Shqip
                </NavLink>
                </Nav>

                <Nav>
                <NavLink className="nav-link d-inline p-1 text-light" to="/autorethuaj">
                    Librat e Huaja
                </NavLink>
                </Nav>
                <Nav>
                <NavLink className="nav-link d-inline p-1 text-light" to="/autoretshqip">
                    Autoret Shqipetare
                </NavLink>
                </Nav>
                <Nav>
                <NavLink className="nav-link d-inline p-1 text-light" to="/revistatshqip">
                    Revistat Shqip
                </NavLink>
                </Nav>
                <Nav>
                <NavLink className="nav-link d-inline p-1 text-light" to="/publicistetshqip">
                    Publicistet Shqipetare
                </NavLink>
                </Nav>
                <Nav>
                <NavLink className="nav-link d-inline p-1 text-light" to="/eventetshqip">
                    Eventet Shqip
                </NavLink>
                </Nav>
                <Nav>
                <NavLink className="nav-link d-inline p-1 text-light" to="/rrethneshh">
                    Rreth Nesh
                </NavLink>
                </Nav>
                <Nav>
                <NavLink className="nav-link d-inline p-1 text-light" to="/dergomesazh">
                    Kontakti
                </NavLink>
                </Nav>
                {token && Admin() && 
                <Nav>
                <NavLink className="nav-link d-inline p-1 text-light" to="/dashboard">
                    Dashboard
                </NavLink>
                </Nav>}
                </Navbar.Collapse> 
                {!token &&<Navbar.Collapse className="right">
                <Nav  className="right">
                <NavLink className="nav-link d-inline p-1 text-light mr-5" to="/login">
                    <strong>Login&nbsp;</strong>
                </NavLink>
                </Nav>
                </Navbar.Collapse>}
                {token && <Navbar.Collapse className="right">
                <Nav  className="right">
                <NavLink className="nav-link d-inline p-1 text-light mr-5" onClick={logout} to="/">
                     <strong>Logout&nbsp;</strong>
                </NavLink>
                </Nav>
                <Nav  className="right">
                <NavLink className="nav-link d-inline p-1 text-light mr-5" to="#">
                     <strong>Miresevini, {emri}&nbsp;</strong>
                </NavLink>
                </Nav>
                </Navbar.Collapse>}
            
              
            </Navbar>
        )
    }
}