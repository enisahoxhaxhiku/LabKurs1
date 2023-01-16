import React,{Component} from "react";
import {Table,Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";

import {Button,ButtonToolbar} from 'react-bootstrap';
import { AddLibratEHuajKapitulli } from "./AddLibratEHuajKapitulli";


export class LibratEHuajKapitulli extends Component{

    constructor(props){
        super(props)
        this.state={libkap:[],addModalShow:false}
    }


    refreshList(){
        fetch(process.env.REACT_APP_API+'libratehuajkapitulli')
        .then(response=>response.json())
        .then(data=>{
            this.setState({libkap:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
    this.refreshList();
    }


    deleteLibratEHuajKapitulli(lkID){
        if(window.confirm('Jeni te sigurt qe doni te fshini lidhjen LibratEHuaj-Kapitull?')){
            fetch(process.env.REACT_APP_API+'libratehuajkapitulli/'+lkID,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }




    render(){

        const{libkap,lkID}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});

        return(
            <div className="container">
        <Helmet>
                <title>Lidhjet Librat e huaj Kapitull</title>
        </Helmet>
        <Dropdown className="d-flex justify-content-end mt-4">
                    <Dropdown.Toggle variant="success">
                        Lidhjet Librat e huaj Kapitull
                    </Dropdown.Toggle>
                    <Dropdown.Menu>

                      
                        <Dropdown.Item href="librathuaj">Librat e Huaj</Dropdown.Item>
                        <Dropdown.Item href="kapitulli">Kapitujt</Dropdown.Item>
                        <Dropdown.Item href="faqja">Faqet</Dropdown.Item>
                        <Dropdown.Item href="kapitullifaqja">Lidhjet Kapitull Faqe</Dropdown.Item>
                    </Dropdown.Menu>
         
                </Dropdown>
                <ButtonToolbar>
        <Button className="mt-4" variant="success" onClick={()=>this.setState({addModalShow:true})}>
            Shto Lidhjen
        <AddLibratEHuajKapitulli show={this.state.addModalShow} 
        onHide={addModalClose}/>
        </Button>
        </ButtonToolbar>
        <Table className="mt-4"  striped bordered hover size="sm">
            <thead>
            <tr>
                        <th>LibratH ID</th>
                        <th>Kapitulli ID</th>
                        <th>Numri i kapitullit</th>
                        <th>Veprime</th>
                        </tr>
            </thead>
            <tbody>
                {libkap.map(lk=>
                    <tr key={lk.KapitulliID}>
                        <td>{lk.LibratH_Id}</td>
                        <td>{lk.KapitulliID}</td>
                        <td>{lk.NrKapitulli}</td>
                        <td>
                        <ButtonToolbar>
                                 
                                   <Button className="mr-2" variant="danger" onClick={()=>this.deleteLibratEHuajKapitulli(lk.KapitulliID)}>
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