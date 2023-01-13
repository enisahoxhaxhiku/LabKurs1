import {Dropdown, Button, ButtonToolbar} from 'react-bootstrap';
import { Component } from "react"
import {Link, NavLink } from 'react-router-dom';
import Helmet from "react-helmet";
import {Card} from 'react-bootstrap';




export class PublicistetHuaj extends Component{

     constructor(props){
         super(props)
         this.state={prods:[]}
     }



    refreshList(){
        fetch(process.env.REACT_APP_API+'publicistethuaj')
        .then(response=>response.json())
        .then(data=>{
            this.setState({prods:data});
        });

    }
   
    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    render(){
       const{prods}=this.state;
       return(
           <div className="container shadow p-3 mb-5 bg-white rounded mt-4">
            <Helmet>
            <title>Publicistet e Huaj</title>
            </Helmet>   
            <Dropdown className="d-flex justify-content-end mt-4">
                <Dropdown.Toggle variant="success">
                    Publicistet e Huaj
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <NavLink className="nav-link d-inline p-1 text-black" to="publicistetshqip">
                        Publicistet e Huaj
                    </NavLink>
                </Dropdown.Menu>
            </Dropdown>
            <div className="container d-flex flex-wrap">
            {prods.map(p=>
                    <Link key={p.PublicistetHID}className="nav-link d-inline" to={`/detajetepublicistevetelibravehuaj/${p.PublicistetHID}`}>
                        
                        <Card className="mt-4" border="primary" style={{ width: '17rem', height: '10rem' }}>
                    <Card.Body>
                        <Card.Title className="text-secondary d-flex justify-content-center"><span className="text-dark">Emri : </span> {p.Emri}</Card.Title>
                        <Card.Title className="text-secondary d-flex justify-content-center"><span className="text-dark">Mbiemri : </span> {p.Mbiemri}</Card.Title>
                        <ButtonToolbar className="d-flex justify-content-center">
                    <Button variant="success">
                        Me Shume
                    </Button>
                    </ButtonToolbar>
                    </Card.Body>
                    </Card>  
                        
                    </Link>)}
            </div>
           </div>
       )
    }

}