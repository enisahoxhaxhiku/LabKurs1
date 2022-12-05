import React,{Component} from "react";
import {NavLink} from 'react-router-dom';
import {Table, Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import ReadMoreReact from 'read-more-react';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddAutoretShqip} from './AddAutoretShqip';
import {EditAutoretShqip} from './EditAutoretShqip';

export class AutoretShqip extends Component{
    constructor(props){
        super(props)
        this.state={auto:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'autoretshqip')
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
        if(window.confirm('Jeni i sigurt qe doni ta fshini Autorin shqipetare?')){
            fetch(process.env.REACT_APP_API+'autoretshqip/'+autid,{
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
                <title>Autoret Shqipetare</title>
                </Helmet>
                <Dropdown className="d-flex justify-content-end mt-4">
                  <Dropdown.Toggle variant="success">
                  Autoret Shqipetare
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

                    <AddAutoretShqip show={this.state.addModalShow}
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
                            <tr key={aut.AutoretShId}>
                                <td>{aut.Emri}</td>
                                <td>{aut.Mbiemri}</td>
                                <td style={{ cursor: 'pointer' }}><ReadMoreReact text={aut.Biografia}
                                    min={50}
                                    readMoreText="Read more"/></td>
                                <td>
                               <ButtonToolbar>
                                   <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, autid:aut.AutoretShId,
                                emri:aut.Emri,mbi:aut.Mbiemri,bio:aut.Biografia})}>
                                       Edit
                                   </Button>

                                   <Button className="mr-2" variant="danger" onClick={()=>this.deleteAut(aut.AutoretShId)}>
                                       Delete
                                   </Button>

                                   <EditAutoretShqip show={this.state.editModalShow} onHide={editModalClose}
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