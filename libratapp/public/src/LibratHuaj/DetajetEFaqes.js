import React,{Component} from "react";
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";
import {Card , Dropdown} from 'react-bootstrap';
import ReactPlayer from 'react-player/youtube';



export class DetajetEFaqes extends Component{

    constructor(props){
        super(props)
        this.state={librat:[]}
    }

    refreshList(){
        let {eppid} = this.props.match.params;
        fetch(process.env.REACT_APP_API+`librathuaj/${eppid}/faqja`, {
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
        const{librat}=this.state;
        return(
            <div className="container">
                
                <Helmet>
                <title>Detajet e Kapitullit te Librit te Huaj</title>
                </Helmet>
               
                <Dropdown className="d-flex justify-content-end mt-4">
                    <Dropdown.Toggle variant="success">
                        Kapitulli
                    </Dropdown.Toggle>
                    <Dropdown.Menu>

                    {librat.map(lib=>
                    <Link  className="nav-link d-inline p-1 text-black" to={`/detajetelibrithuaj/${lib.LibratH_Id}`}>
                            Detajet e Librit te Huaj
                        </Link>
                        )}
                   
                      
                        
                    </Dropdown.Menu>
         
                </Dropdown>

                <div className="container d-flex mt-4 flex-wrap">
                {librat.map(lib=>
                <div key={lib.FaqjaID} style={{width: '100%'}}>

                    

                <ReactPlayer url={lib.Linku}
                width='100%' controls/>
                Faqja "<strong>{lib.Titulli}</strong>"
                <Card className="mt-4">
                    <Card.Body>
                    <i>{lib.PershkrimiF}</i>
                    </Card.Body>
                </Card>
                
                </div>
                )}
                </div>
                
            </div>
        )


    }


}