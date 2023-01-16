import React,{Component} from "react";
import {Table,Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddKapitullin} from './AddKapitullin';
import { EditKapitullin } from "./EditKapitullin";
export class Kapitulli extends Component{

    constructor(props){
        super(props)
        this.state={kap:[],addModalShow:false,editModalShow:false}
    }

    refreshList2(){
        fetch(process.env.REACT_APP_API+'kapitulli')
        .then(response=>response.json())
        .then(data=>{
            this.setState({kap:data});
        });
    }

    componentDidMount(){
        this.refreshList2();
    }

    componentDidUpdate(){
   
        this.refreshList2();
    }



    deleteKp(kpid){
        if(window.confirm('Jeni te sigurt qe doni te fshini Kapitullin e ketij libri te huaj?')){
            fetch(process.env.REACT_APP_API+'kapitulli/'+kpid,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }



    render(){
        const{kap,kpid,kpnr,kpnrfq}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div className="container">
        <Helmet>
                <title>Kapitulli</title>
        </Helmet>
        <Dropdown className="d-flex justify-content-end mt-4">
                    <Dropdown.Toggle variant="success">
                        Kapitujt
                    </Dropdown.Toggle>
                    <Dropdown.Menu>

                      
                        <Dropdown.Item href="librathuaj">Librat e huaj</Dropdown.Item>
                        <Dropdown.Item href="faqja">Faqet</Dropdown.Item>
                        <Dropdown.Item href="kapitullifaqja">Lidhjet Kapitull Faqe</Dropdown.Item>
                        <Dropdown.Item href="librathuajkapitulli">Lidhjet Librat e Huaj Kapitulli</Dropdown.Item>
                    </Dropdown.Menu>
         
                </Dropdown>
        <ButtonToolbar>
        <Button className="mt-4" variant="success" onClick={()=>this.setState({addModalShow:true})}>
            Shto Kapitullin
        <AddKapitullin show={this.state.addModalShow} 
        onHide={addModalClose}/>
        </Button>
        </ButtonToolbar>



        <Table className="mt-4"  striped bordered hover size="sm">
            <thead>
            <tr>
                        <th>ID</th>
                        <th>Numri i kapitullit</th>
                        <th>Numri i faqeve</th>
                        <th>Veprime</th>
                        </tr>
            </thead>
            <tbody>
                {kap.map(k=>
                    <tr key={k.KapitulliID}>
                        <td>{k.KapitulliID}</td>
                        <td>{k.NrKapitulli}</td>
                        <td>{k.NrFaqeve}</td>
                        <td>
                        <ButtonToolbar>
                                   <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true,kpid:k.KapitulliID,kpnr:k.NrKapitulli,kpnrfq:k.NrFaqeve})}>
                                       Edit
                                   </Button>

                                   <Button className="mr-2" variant="danger" onClick={()=>this.deleteKp(k.KapitulliID)}>
                                       Delete
                                   </Button>
                                   <EditKapitullin show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        kpid={kpid}
                                        kpnr={kpnr}
                                        kpnrfq={kpnrfq} 
                                        />
                        </ButtonToolbar>
                         </td>
                    </tr>)}
            </tbody>
        </Table>




            
         </div>
      
        )

    }
}