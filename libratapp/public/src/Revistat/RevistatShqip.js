import React,{Component} from "react";
import {Helmet} from "react-helmet";
import { Dropdown ,Button , ButtonToolbar } from "react-bootstrap";
import {Link, NavLink } from "react-router-dom";
import {Card} from 'react-bootstrap';

export class RevistatShqip extends Component{


constructor(props){
    super(props)
    this.state={rev:[]}
}

refreshList(){
    fetch(process.env.REACT_APP_API+'revistatshqip')
    .then(response=>response.json())
    .then(data=>{
        this.setState({rev:data});
    });
}
    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    render(){
        const{rev}=this.state;
        return(
            <div className="container shadow p-3 mb-5 bg-white rounded mt-4">
                <Helmet>
                    <title>Revistat Shqip</title>
                </Helmet>
                <Dropdown className="d-flex justify-content-end mt-4">
                <Dropdown.Toggle variant="success">
                    Revistat Shqip
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <NavLink className="nav-link d-inline p-1 text-black" to="/revistatehuaja">
                    Revistat Shqip
                    </NavLink>
                </Dropdown.Menu>
                </Dropdown>
                <div className="container d-flex flex-wrap">
                    {rev.map(r=>
                        <Link key={rsh.RevistatShID} className="nav-link d-inline" to={`/detajeterevistaveshqip/${rsh.RevistatShID}`}>
                        <Card className="mt-4" border="primary" style={{width:'17rem',height:'10rem'}}>
                        <Card.Body>
                            <Card.Title className="text-secondary d-flex justify-content-center"><span className="text-dark">Emri : </span>{rsh.Emri}</Card.Title>
                            <Card.Title className="text-secondary d-flex justify-content-center"><span className="text-dark">Pershkrimi : </span>{rsh.Pershkrimi}</Card.Title>
                            <ButtonToolbar  className="d-flex justify-content-center" >
                                <Button variant="success">
                                Me shume
                                </Button>
                                 
                            </ButtonToolbar>
                        </Card.Body>
                        </Card>
                        </Link>
                        )}
                </div>
            </div>
        )
    }
}