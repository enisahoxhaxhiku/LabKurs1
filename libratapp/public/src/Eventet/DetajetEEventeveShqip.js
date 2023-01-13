import React,{Component} from "react";
import {Card, Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import {NavLink} from 'react-router-dom';

export class DetajetEEventeveShqip extends Component{
  constructor(props){
    super(props)
    this.state={eve:[]}
  } 


  refreshList(){
    let {id} = this.props.match.params;
    fetch(process.env.REACT_APP_API+`eventetshqip/${id}` ,
    {
      method : 'GET'
    })
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
            <div className="container">
                <Helmet>
                <title>Detajet e Eventeve Shqip</title>
                </Helmet>
                <Dropdown  className="d-flex justify-content-end mt-4">
                  <Dropdown.Toggle variant="success">
                    Detajet e Eventeve Shqip
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <NavLink className="nav-link d-inline p-1 text-black" to="/eventetshqip">
                      Eventet Shqip
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>
                  <div className="container d-flex flex-wrap">
                  {eve.map(esh=><Card className="mt-4" key={esh.EventetId}>
                <Card className="mt-4 d-flex flex-row" style={{ width: '70rem' }}>
                  <Card.Body>
                    <Card.Title className="mb-4">Emri i Eventit Shqip</Card.Title>
                      <Card.Subtitle>{esh.Emri}</Card.Subtitle>
                  </Card.Body>

                  <Card.Body>
                    <Card.Title className="mb-4">Koha e Eventit Shqip</Card.Title>
                      <Card.Subtitle>{esh.Koha}</Card.Subtitle>
                  </Card.Body>
                </Card>

                <Card className="mt-5" style={{ width: '70rem' }}>
                  <Card.Body>
                    <Card.Title className="mb-4">Lokacioni i Eventit Shqip</Card.Title>
                    <Card.Text>
                     {esh.Lokacioni}
                    </Card.Text>
                  </Card.Body>
                </Card>
                </Card>
                )}
                </div>
            </div>
        )
    }
}