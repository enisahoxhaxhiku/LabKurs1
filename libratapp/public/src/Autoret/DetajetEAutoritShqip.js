import React,{Component} from "react";
import {Card, Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import {NavLink} from 'react-router-dom';


export class DetajetEAutoritShqip extends Component{
    
  constructor(props){
    super(props)
    this.state={aut:[]}
}

refreshList(){
  let {id} = this.props.match.params;
  fetch(process.env.REACT_APP_API+`autoretshqip/${id}`, {
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
                <title>Detajet e Autoreve Shqipetare</title>
                </Helmet>
                <Dropdown className="d-flex justify-content-end mt-4">
                  <Dropdown.Toggle variant="success">
                   Detajet e Autoreve Shqipetare
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <NavLink className="nav-link d-inline p-1 text-black" to="/autoretshqip">
                      Autoret Shqipetare
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>
                <div className="container d-flex flex-wrap">
                {aut.map(ash=><Card className="mt-4" key={ash.AutoretShId}>
                  <Card className="mt-4 d-flex flex-row" style={{ width: '70rem' }}>
                  <Card.Body>
                    <Card.Title className="mb-4">Emri I Autorit Shqipetare</Card.Title>
                      <Card.Subtitle>{aut.Emri}</Card.Subtitle>
                  </Card.Body>

                  <Card.Body>
                    <Card.Title className="mb-4">Mbiemri I Autorit Shqipetare</Card.Title>
                      <Card.Subtitle>{ash.Mbiemri}</Card.Subtitle>
                  </Card.Body>
                </Card>

                <Card className="mt-5" style={{ width: '70rem' }}>
                  <Card.Body>
                    <Card.Title className="mb-4">Biografia i Autorit Shqipetare</Card.Title>
                    <Card.Text>
                    {ash.Biografia}
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