import React,{Component} from 'react';
import './footer.css';
import {NavLink} from 'react-router-dom';


export class Footer extends Component{
    render(){
        return(
            <div className="footer">
                <p>&copy;<span>Copyright 2022 </span> 
                <NavLink className="nav-link d-inline p-1 text-blue" to="/">
                    DatePlanner, Inc
                </NavLink></p>
            </div>
        )
    }
}
