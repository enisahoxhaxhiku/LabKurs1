import React,{Component} from "react";
import {Card, Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import {NavLink} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { Button ,ButtonToolbar} from 'react-bootstrap';

export class DetajetEFaqeve extends Component{
    
  constructor(props){
    super(props)
    this.state={librat:[]}
}

refreshList(){
  let {sezid} = this.props.match.params;
  fetch(process.env.REACT_APP_API+`librathuaj/${sezid}/faqet`, {
    method: 'GET'
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
                <Helmet>
                <title>Detajet e Faqeve te Librave te Huaja</title>
                </Helmet>
               
                <div className="container d-flex flex-wrap">
                {librat.map(lib=>
                 <Link key={lib.LibratH_Id } className="nav-link d-inline" to={`/detajetefaqeve/${lib.FaqjaID}`}>
               <Card style={{ width: '17rem' }}>
                    <Card.Img variant="top" style={{width: '271px', height: '335px'}} src={`${process.env.REACT_APP_PHOTOPATHS}${lib.Foto_H}`} />
                      <Card.Body>
                        <Card.Title className="mb-4 d-flex justify-content-center"><strong>Faqja : {lib.NrFaqes}</strong></Card.Title>
                        <Card.Text className="mb-4 d-flex justify-content-center">
                         <strong><i>"{lib.Titulli}"</i></strong>
                        </Card.Text>
                        <ButtonToolbar className="mb-4 d-flex justify-content-center">
                      <Button variant="primary">Luaj</Button>
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