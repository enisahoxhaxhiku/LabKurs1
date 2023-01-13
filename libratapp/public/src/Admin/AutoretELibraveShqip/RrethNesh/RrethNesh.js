import React,{Component} from "react";
import {Table} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import ReadMoreReact from 'read-more-react';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddRrethNesh} from './AddRethNesh';
import {EditRrethNesh} from './EditRethNesh';

export class RrethNesh extends Component{
    constructor(props){
        super(props);
        this.state={rreth:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'rrethnesh')
        .then(response=>response.json())
        .then(data=>{
            this.setState({rreth:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }
    
    deleteRreth(rrethid){
        if(window.confirm('Jeni i sigurt qe doni ta fshini RrethNesh.')){
            fetch(process.env.REACT_APP_API+'rrethnesh/'+rrethid,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }
    
    render(){
        const {rreth, titid, tit, tek}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div className="container">
                <Helmet>
                <title>Rreth Nesh</title>
                </Helmet>

                <ButtonToolbar>
                    <Button className="mt-4" variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                       Shto Rreth Nesh
                    </Button>

                    <AddRrethNesh show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Titulli</th>
                        <th>Teksti</th>
                        <th>Veprime</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rreth.map(rre=>
                            <tr key={rre.TitulliId}>
                                <td>{rre.Titulli}</td>
                                <td style={{ cursor: 'pointer' }}><ReadMoreReact text={rre.Teksti}
                                    min={50}
                                    readMoreText="Read more"/></td>
                                <td>
                               <ButtonToolbar>
                                   <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, titid:rre.TitulliId,
                                tit:rre.Titulli,
                                tek:rre.Teksti})}>
                                       Edit
                                   </Button>

                                   <Button className="mr-2" variant="danger" onClick={()=>this.deleteRreth(rre.TitulliId)}>
                                       Delete
                                   </Button>

                                   <EditRrethNesh show={this.state.editModalShow} onHide={editModalClose}
                                   titid={titid}
                                   tit={tit}
                                   tek={tek}/>
                               </ButtonToolbar>

                                </td>
                            </tr>)}
                    </tbody>

                </Table>
            </div>
        )
    }
}