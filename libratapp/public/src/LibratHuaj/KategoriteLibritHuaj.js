import React,{Component} from "react";
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import {Card} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'


export class KategoriteLibritHuaj extends Component{
    constructor(props){
        super(props)
        this.state={kath:[], librath:[]}
    }               

    refreshList(){
        let {id} = this.props.match.params;
        fetch(process.env.REACT_APP_API+`librathuaj/kategoria/${id}`, {
          method: 'GET'
     
        })
          .then(response=>response.json())
          .then(data=>{
              this.setState({kath:data});
          });
      }
      refreshList1(){
        fetch(process.env.REACT_APP_API+'kategoritelibrithuaj')
        .then(response=>response.json())
        .then(data=>{
            this.setState({librath:data});
        });
    }
    componentDidMount(){
        this.refreshList();
        this.refreshList1();
    }

    componentDidUpdate(){
        this.refreshList();
        this.refreshList1();
    }
    render(){
        const {kath, librath}=this.state;
        return(
            <div className="container shadow p-3 mb-5 bg-white rounded mt-4">
                <Helmet>
                <title>Librat e Huaj</title>
                </Helmet>
                
                <Accordion className="container mt-4 w-50">
                   <Accordion.Item eventKey="0">
                     <Accordion.Header>Zgjedh Kategorine</Accordion.Header>
                       <Accordion.Body>
                        <Link className="nav-link" to={`/librathuaj`}>
                           Librat e Huaj
                        </Link>
                        {librath.map(libratt=>
                        <Link key={libratt.KategoriaHID } className="nav-link" to={`/kategoritelibrithuaj/${libratt.KategoriaHID}`}>
                           {libratt.Kategoria}
                        </Link>
                        )}
                       </Accordion.Body>
                     </Accordion.Item>
                   </Accordion>
                
                <div className="container d-flex mt-4 flex-wrap">
                {kath.map(kat=>
                <Link key={kat.LibratH_Id } className="nav-link d-inline shadow p-3 mb-5 bg-white rounded" to={`/detajetekapitullit/${kat.LibratH_Id }`}>
                  <Card style={{ width: '17rem' }}>
                    <Card.Img variant="top" style={{width: '271px', height: '300px'}} src={`${process.env.REACT_APP_PHOTOPATHS}${kat.Foto_H}`} />
                      <Card.Body>
                        <Card.Title className="mb-4 d-flex justify-content-center">{kat.Titulli}</Card.Title>
                        <Card.Text className="mb-4 d-flex justify-content-center">
                         Kategoria : &nbsp;<strong>{kat.Kategoria}</strong> 
                        </Card.Text>
                    
                    </Card.Body>
                  </Card>
                </Link>
                )}
                </div>
            </div>
        )
    }
}