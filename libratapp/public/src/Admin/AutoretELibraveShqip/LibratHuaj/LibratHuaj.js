import React,{Component} from "react";
import {Table,Dropdown,Image} from 'react-bootstrap';
import {Helmet} from "react-helmet";

import {Button,ButtonToolbar} from 'react-bootstrap';
import{EditLibratHuaj} from './EditLibratHuaj';
import {AddLibratHuaj} from "./AddLibratHuaj";



export class LibratHuaj extends Component{
    constructor(props){
        super(props)
        this.state={liberh:[],addModalShow:false,editModalShow:false}
    }

 
    refreshList(){
        fetch(process.env.REACT_APP_API+'librath')
        .then(response=>response.json())
        .then(data=>{
            this.setState({liberh:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }
 
  
  
    deleteLib(libid){
        if(window.confirm('Jeni i sigurt qe doni ta fshini Librin e Huaj?')){
            fetch(process.env.REACT_APP_API+'librath/'+libid,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }

render(){
  
    const {liberh,libid,tit,nrs,persh,foto}=this.state;
    let addModalClose=()=>this.setState({addModalShow:false});
    let editModalClose=()=>this.setState({editModalShow:false});
    return(

        <div className="container">
            <Helmet>
                <title>Libri Huaj</title>
            </Helmet>
            
            <Dropdown className="d-flex justify-content-end mt-4">
                    <Dropdown.Toggle variant="success">
                        ibrat e Huaj
                    </Dropdown.Toggle>
                    <Dropdown.Menu>

                      
                        <Dropdown.Item href="kapitulli">Kapitujt</Dropdown.Item>
                        <Dropdown.Item href="faqja">Faqja</Dropdown.Item>
                        <Dropdown.Item href="kapitullifaqja">Lidhjet Kapitull Faqe</Dropdown.Item>
                        <Dropdown.Item href="librathuajkapitulli">Lidhjet Libra te Huaj Kapituj</Dropdown.Item>
                    </Dropdown.Menu>
         
                </Dropdown>
                <ButtonToolbar>
                <Button className="mt-4" variant="primary" onClick={()=>this.setState({addModalShow:true})}>Shto Librin e Huaj</Button>
                <AddSerialin show={this.state.addModalShow}
                    onHide={addModalClose}/>
            </ButtonToolbar>

            <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>LibratH_Id</th>
                        <th>Titulli</th>
                        <th>Numri Kapitujve</th>
                        <th>Pershkrimi</th>
                        <th>Foto</th>
                        <th>Kategoria</th>
                        <th>Veprime</th>
                        </tr>
                    </thead>
                    <tbody>
                        {liberh.map(lib=>
                            <tr key={lib.LibratH_Id }>
                                <td>{lib.LibratH_Id }</td>
                                <td>{lib.Titulli}</td>
                                <td>{lib.NrKapitujve}</td>
                                <td>{lib.Pershkrimi_Librit_Huaj}</td>
                                <td><Image width="70px" height="70px" src={`${process.env.REACT_APP_PHOTOPATHS}${lib.Foto_H}`}/></td>
                                <td>{lib.KategoriaHID}</td>
                                <td>
                                <ButtonToolbar>
                                   <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, libid:lib.LibratH_Id, tit:lib.Titulli,nrs:lib.NrKapitujve,persh:lib.Pershkrimi_Librit_Huaj,foto:lib.Foto_H})}>
                                       Edit
                                   </Button>

                                   <Button className="mr-2" variant="danger" onClick={()=>this.deleteLiberh(ser.LibratH_Id)}>
                                       Delete
                                   </Button>

                                   <EditSerialin show={this.state.editModalShow}
                                      onHide={editModalClose}
                                      libid={libid}
                                      tit={tit}
                                      nrs={nrs}
                                      persh={persh}
                                      foto={foto}
                                      
                                     
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