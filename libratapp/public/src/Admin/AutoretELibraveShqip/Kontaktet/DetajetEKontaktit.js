import React,{Component} from "react";
import {Card, Button} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import {NavLink} from 'react-router-dom';


export class DetajetEKontaktit extends Component{

    constructor(props){
        super(props)
        this.state={cont:[]}
    }

    refreshList(){
        let {id} = this.props.match.params;
        fetch(process.env.REACT_APP_API+`contact/${id}`, {
          method: 'GET'
        })
          .then(response=>response.json())
          .then(data=>{
              this.setState({cont:data});
          });
      }
      componentDidMount(){
          this.refreshList();
      }
      
      componentDidUpdate(){
          this.refreshList();
      }

      
      deleteM(cid){
        if(window.confirm('Jeni i sigurt qe doni ta fshini mesazhin ?')){
            fetch(process.env.REACT_APP_API+'contact/'+cid,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
        {window.location.href="/kontakti"}
    }

    render(){
        const {cont}=this.state;
        return(
            <div>
            <Helmet>
            <title>Detajet e Kontaktit</title>
            </Helmet>
             
             <div className="container d-flex flex-wrap text-center col d-flex justify-content-center">
             {cont.map(c=><Card className="mt-4" key={c.KontaktID}>
               <Card className="mt-4 d-flex flex-row  " style={{ width: '70rem' }}>
               <Card.Body>
                 <Card.Title className="mb-4">Emri i Kontaktuesit</Card.Title>
                   <Card.Subtitle>{c.Emri}</Card.Subtitle>
               </Card.Body>

               <Card.Body>
                 <Card.Title className="mb-4">Mbiemri i Kontaktuesit</Card.Title>
                   <Card.Subtitle>{c.Mbiemri}</Card.Subtitle>
               </Card.Body>
               <Card.Body>
                 <Card.Title className="mb-4">Nr. Tel i Kontaktuesit</Card.Title>
                   <Card.Subtitle>{c.NrTel}</Card.Subtitle>
               </Card.Body>
             </Card>

             <Card className="mt-5" style={{ width: '70rem' }}>
               <Card.Body>
                 <Card.Title className="mb-4">Mesazhi</Card.Title>
                 <Card.Text>
                 {c.Mesazhi}
                 </Card.Text>
               </Card.Body>
               <Button className="mr-2" variant="danger" onClick={()=>this.deleteM(c.KontaktID)}>
                Delete
                </Button>
             </Card>
             </Card>
            
             )}
      
             </div>
             </div>
        )
    }



}