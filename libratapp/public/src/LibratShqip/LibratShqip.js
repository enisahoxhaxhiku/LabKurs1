import React,{Component} from "react";
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";
import {Card, Button} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'

export class LibratShqip extends Component{
    constructor(props){
        super(props)
        this.state={librat:[], libratsh:[]}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'LibratShqip')
        .then(response=>response.json())
        .then(data=>{
            this.setState({librat:data});
        });
    }

    refreshList1(){
        fetch(process.env.REACT_APP_API+'kategoriteshqip')
        .then(response=>response.json())
        .then(data=>{
            this.setState({libratsh:data});
        });
    }

    componentDidMount(){
        this.refreshList();
        this.refreshList1();
    }

    
    render(){
        const token = (localStorage.getItem("token"));
        const {librat, libratsh}=this.state;
        return(
            <div className="container shadow p-3 mb-5 bg-white rounded mt-4">
                <Helmet>
                <title>Librat Shqip</title>
                </Helmet>
                {!token && <h1 className="text-center">Nuk jeni te kyqur!<br></br> <Link to="/login"><Button variant="primary" type="submit">
                            Log in
                                </Button></Link></h1>}
                
                {token &&<Accordion className="container mt-4 w-50">
                   <Accordion.Item eventKey="0">
                     <Accordion.Header>Zgjedh Kategorine</Accordion.Header>
                     {libratsh.map(libratsh=>
                       <Accordion.Body key={libratsh.KategoriaShId}>
                        <Link className="nav-link d-inline" to={`/kategoriteshqip/${libratsh.KategoriaShId}`}>
                           {libratshsh.Kategorite_Shqip}
                        </Link>
                       </Accordion.Body>
                       )}
                     </Accordion.Item>
                   </Accordion>}
                
                {token && <div className="container d-flex mt-4 flex-wrap">
                {librat.map(lib=>
                <Link key={lib.LibratShId} className="nav-link d-inline shadow p-3 mb-5 bg-white rounded" to={`/detajetelibraveshqip/${lib.LibratShId}`}>
                  <Card style={{ width: '17rem' }}>
                    <Card.Img variant="top" style={{width: '271px', height: '335px'}} src={`${process.env.REACT_APP_PHOTOPATH}${lib.Foto_Sh}`} />
                      <Card.Body>
                        <Card.Title className="mb-4 d-flex justify-content-center text-center">{lib.Titulli}</Card.Title>
                        <Card.Text className="mb-4 d-flex justify-content-center text-center">
                         Kategoria: {lib.Kategoria}
                        </Card.Text>
                      
                    </Card.Body>
                  </Card>
                </Link>
                )}
                </div>
    }
            </div>
        )
    }
}