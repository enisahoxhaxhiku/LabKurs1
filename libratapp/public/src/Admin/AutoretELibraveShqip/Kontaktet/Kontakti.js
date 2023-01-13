import React,{Component} from "react";
import {Card} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import ReadMoreReact from 'read-more-react';
import {Link} from 'react-router-dom';

import {Button,ButtonToolbar} from 'react-bootstrap';


export class Kontakti extends Component{

    constructor(props){
        super(props)
        this.state={cont:[]}
    }

     refreshList(){
    fetch(process.env.REACT_APP_API+'contact')
    .then(response=>response.json())
    .then(data=>{
        this.setState({cont:data});
    });
}
componentDidMount(){
    this.refreshList();
}

componentDidUpdate(){
    this.refreshList();
}




render(){
    const{cont}=this.state;
    return(

        <div>
            <Helmet>
            <title>  Kontaktet info </title>
            </Helmet>

            <div className="container d-flex flex-wrap">
                {cont.map(c=>
                <Link key={c.KontaktID} className="nav-link d-inline" to={`/detajetekontaktit/${c.KontaktID}`}>
                <Card className="mt-4" border="primary" style={{ width: '17rem', height: '10rem' }}>
                  <Card.Body>
                    <Card.Title className="text-secondary d-flex justify-content-center"><span className="text-dark">Emri: </span> {c.Emri}</Card.Title>
                    <Card.Title className="text-secondary d-flex justify-content-center"><span className="text-dark">Mbiemri: </span> {c.Mbiemri}</Card.Title>
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