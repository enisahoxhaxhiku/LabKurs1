import React,{Component} from "react";
import {Table,Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";

import {Button,ButtonToolbar} from 'react-bootstrap';
import { AddFaqja } from "./AddFaqja";
import { AddFaqja } from "./EditFaqja";


export class Faqja extends Component{

      constructor(props){
          super(props)
          this.state={faqe:[],addModalShow:false, editModalShow:false}
      }

   refreshList(){
        fetch(process.env.REACT_APP_API+'faqja')
        .then(response=>response.json())
        .then(data=>{
            this.setState({faqe:data});
        });
    }
    
    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteFq(fqid){
        if(window.confirm('Jeni te sigurt qe doni te fshini Faqen e Librit te Huaj?')){
            fetch(process.env.REACT_APP_API+'faqja/'+fqid,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }



    render(){
        const{faqe,fqid,fqtitulli,fqnr,fqpershkrimi,fqlinku}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
        <div className="container">
             <Helmet>
                <title>Faqja</title>
            </Helmet>
            <Dropdown className="d-flex justify-content-end mt-4">
                    <Dropdown.Toggle variant="success">
                        Faqet
                    </Dropdown.Toggle>
                    <Dropdown.Menu>

                      
                        <Dropdown.Item href="librathuaj">Librat e Huaj</Dropdown.Item>
                        <Dropdown.Item href="kapitulli">Kapitulli</Dropdown.Item>
                        <Dropdown.Item href="kapitullifaqja">Lidhjet Kapitull Faqe</Dropdown.Item>
                        <Dropdown.Item href="librathuajkapitulli">Lidhjet Librat e Huaj Kapitulli</Dropdown.Item>
                    </Dropdown.Menu>
         
                </Dropdown>
  <ButtonToolbar>
        <Button className="mt-4" variant="success" onClick={()=>this.setState({addModalShow:true})}>
            Shto Faqen
        <AddFaqja show={this.state.addModalShow} 
        onHide={addModalClose}/>
        </Button>
        </ButtonToolbar>
        <Table className="mt-4"  striped bordered hover size="sm">
            <thead>
            <tr>
                        <th>ID</th>
                        <th>Titulli Kapitullit</th>
                        <th>Numri Faqes</th>
                        <th>Pershkrimi</th>
                        <th>Linku</th>
                        <th>Veprime</th>
                        </tr>
            </thead>
            <tbody>
                {faqe.map(f=>
                    <tr key={f.FaqjaID}>
                        <td>{f.FaqjaID}</td>
                        <td>{f.TitulliKapitullit}</td>
                        <td>{f.NrFaqes}</td>
                        <td>{f.PershkrimiF}</td>
                        <td>{f.Linku}</td>
                        <td>
                        <ButtonToolbar>
                                   <Button className="mr-2" variant="info"  onClick={()=>this.setState({editModalShow:true,fqid:f.FaqjaID,fqtitulli:f.Titulli,fqnr:f.NrFaqes,fqpershkrimi:f.PershkrimiF,
                                        fqlinku:f.Linku})}>
                                       Edit
                                   </Button>

                                   <Button className="mr-2" variant="danger" onClick={()=>this.deleteFq(f.FaqjaID)}>
                                       Delete
                                   </Button>
                                   <EditFaqja show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        fqid={fqid}
                                        fqtitulli={fqtitulli}
                                        fqnr={fqnr}
                                        fqpershkrimi={fqpershkrimi}
                                        fqlinku={fqlinku} />
                        </ButtonToolbar>
                         </td>
                    </tr>)}
            </tbody>
        </Table>
        </div>
        )
    }

}