import React , {Component} from 'react';
import {Table, Dropdown} from 'react-bootstrap';
import { Button , ButtonToolbar} from 'react-bootstrap';
import { AddEventetShqip } from './AddEventetShqip';
import { EditEventetShqip } from './EditEventetShqip';
import {Helmet} from "react-helmet";
import {NavLink} from 'react-router-dom';


export class EventetShqip extends Component{

    constructor(props){
        super(props);
        this.state={eve:[] , addModalShow:false , editModalShow:false}
    }


    refreshList(){
        fetch(process.env.REACT_APP_API+'eventetshqip')
        .then(response=>response.json())
        .then(data=>{
            this.setState({eve:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }


    deleteEve(eveID){
        if(window.confirm('Jeni te sigurt qe doni ta fshini Eventin Shqip ?')){
            fetch(process.env.REACT_APP_API+'eventetshqip/' +eveID,{
                method:'DELETE',
                header :{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }

    render(){
        const{eve, eveemri , evekoha , evelokacioni , eveid}=this.state;
        let addModalClose =()=>this.setState({addModalShow:false});
        let editModalShow = ()=>this.setState({editModalShow:false});
        return(
            <div className="container">
                <Helmet>
                <title>Eventet Shqip</title>
                </Helmet>
                <Dropdown className="d-flex justify-content-end mt-4">
                    <Dropdown.Toggle variant="success">
                        Eventet Shqip
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <NavLink className="nav-link d-inline p-1 text-black" to="eventetehuaja">
                            Eventet Shqip
                        </NavLink>
                    </Dropdown.Menu>
                    
                </Dropdown>

                <ButtonToolbar>
                    <Button className="mt-4" variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                        Shto Eventin
                    </Button>
                    <AddEventetShqip show={this.state.addModalShow}  onHide={addModalClose}/>
                </ButtonToolbar>

                <Table className="mt-4"  striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <td>Emri</td>
                            <td>Koha</td>
                            <td>Lokacioni</td>
                            <td>Veprime</td>
                        </tr>
                    </thead>
                    <tbody>
                        {eve.map(e=>
                            <tr key={e.EventetId}>
                                <td>{e.Emri}</td>
                                <td>{e.Koha}</td>
                                <td>{e.Lokacioni}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, eveid:e.EventetId, eveemri:e.Emri,
                                        evekoha:e.Koha, evelokacioni:e.Lokacioni})}>
                                            Edit
                                            </Button>
                                            
                                        <Button className="mr-2" variant="danger" onClick={()=>this.deleteEve(e.EventetId)}> 
                                        Delete
                                        </Button>
                                        <EditEventetShqip show={this.state.editModalShow} onHide={editModalShow}
                                            eveid={eveid}
                                            eveemri={eveemri}
                                            evekoha={evekoha}
                                            evelokacioni={evelokacioni}
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