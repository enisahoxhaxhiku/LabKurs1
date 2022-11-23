import React,{Component} from "react";
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";
import {Card,Dropdown} from 'react-bootstrap';


export class DetajetELibritHuaj extends Component{
    constructor(props){
        super(props)
        this.state={librat:[]}
    }


    refreshList(){
        let {id} = this.props.match.params;
        fetch(process.env.REACT_APP_API+`librathuaj/kapitulli/${id}`, {
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
            <div className="container shadow p-3 mb-5 bg-white rounded mt-4">
                <Helmet>
                <title>Detajet e Librit te Huaj</title>
                </Helmet>
               
                
                <div className="container d-flex mt-4 flex-wrap">
                {librat.map(lib=>
                <div key={lib.LibratH_Id } style={{width: '100%'}}>

                    Libri i Huaj: <strong>{lib.Titulli}</strong>

                <Card className="mt-4">
                  <Card.Body className="mb-4 d-flex justify-content-center">
                  <Card.Img variant="top" style={{width: '352px', height: '450px'}} src={`${process.env.REACT_APP_PHOTOPATHS}${lib.Foto_H}`} />
                  </Card.Body>
                      <Card.Body>
                          <Card.Body className="container d-flex mt-2 flex-wrap mx-auto">
                      <Card.Text>
                         Titulli: <strong>{lib.Titulli}</strong>
                        </Card.Text>
                        <Card.Text className="mx-auto">
                         Kategoria: <strong>{lib.Kategoria}</strong>
                        </Card.Text>
                    
                        <Card.Text>
                         Numri i kapitujve: <strong>{lib.NrKapitujve} &nbsp;</strong>
                        </Card.Text>

                      <Card.Text>
                         Data Postimit: <strong>{lib.Data_PostimitH } &nbsp;</strong>
                        </Card.Text>
                    
                        <Card.Text>
                          Autori Kryesor<Link className="nav-link d-inline" to={`/detajeteautorithuaj${lib.AutoretHId}`}><strong>{lib.Emri} {lib.Mbiemri}</strong></Link>
                        </Card.Text>

                        <Card.Text className="mx-auto">
                          Publicisti:<Link className="nav-link d-inline" to={`/detajeteproducenteveteserialit/${lib.ProducentiSID}`}><strong>{lib.Emri1} {lib.Mbiemri1}</strong></Link>
                        </Card.Text>

                        <Card.Text>
                        Revista:<Link className="nav-link d-inline" to={`/detajeterevisteshuaj/${lib.RevistatHID }`}><strong>{lib.Emri2} {lib.Pershkrimi}</strong></Link>
                        </Card.Text>

                        <Card.Text className="mx-auto">
                        Eventi: <Link className="nav-link d-inline" to={`/detajeteeventithuaj/${lib.EventetHId}`}><strong>{lib.Emri3} {lib.Lokacioni }</strong></Link>
                        </Card.Text>

                      </Card.Body>
                    </Card.Body>
                  </Card>
                
                
                <Card className="mt-4">
                  <Card.Body>
                    <Card.Text className="mx-auto">
                         Pershkrimi i Librit te Huaj: <strong>{lib.Pershkrimi_Librit_Huaj}</strong>
                        </Card.Text>
                      </Card.Body>
                  </Card>

                </div>
                 
                )}
                </div>
            </div>
        )
    }



}