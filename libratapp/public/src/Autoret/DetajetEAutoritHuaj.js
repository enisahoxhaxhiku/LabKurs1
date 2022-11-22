import React,{Component} from "react";
import {Card, Dropdown} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {Helmet} from "react-helmet";


export class DetajetEAutoritHuaj extends Component{
  constructor(props){
    super(props)
    this.state={aut:[]}
}

refreshList(){
  let {id} = this.props.match.params;
  fetch(process.env.REACT_APP_API+`autorethuaj/${id}`, {
    method: 'GET'
  })
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
          <div className="container">
              <Helmet>
              <title>Detajet e Autorit te Huaj</title>
              </Helmet>
              <Dropdown className="d-flex justify-content-end mt-4">
                  <Dropdown.Toggle variant="success">
                    Detajet e Autorit te Huaj
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <NavLink className="nav-link d-inline p-1 text-black" to="/autorethuaj">
                      Autoret e Huaj
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>
              <div className="container d-flex flex-wrap">
              {aut.map(ah=><Card className="mt-4" key={ah.AutoretHId }>
                <Card className="mt-4 d-flex flex-row" style={{ width: '70rem' }}>
                <Card.Body>
                  <Card.Title className="mb-4">Emri I Autorit te Huaj</Card.Title>
                    <Card.Subtitle>{ah.Emri}</Card.Subtitle>
                </Card.Body>

                <Card.Body>
                  <Card.Title className="mb-4">Mbiemri I Autorit te Huaj</Card.Title>
                    <Card.Subtitle>{ah.Mbiemri}</Card.Subtitle>
                </Card.Body>
              </Card>

              <Card className="mt-5" style={{ width: '70rem' }}>
                <Card.Body>
                  <Card.Title className="mb-4">Biografia E Autorit te Huaj</Card.Title>
                  <Card.Text>
                  {ah.Biografia}
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