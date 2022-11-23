import React,{Component} from "react";
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";
import {Card} from 'react-bootstrap';
import ReactPlayer from 'react-player/youtube';

export class DetajetELibritShqip extends Component{
    constructor(props){
        super(props)
        this.state={librat:[]}
    }

    refreshList(){
        let {id} = this.props.match.params;
        fetch(process.env.REACT_APP_API+`librat/${id}`, {
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
                <title>Detajet E Librit</title>
                </Helmet>
                <div className="container d-flex mt-4 flex-wrap">
                {librat.map(lib=>
                <div key={lib.LibratShId} style={{width: '100%'}}>

                   Libri: <strong>{lib.Titulli}</strong>

               
                <Card className="mt-4">
                      <Card.Body>
                          <Card.Body className="container d-flex mt-2 flex-wrap mx-auto">
                      <Card.Text>
                         Titulli: <strong>{lib.Titulli}</strong>
                        </Card.Text>
                        <Card.Text className="mx-auto">
                         Kategoria: <strong>{lib.Kategoria}</strong>
                        </Card.Text>
                    

                      <Card.Text  className="mx-auto">
                         Data Postimit: <strong>{lib.Data_PostimitSh}</strong>
                        </Card.Text>
                       
                        
                        <Card.Text>
                         Autori Kryesor:<Link className="nav-link d-inline" to={`/detajeteautoritshqip/${lib.AutoretShId}`}><strong>{lib.Emri} {lib.Mbiemri}</strong></Link>
                        </Card.Text>
                        <Card.Text className="mx-auto">
                         Publicisti:<Link className="nav-link d-inline" to={`/detajetepublicistitshqip/${lib.PublicistetID}`}><strong>{lib.Emri1} {lib.Mbiemri1}</strong></Link>
                        </Card.Text>
                        <Card.Text>
                         Revista:<Link className="nav-link d-inline" to={`/detajeterevistaveshqip/${lib.RevistatShID}`}><strong>{lib.Emri2} {lib.Mbiemri2}</strong></Link>
                        </Card.Text>
                        <Card.Text className="mx-auto">
                         Eventi:<Link className="nav-link d-inline" to={`/detajeteeventeveshqip/${lib.EventetId}`}><strong>{lib.Emri3} {lib.Mbiemri3}</strong></Link>
                        </Card.Text>
                      </Card.Body>
                    </Card.Body>
                  </Card>
                
                
                <Card className="mt-4">
                  <Card.Body>
                    <Card.Text className="mx-auto">
                    <strong>Pershkrimi i Librit Shqip: </strong>{lib.Pershkrimi_Librit_Shqip}
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