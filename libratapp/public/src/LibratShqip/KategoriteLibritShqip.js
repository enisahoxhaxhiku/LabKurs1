import React,{Component} from "react";
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import {Card} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'

export class KategoriteLibritShqip extends Component{
    constructor(props){
        super(props)
        this.state={katsh:[],libratsh :[]}
    }

    refreshList(){
        let {id} = this.props.match.params;
        fetch(process.env.REACT_APP_API+`libratshqip/kategoria/${id}`, {
          method: 'GET'
        })
          .then(response=>response.json())
          .then(data=>{
              this.setState({katsh:data});
          });
      }

    refreshList1(){
        fetch(process.env.REACT_APP_API+'kategoritelibritshqip')
        .then(response=>response.json())
        .then(data=>{
            this.setState({libratsh:data});
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
        const {katsh, libratsh}=this.state;
        return(
            <div className="container shadow p-3 mb-5 bg-white rounded mt-4">
                <Helmet>
                <title>Librat Shqip</title>
                </Helmet>
                
                <Accordion className="container mt-4 w-50">
                   <Accordion.Item eventKey="0">
                     <Accordion.Header>Zgjedh Kategorine</Accordion.Header>
                       <Accordion.Body>
                        <Link className="nav-link" to={`/`}>
                           Librat Shqip
                        </Link>
                        {libratsh.map(libratshsh=>
                        <Link key={libratshsh.KategoriaShId } className="nav-link" to={`/kategoritelibritshqip/${libratshsh.KategoriaShId }`}>
                           {libratshsh.Kategoria}
                        </Link>
                        )}
                       </Accordion.Body>
                     </Accordion.Item>
                   </Accordion>
                
                <div className="container d-flex mt-4 flex-wrap">
                {katsh.map(kat=>
                <Link key={kat.LibratShId} className="nav-link d-inline shadow p-3 mb-5 bg-white rounded" to={`/detajetelibritshqip/${kat.LibratShId}`}>
                  <Card style={{ width: '17rem' }}>
                    <Card.Img variant="top" style={{width: '271px', height: '335px'}} src={`${process.env.REACT_APP_PHOTOPATH}${kat.Foto_Sh}`} />
                      <Card.Body>
                        <Card.Title className="mb-4 d-flex justify-content-center text-center">{kat.Titulli}</Card.Title>
                        <Card.Text className=" mb-4 d-flex justify-content-center">
                         Kategoria: {kat.Kategoria}
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