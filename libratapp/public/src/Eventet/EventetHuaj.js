import React,{Component} from "react";
import {Helmet} from "react-helmet";
import { Dropdown ,Button , ButtonToolbar } from "react-bootstrap";
import {Link, NavLink } from "react-router-dom";
import {Card} from 'react-bootstrap';

export class EventetHuaj extends Component{

    constructor(props){
        super(props)
        this.state={eve:[]}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'eventetehuaja')
        .then(response=>response.json())
        .then(data=>{
            this.setState({eve:data});
        });
    }
        componentDidMount(){
            this.refreshList();
        }
    
        componentDidUpdate(){
            this.refreshList();
        }

        render(){
            const{eve}=this.state;
            return(
                <div className="container shadow p-3 mb-5 bg-white rounded mt-4">
                <Helmet>
                    <title>Eventet e Huaja</title>
                </Helmet>

                <Dropdown className="d-flex justify-content-end mt-4">
                <Dropdown.Toggle variant="success">
                    Eventet e Huaja
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <NavLink className="nav-link d-inline p-1 text-black" to="eventetshqip">
                    Eventet e Huaja
                    </NavLink>
                </Dropdown.Menu>
                </Dropdown>
                <div className="container d-flex flex-wrap">
                    {eve.map(eh=>
                        <Link key={eh.EventetHId} className="nav-link d-inline" to={`/detajeteeventevehuaja/${eh.EventetHId}`}>
                        <Card className="mt-4" border="primary" style={{width:'17rem',height:'10rem'}}>
                        <Card.Body>
                            <Card.Title className="text-secondary d-flex justify-content-center"><span className="text-dark">Emri : </span>{eh.Emri}</Card.Title>
                            <Card.Title className="text-secondary d-flex justify-content-center"><span className="text-dark">Koha : </span>{eh.Koha}</Card.Title>
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