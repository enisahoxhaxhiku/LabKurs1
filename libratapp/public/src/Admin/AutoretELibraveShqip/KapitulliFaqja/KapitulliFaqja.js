import React,{Component} from "react";
import {Table,Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";

import {Button,ButtonToolbar} from 'react-bootstrap';
import{AddKapitulliFaqja} from './AddKapitulliFaqja';


export class KapitulliFaqja extends Component{


    constructor(props){
        super(props)
        this.state={kapfq:[],addModalShow:false}
        
    }
    refreshList3(){
        fetch(process.env.REACT_APP_API+'kapitullifaqja')
        .then(response=>response.json())
        .then(data=>{
            this.setState({kapfq:data});
        });
    }
    componentDidMount(){
        this.refreshList3();
    }

    componentDidUpdate(){
    this.refreshList3();
    }


    deleteKapitulliFaqja(kfid){
        if(window.confirm('Jeni te sigurt qe doni te fshini lidhjen Kapitull-Faqe?')){
            fetch(process.env.REACT_APP_API+'kapitullifaqja/'+kfid,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }



render(){
    const{kapfq,kfid}=this.state;
    let addModalClose=()=>this.setState({addModalShow:false});
   


    return(
        <div className="container">
        <Helmet>
                <title>Lidhjet Kapitull Faqe</title>
        </Helmet>
        <Dropdown className="d-flex justify-content-end mt-4">
                    <Dropdown.Toggle variant="success">
                        Lidhjet Kapitull Faqe
                    </Dropdown.Toggle>
                    <Dropdown.Menu>

                      
                        <Dropdown.Item href="librathuaj">Librat e Huaj</Dropdown.Item>
                        <Dropdown.Item href="kapitulli">Kapitujt</Dropdown.Item>
                        <Dropdown.Item href="faqja">Faqet</Dropdown.Item>
                        <Dropdown.Item href="librathuajkapitulli">Lidhjet Librat e Huaj Kapitull</Dropdown.Item>
                        
                    </Dropdown.Menu>
         
                </Dropdown>
        <ButtonToolbar>
        <Button className="mt-4" variant="success" onClick={()=>this.setState({addModalShow:true})}>
            Shto Lidhjen
        <AddKapitulliFaqja show={this.state.addModalShow} 
        onHide={addModalClose}/>
        </Button>
        </ButtonToolbar>



        <Table className="mt-4"  striped bordered hover size="sm">
            <thead>
            <tr>
                        <th>Kapitulli ID</th>
                        <th>Faqja ID</th>
                        <th>Numri i faqes</th>
                        <th>Veprime</th>
                        </tr>
            </thead>
            <tbody>
                {kapfq.map(kf=>
                    <tr key={kf.FaqjaID}>
                        <td>{kf.KapitulliID}</td>
                        <td>{kf.FaqjaID}</td>
                        <td>{kf.NrFaqes}</td>
                        <td>
                        <ButtonToolbar>
                                 
                                   <Button className="mr-2" variant="danger" onClick={()=>this.deleteKapitulliFaqja(kf.FaqjaID)}>
                                       Delete
                                   </Button>
                                  
                        </ButtonToolbar>
                         </td>
                    </tr>)}
            </tbody>
        </Table>




            
         </div>
    )
}



}