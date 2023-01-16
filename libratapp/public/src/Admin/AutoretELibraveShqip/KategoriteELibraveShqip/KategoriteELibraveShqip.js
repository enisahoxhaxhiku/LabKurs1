import React,{Component} from "react";
import {NavLink} from 'react-router-dom';
import {Table, Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddKategoriteELibraveShqip} from './AddKategoriteELibraveShqip';
import {EditKategoriteELibraveShqip} from './EditKategoriteELibraveShqip';

export class KategoriteELibraveShqip extends Component{
    constructor(props){
        super(props);
        this.state={cate:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'kategoriteelibraveshqip')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cate:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }
    
    deleteAut(autid){
        if(window.confirm('Jeni i sigurt qe doni ta fshini Kategorine e Librit shqip?')){
            fetch(process.env.REACT_APP_API+'kategoriteelibraveshqip/'+autid,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }
    
    render(){
        const {cate, categ, catid}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div className="container">
                <Helmet>
                <title>Kategorite e Librit Shqip</title>
                </Helmet>
                <Dropdown className="d-flex justify-content-end mt-4">
                  <Dropdown.Toggle variant="success">
                    Kategorite e Librit Shqip
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <NavLink className="nav-link d-inline p-1 text-black" to="kategoriteefilmavehuaj">
                      Kategorite e Filmave te Huaj
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>

                <ButtonToolbar>
                    <Button className="mt-4" variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                       Shto Kategorine
                    </Button>

                    <AddKategoriteELibraveShqip show={this.state.addModalShow}
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
                        {cate.map(cat=>
                            <tr key={cat.KategoriaShId}>
                                <td>{cat.Kategoria}</td>
                                <td>
                               <ButtonToolbar>
                                   <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, catid:cat.KategoriaShId,
                                categ:cat.Kategoria})}>
                                       Edit
                                   </Button>

                                   <Button className="mr-2" variant="danger" onClick={()=>this.deleteAut(cat.KategoriaShId)}>
                                       Delete
                                   </Button>

                                   <EditKategoriteELibraveShqip show={this.state.editModalShow} onHide={editModalClose}
                                   catid={catid}
                                   categ={categ}/>
                               </ButtonToolbar>

                                </td>
                            </tr>)}
                    </tbody>

                </Table>
            </div>
        )
    }
}