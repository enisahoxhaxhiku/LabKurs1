import React,{Component} from 'react';
import './Footer.css';
import {NavLink} from 'react-router-dom';


export class Footer extends Component{
    render(){
        return(
            <div className="footer">
                <p>&copy;<span>Te Gjitha te drejtat te rezervuara</span> 
                <NavLink className="nav-link d-inline p-1 text-blue" to="/">
                    Librat
                </NavLink></p>
            </div>
        )
    }
}