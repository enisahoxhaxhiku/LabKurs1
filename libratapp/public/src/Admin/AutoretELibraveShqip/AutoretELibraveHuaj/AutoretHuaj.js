import React,{Component} from "react";
import {NavLink} from 'react-router-dom';
import {Table, Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import ReadMoreReact from 'read-more-react';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddAutoretHuaj} from './AddAutoretHuaj';
import {EditAutoretHuaj} from './EditAutoretHuaj';

export class AutoretHuaj extends Component{
    constructor(props){
        super(props)
        this.state={auto:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'autorethuaj')
        .then(response=>response.json())
        .then(data=>{
            this.setState({auto:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }
    
    deleteAut(autid){
        if(window.confirm('Jeni i sigurt qe doni ta fshini Autorin e Huaj?')){
            fetch(process.env.REACT_APP_API+'autorihuaj/'+autid,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }
    
    render(){
        const {auto, emri, mbi, bio, autid}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div className="container">
                <Helmet>
                <title>Autoret E Huaj</title>
                </Helmet>
                <Dropdown className="d-flex justify-content-end mt-4">
                  <Dropdown.Toggle variant="success">
                  Autoret E Huaj
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <NavLink className="nav-link d-inline p-1 text-black" to="autorethuaj">
                    Autoret E Huaj
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>

                <ButtonToolbar>
                    <Button className="mt-4" variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                       Shto Autorin
                    </Button>

                    <AddAutoretHuaj show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Emri</th>
                        <th>Mbiemri</th>
                        <th>Biografia</th>
                        <th>Veprime</th>
                        </tr>
                    </thead>
                    <tbody>
                        {auto.map(aut=>
                            <tr key={aut.AutoretHId}>
                                <td>{aut.Emri}</td>
                                <td>{aut.Mbiemri}</td>
                                <td style={{ cursor: 'pointer' }}><ReadMoreReact text={aut.Biografia}
                                    min={50}
                                    readMoreText="Read more"/></td>
                                <td>
                               <ButtonToolbar>
                                   <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, autid:aut.AutoretHId,
                                emri:aut.Emri,mbi:aut.Mbiemri,bio:aut.Biografia})}>
                                       Edit
                                   </Button>

                                   <Button className="mr-2" variant="danger" onClick={()=>this.deleteAkt(aut.AutoretHId)}>
                                       Delete
                                   </Button>

                                   <EditAutoretHuaj show={this.state.editModalShow} onHide={editModalClose}
                                   autid={autid}
                                   emri={emri}
                                   mbi={mbi}
                                   bio={bio}/>
                               </ButtonToolbar>

                                </td>
                            </tr>)}
                    </tbody>

                </Table>
            </div>
        )
    }
}