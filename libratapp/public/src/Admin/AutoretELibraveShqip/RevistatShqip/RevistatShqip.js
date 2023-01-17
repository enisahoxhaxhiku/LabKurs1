
import React , {Component} from 'react';

import {Table, Dropdown} from 'react-bootstrap';

import { Button , ButtonToolbar} from 'react-bootstrap';

import { AddRevistatShqip} from './AddRevistatShqip';

import { EditRevistatShqip } from './EditRevistatShqip';
import {Helmet} from "react-helmet";
import {NavLink} from 'react-router-dom';


export class RevistatShqip extends Component{

    constructor(props){
        super(props);
        this.state={rev:[] , addModalShow:false , editModalShow:false}
    }


    refreshList(){
        fetch(process.env.REACT_APP_API+'revistatshqip')
        .then(response=>response.json())
        .then(data=>{
            this.setState({rev:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }


    deleteRev(revID){
        if(window.confirm('Jeni te sigurt qe doni ta fshini Revistat Shqip?')){
            fetch(process.env.REACT_APP_API+'revistatshqip/' +revID,{
                method:'DELETE',
                header :{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }

    render(){
        const{rev, revemri , revpershkrimi , revmore , revid}=this.state;
        let addModalClose =()=>this.setState({addModalShow:false});
        let editModalShow = ()=>this.setState({editModalShow:false});
        return(
            <div className="container">
                <Helmet>
                <title>Revistat Shqip</title>
                </Helmet>
                <Dropdown className="d-flex justify-content-end mt-4">
                    <Dropdown.Toggle variant="success">
                        Revistat Shqip
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <NavLink className="nav-link d-inline p-1 text-black" to="revistatehuaja">
                            Revistat e Huaja
                        </NavLink>
                    </Dropdown.Menu>
                    
                </Dropdown>

                <ButtonToolbar>
                    <Button className="mt-4" variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                        Shto Revisten
                    </Button>
                    <AddRevistatShqip show={this.state.addModalShow}  onHide={addModalClose}/>
                </ButtonToolbar>

                <Table className="mt-4"  striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <td>Emri</td>
                            <td>Pershkrimi</td>
                            <td>More</td>
                            <td>Veprime</td>
                        </tr>
                    </thead>
                    <tbody>
                        {rev.map(r=>
                            <tr key={r.RevistatShID}>
                                <td>{r.Emri}</td>
                                <td>{r.Pershkrimi}</td>
                                <td>{r.More}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, revid:r.RevistatShID, revemri:r.Emri,
                                        revpershkrimi:r.Pershkrimi, revmore:r.More})}>
                                            Edit
                                            </Button>
                                            
                                        <Button className="mr-2" variant="danger" onClick={()=>this.deleteRev(r.RevistatShID)}> 
                                        Delete
                                        </Button>
                                        <EditRevistatShqip show={this.state.editModalShow} onHide={editModalShow}
                                            revid={revid}
                                            revemri={revemri}
                                            revpershkrimi={revpershkrimi}
                                            revmore={revmore}
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