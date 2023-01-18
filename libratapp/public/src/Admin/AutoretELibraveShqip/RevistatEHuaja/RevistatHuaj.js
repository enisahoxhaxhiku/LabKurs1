import React , {Component} from 'react';
import {Table, Dropdown} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import ReadMoreReact from 'read-more-react';

import { Button , ButtonToolbar} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import { AddRevistatHuaj } from './AddRevistatHuaj';
import { EditRevistatHuaj } from './EditRevistatHuaj';


export class RevistatHuaj extends Component{
    constructor(props){
        super(props);
        this.state={rev:[] , addModalShow:false , editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'revistatehuaja')
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
        if(window.confirm('Jeni te sigurt qe doni ta fshini Revisten e Huaj ?')){
            fetch(process.env.REACT_APP_API+'revistatehuaja/'+revID,{
                method:'DELETE',
                header :{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }

    render(){
        const{rev, revemri, revpershkrimi, revmore, revid}=this.state;
        let addModalClose =()=>this.setState({addModalShow:false});
        let editModalShow = ()=>this.setState({editModalShow:false});
        return(
            <div className="container">
                <Helmet>
                <title>Revistat e Huaja</title>
                </Helmet>
                <Dropdown className="d-flex justify-content-end mt-4">
                    <Dropdown.Toggle variant="success">
                        Revistat e Huaja
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <NavLink className="nav-link d-inline p-1 text-black" to="revistatshqip">
                            Revistat Shqip
                        </NavLink>
                    </Dropdown.Menu>
                </Dropdown>

                <ButtonToolbar>
                    <Button className="mt-4" variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                        Shto Revisten
                    </Button>
                    <AddRevistatHuaj show={this.state.addModalShow}  onHide={addModalClose}/>
                </ButtonToolbar>

                <Table className="mt-4"  striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <td>Emri</td>
                            <td>Pershkrimi</td>
                            <td>Me shume</td>
                            <td>Veprime</td>
                        </tr>
                    </thead>
                    <tbody>
                        {rev.map(r=>
                            <tr key={r.RevistatShID}>
                                <td>{r.Emri}</td>
                                <td>{r.Pershkrimi}</td>
                                <td style={{ cursor: 'pointer' }}><ReadMoreReact text={r.More}
                                    min={50}
                                    readMoreText="Read more"/></td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, revid:r.RevistatShID, revemri:r.Emri,
                                        revpershkrimi:r.Pershkrimi, revmore:r.More})}>
                                            Edit
                                            </Button>
                                            
                                        <Button className="mr-2" variant="danger" onClick={()=>this.deleteRev(r.RevistatShID)}> 
                                        Delete
                                        </Button>
                                        <EditRevistatHuaj show={this.state.editModalShow} onHide={editModalShow}
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