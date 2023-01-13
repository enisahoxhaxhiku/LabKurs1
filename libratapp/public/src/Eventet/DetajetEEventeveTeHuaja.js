import React,{Component} from "react";
import {Card, Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import {NavLink} from 'react-router-dom';

export class DetajetEEventeveTeHuaja extends Component{


    constructor(props){
        super(props)
        this.state={eve:[]}
      } 


      refreshList(){
        let {id} = this.props.match.params;
        fetch(process.env.REACT_APP_API+`eventetehuaja/${id}` ,
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
                <title>Detajet e Eventeve te Huaja</title>
                </Helmet>
                <Dropdown  className="d-flex justify-content-end mt-4">
                  <Dropdown.Toggle variant="success">
                    Detajet e Eventeve te Huaja
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <NavLink className="nav-link d-inline p-1 text-black" to="/eventetehuaja">
                    Eventet e Huaja
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>
                <div className="container d-flex flex-wrap">
                  {eve.map(eh=><Card className="mt-4" key={eh.EventetHId}>
                <Card className="mt-4 d-flex flex-row" style={{ width: '70rem' }}>
                  <Card.Body>
                    <Card.Title className="mb-4">Emri i Eventit te Huaj</Card.Title>
                      <Card.Subtitle>{eh.Emri}</Card.Subtitle>
                  </Card.Body>

                  <Card.Body>
                    <Card.Title className="mb-4">Koha e Eventit te Huaj</Card.Title>
                      <Card.Subtitle>{eh.Koha}</Card.Subtitle>
                  </Card.Body>
                </Card>

                <Card className="mt-5" style={{ width: '70rem' }}>
                  <Card.Body>
                    <Card.Title className="mb-4">Lokacioni i Eventit te Huaj</Card.Title>
                    <Card.Text>
                     {eh.Lokacioni}
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