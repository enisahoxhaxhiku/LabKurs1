import React ,{Component} from "react";
import {NavLink} from 'react-router-dom';
import {Table, Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";


import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddKategoriteELibraveHuaj} from './AddKategoriteELibraveHuaj';
import {EditKategoriteELibraveHuaj} from './EditKategoriteELibraveHuaj';

export class KategoriteELibraveHuaj extends Component{


    constructor(props){
        super(props);
        this.state={kategors:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'kategoriteelibravehuaj')
        .then(response=>response.json())
        .then(data=>{
            this.setState({kategors:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteKategorine(katID){
        if(window.confirm('Jeni i sigurt qe doni te fshini Kategorine e librave te huaj?')){
            fetch(process.env.REACT_APP_API+'kategoriteelibravehuaj/'+katID, {
                method : 'DELETE',
                header : {
                    'Accept' : 'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }


render(){
        const {kategors, kategoria, katID}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div className="container">
                 <Helmet>
                <title>Kategorite e Librave te Huaj</title>
                </Helmet>
                 <Dropdown className="d-flex justify-content-end mt-4">
                    <Dropdown.Toggle variant="success">
                    Kategorite e Librave te Huaj
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <NavLink className="nav-link d-inline p-1 text-black" to="kategoriteELibraveShqip">
                            Kategorit e Librave Shqip
                        </NavLink>
                    </Dropdown.Menu>
                </Dropdown>
             

                <ButtonToolbar>
                    <Button className="mt-4" variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                       Shto Kategorine
                    </Button>

                    <AddKategoriteELibraveHuaj show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Kategorite</th>
                        <th>Veprime</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kategors.map(kategorite=>
                            <tr key={kategorite.KategoriaHID}>
                                <td>{kategorite.Kategoria}</td>
                                <td>
                               <ButtonToolbar>
                                   <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, katID:kategorite.KategoriaHID,
                                kategoria:kategorite.Kategoria})}>
                                       Edit
                                   </Button>

                                   <Button className="mr-2" variant="danger" onClick={()=>this.deleteKategorine(kategorite.KategoriaHID)}>
                                       Delete
                                   </Button>

                                   <EditKategoriteELibraveHuaj show={this.state.editModalShow} onHide={editModalClose}
                                   katID={katID}
                                   kategoria={kategoria}/>
                               </ButtonToolbar>

                                </td>
                            </tr>)}
                    </tbody>

                </Table>
            </div>
        )
    }
}

