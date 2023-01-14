import React,{Component} from "react";
import {Table, Image} from 'react-bootstrap';
import {Helmet} from "react-helmet";

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddLibratShqip} from './AddLibratShqip';
import {EditLibratShqip} from './EditLibratShqip';

export class LibratShqip extends Component{
    constructor(props){
        super(props)
        this.state={liber:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'librat')
        .then(response=>response.json())
        .then(data=>{
            this.setState({liber:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteFil(libid){
        if(window.confirm('Jeni i sigurt qe doni ta fshini Librin?')){
            fetch(process.env.REACT_APP_API+'librat/'+libid,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }
    
    render(){
        const {liber, libid, tit, foto, persh, link}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div className="container">
                <Helmet>
                <title>Librat</title>
                </Helmet>

                <ButtonToolbar>
                    <Button className="mt-4" variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                       Shto Librin
                    </Button>

                    <AddFilmat show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Titulli</th>
                        <th>Foto</th>
                        <th>Kategoria</th>
                        <th>Veprime</th>
                        </tr>
                    </thead>
                    <tbody>
                        {liber.map(lib=>
                            <tr key={lib.LibratShId}>
                                <td>{lib.Titulli}</td>
                                <td><Image width="70px" height="70px" src={`${process.env.REACT_APP_PHOTOPATH}${lib.Foto_Sh}`}/></td>
                                <td>{lib.Kategoria}</td>
                                <td>
                                <ButtonToolbar>
                                   <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, libid:lib.LibratShId, tit:lib.Titulli, Foto_Sh:lib.Foto_Sh, persh:lib.Pershkrimi_Librit_Shqip, isbn:lib.ISBN_Librit_Shqip})}>
                                       Edit
                                   </Button>

                                   <Button className="mr-2" variant="danger" onClick={()=>this.deleteLib(lib.LibratShId)}>
                                       Delete
                                   </Button>

                                   <EditFilmat show={this.state.editModalShow}
                                      onHide={editModalClose}
                                      libid={libid}
                                      tit={tit}
                                      foto={foto}
                                      persh={persh}
                                      isbn={isbn}
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