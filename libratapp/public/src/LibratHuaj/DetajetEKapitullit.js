import React,{Component} from "react";
import {Card, Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import {NavLink} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { Button } from 'react-bootstrap';

export class DetajetEKpitullit extends Component{
    
  constructor(props){
    super(props)
    this.state={librat:[]}
}

refreshList(){
  let {seid} = this.props.match.params;
  fetch(process.env.REACT_APP_API+`librathuaj/${seid}`, {
    method: 'GET',


  })
    .then(response=>response.json())
    .then(data=>{
        this.setState({librat:data});
    });
}


componentDidMount(){
    this.refreshList();
   
   
}

componentDidUpdate(){
    this.refreshList();
   
    
}


    render(){
      const {librat}=this.state;
        return(
            <div className="container">
            
              

 
                <div className="container d-flex flex-wrap">
                {librat.map(lib=>
                 <Link key={lib.LibratH_Id} className="nav-link d-inline" to={`/detajetefaqeve/${lib.KapitulliID}`}>
                     
               
                
               
                  <Card className="mt-4 d-flex flex-column" key={lib.LibratH_Id}style={{ width: '70rem' }}>
                  <Card.Body>
                    <Card.Title className="mb-4">Kapitulli <strong> {lib.NrKapitujve }</strong></Card.Title>
                      
                      
                  </Card.Body>
                 

                
                </Card>
                </Link>
                )}
                </div>
            </div>
            
        )
    }
}