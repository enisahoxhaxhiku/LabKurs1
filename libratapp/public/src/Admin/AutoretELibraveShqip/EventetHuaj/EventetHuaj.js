import React , {Component} from 'react';
import {Table, Dropdown} from 'react-bootstrap';
import { Button , ButtonToolbar} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import {NavLink} from 'react-router-dom';
import {AddEventetHuaj} from './AddEventetHuaj';
import {EditEventetHuaj } from './EditEventetHuaj';

export class EventetHuaj extends Component{

   constructor(props){
    super(props)
    this.state={eve:[] , addModalShow:false , editModalShow:false}
   }

   refreshList(){
    fetch(process.env.REACT_APP_API+'eventetehuaja')
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
    if(window.confirm('Jeni te sigurt qe doni ta fshini Eventin e Huaj ?')){
        fetch(process.env.REACT_APP_API+'eventetehuaja/' +eveID,{
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
                <title>Eventet e Huaja</title>
            </Helmet>

            <Dropdown className="d-flex justify-content-end mt-4">
                    <Dropdown.Toggle variant="success">
                        Eventet e Huaja
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <NavLink className="nav-link d-inline p-1 text-black" to="eventetshqip">
                            Eventet Shqip
                        </NavLink>
                    </Dropdown.Menu>
                    
                </Dropdown>


                <ButtonToolbar>
                    <Button className="mt-4" variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                        Shto Eventin
                    </Button>
                    <AddEventetHuaj show={this.state.addModalShow}  onHide={addModalClose}/>
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
                            <tr key={e.EventetHId}>
                                <td>{e.Emri}</td>
                                <td>{e.Koha}</td>
                                <td>{e.Lokacioni}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, eveid:e.EventetHId, eveemri:e.Emri,
                                        evekoha:e.Koha, evelokacioni:e.Lokacioni})}>
                                            Edit
                                            </Button>
                                            
                                        <Button className="mr-2" variant="danger" onClick={()=>this.deleteEve(e.EventetHId)}> 
                                        Delete
                                        </Button>
                                        <EditEventetHuaj show={this.state.editModalShow} onHide={editModalShow}
                                            eid={eid}
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