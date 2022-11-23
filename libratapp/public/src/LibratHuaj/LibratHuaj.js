import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

export class LibratHuaj extends Component {
  constructor(props) {
    super(props);
    this.state = { librat: [], librath: [] };
  }                 

  refreshList() {
    fetch(process.env.REACT_APP_API + "LibratHuaj")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ librat: data });
      });
  }

  refreshList1(){
    fetch(process.env.REACT_APP_API+'kategoritelibrithuaj')
    .then(response=>response.json())
    .then(data=>{
        this.setState({librath:data});
    });
  }

  componentDidMount() {
    this.refreshList();
    this.refreshList1();
  }


  render() {
   
    const token = (localStorage.getItem("token"));
    const { librat, librath } = this.state;

    return (
      <div className="container shadow p-3 mb-5 bg-white rounded mt-4">
        <Helmet>
          <title>Librat e Huaj</title>
        </Helmet>
        {!token && <h1 className="text-center">Nuk jeni te kyqur!<br></br> <Link to="/login"><Button variant="primary" type="submit">
                            Log in
                                </Button></Link></h1>}

        {token && <Accordion className="container mt-4 w-50">
                   <Accordion.Item eventKey="0">
                     <Accordion.Header>Zgjedh Kategorine</Accordion.Header>
                     {librath.map(libratt=>
                       <Accordion.Body key={libratt.KategoriaSID}>
                        <Link className="nav-link d-inline" to={`/kategoritelibrithuaj/${libratt.KategoriaHID}`}>
                           {libratt.Kategoria}
                        </Link>
                       </Accordion.Body>
                       )}
                     </Accordion.Item>
                   </Accordion>}
                  
        {token && <div className="container d-flex mt-4 flex-wrap">
          {librat.map((lib) => (
            <Link
              key={lib.LibratH_Id }
              className="nav-link d-inline shadow p-3 mb-5 bg-white rounded"
              to={`/detajetekapitullit/${lib.LibratH_Id }`}
            >
              <Card style={{ width: "17rem" }}>
                <Card.Img
                  variant="top"
                  style={{ width: "271px", height: "335px" }}
                  src={`${process.env.REACT_APP_PHOTOPATHS}${ser.Foto_H }`}
                />
                <Card.Body>
                  <Card.Title className="mb-4 d-flex justify-content-center">
                    {lib.Titulli}
                  </Card.Title>
                  <Card.Text className="mb-4 d-flex justify-content-center">
                    Kategoria: {lib.Kategoria}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </div>}
      </div>
    );
  }
}
