import React,{Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import {Dropdown, Button, ButtonToolbar} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import {Card} from 'react-bootstrap';

export class Autoretshqip extends Component{
    constructor(props){
        super(props)
        this.state={aut:[]}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'autoretshqip')
        .then(response=>response.json())
        .then(data=>{
            this.setState({aut:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }
    
    render(){
        const {aut}=this.state;
        return(
            <div className="container shadow p-3 mb-5 bg-white rounded mt-4">
                <Helmet>
                <title>Aktoret Shqipetare</title>
                </Helmet>
                <Dropdown className="d-flex justify-content-end mt-4">
                  <Dropdown.Toggle variant="success">
                  Aktoret Shqipetare
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <NavLink className="nav-link d-inline p-1 text-black" to="autorethuaj">
                      Autoret e Huaj
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>
                <div className="container d-flex flex-wrap">
                {aut.map(ash=>
                <Link key={ash.AutoretShId} className="nav-link d-inline" to={`/detajeteautoritshqip/${ash.AutoretShId}`}>
                <Card className="mt-4" border="primary" style={{ width: '17rem', height: '10rem' }}>
                  <Card.Body>
                    <Card.Title className="text-secondary d-flex justify-content-center"><span className="text-dark">Emri: </span> {ash.Emri}</Card.Title>
                    <Card.Title className="text-secondary d-flex justify-content-center"><span className="text-dark">Mbiemri: </span> {ash.Mbiemri}</Card.Title>
                    <ButtonToolbar className="d-flex justify-content-center">
                    <Button variant="success">
                       Me Shume
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