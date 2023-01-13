import React,{Component} from "react";
import {Card, Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import {NavLink} from 'react-router-dom';

export class DetajetERevistaveShqip extends Component{
    


  constructor(props){
    super(props)
    this.state={rev:[]}
  } 


  refreshList(){
    let {id} = this.props.match.params;
    fetch(process.env.REACT_APP_API+`revistatshqip/${id}` ,
    {
      method : 'GET'
    })
    .then(response=>response.json())
    .then(data=>{
      this.setState({rev:data});
    });
  }
  componentDidMount(){
    this.refreshList();
  }

  componentDidUpdate(){
    this.refreshList();
  }



    render(){
      const{rev}=this.state;
        return(
            <div className="container">
                <Helmet>
                <title>Detajet e Revistave Shqip</title>
                </Helmet>
                <Dropdown  className="d-flex justify-content-end mt-4">
                  <Dropdown.Toggle variant="success">
                  Detajet e Revistave Shqip
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <NavLink className="nav-link d-inline p-1 text-black" to="/revistatshqip">
                      Revistat Shqip
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>
                  <div className="container d-flex flex-wrap">
                  {rev.map(rsh=><Card className="mt-4" key={rsh.RevistatShID}>
                <Card className="mt-4 d-flex flex-row" style={{ width: '70rem' }}>
                  <Card.Body>
                    <Card.Title className="mb-4">Emri i Revistes Shqip</Card.Title>
                      <Card.Subtitle>{rsh.Emri}</Card.Subtitle>
                  </Card.Body>

                  <Card.Body>
                    <Card.Title className="mb-4">Pershkrimi i Revistes Shqip</Card.Title>
                      <Card.Subtitle>{rsh.Pershkrimi}</Card.Subtitle>
                  </Card.Body>
                </Card>

                <Card className="mt-5" style={{ width: '70rem' }}>
                  <Card.Body>
                    <Card.Title className="mb-4">Me shume per Revisten Shqip</Card.Title>
                    <Card.Text>
                     {rsh.More}
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