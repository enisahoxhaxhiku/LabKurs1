import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Table, Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";

import { Button , ButtonToolbar} from 'react-bootstrap';
import { AddPublicistetHuaj } from './AddPublicistetHuaj';
import { EditPublicistetHuaj } from './EditPublicistetHuaj';

export class PublicistetHuaj extends Component{

    constructor(props){
        super(props);
        this.state={pubs:[] , addModalShow:false , editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'publicistetelibravehuaj')
        .then(response=>response.json())
        .then(data=>{
            this.setState({pubs:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deletePub(pubID){
        if(window.confirm('Jeni i sigurt qe doni ta fshini Publicistin e librit te hauj?')){
            fetch(process.env.REACT_APP_API+'publicistetelibravehuaj/'+pubID,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }

    render(){
        const{pubs,pubEmri,pubMbiemri,pubBiografia,pubID}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div className="container">
                <Helmet>
                <title>Publicistet E Librave Huaj</title>
                </Helmet>
                <Dropdown className="d-flex justify-content-end mt-4">
                  <Dropdown.Toggle variant="success">
                  Publicistet E Librave Huaj
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <NavLink className="nav-link d-inline p-1 text-black" to="publicistetelibraveshqip">
                    Publicistet E Librave Huaj
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>
                
                <ButtonToolbar>
                <Button className="mt-4" variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                       Shto Publicistin
                    </Button>

                    <AddPublicistetShqip show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>

               <Table className="mt-4" striped bordered hover size="sm">

                    <thead>
                        <tr>
                        <td>Emri</td>
                        <td>Mbiemri</td>
                        <td>Biografia</td>
                        <td>Veprime</td>
                        </tr>
                    </thead>
                    <tbody>
                        {pubs.map(p=>
                            
                            <tr key={p.PublicistetID}>
                                <td>{p.Emri}</td>
                                <td>{p.Mbiemri}</td>
                                <td>{p.Biografia}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" 
                                        onClick={()=>this.setState({editModalShow:true,pubID:p.PublicistetID,pubEmri:p.Emri,
                                        pubMbiemri:p.Mbiemri , pubBiografia:p.Biografia})}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger" 
                                        onClick={()=>this.deletePub(p.PublicistetID)}>
                                            Delete
                                        </Button>

                                        <EditPublicistetShqip show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        pubID={pubID}
                                        pubEmri={pubEmri}
                                        pubMbiemri={pubMbiemri}
                                        pubBiografia={pubBiografia} />
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
               </Table>

               
            </div>
        )
    }

}