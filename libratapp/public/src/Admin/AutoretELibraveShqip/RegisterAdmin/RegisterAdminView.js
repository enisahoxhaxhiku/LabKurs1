import React,{Component} from "react";
import {Table} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom';
import {UpdateRoleRegister} from './UpdateRoleRegister'
import {Button,ButtonToolbar} from 'react-bootstrap';


export class RegisterAdminView extends Component{
    constructor(props){
        super(props)
        this.state={accs:[], updateModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'account')
        .then(response=>response.json())
        .then(data=>{
            this.setState({accs:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }
    

    deleteReg(Username){
        if(window.confirm('Jeni i sigurt qe doni ta fshini?')){
            fetch(process.env.REACT_APP_API+'account/'+Username,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }
    
    render(){
        const {accs, rolname, normname}=this.state;
        let updateModalClose=()=>this.setState({updateModalShow:false});
        return(
            <div className="container">
                <Helmet>
                <title>Register Admin</title>
                </Helmet>

                <ButtonToolbar>
                <Link to='/Admin/registersAdmin'>
                <Button className="mt-4" variant="primary">Shto Admin</Button>
                </Link>
                </ButtonToolbar>

                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Emri</th>
                        <th>Email</th>
                        <th>Roli</th>
                        <th>Veprime</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accs.map(acc=>
                            <tr key={acc.UserId}>
                                <td>{acc.UserName}</td>
                                <td>{acc.Email}</td>
                                <td>{acc.Name}</td>
                                <td>
                               <ButtonToolbar>
                                 
                               <Button className="mr-2" variant="info" onClick={()=>this.setState({updateModalShow:true, rolname:acc.Name,
                               normname:acc.NormalizedUserName})}>
                                       Edit
                                   </Button>

                                   <Button className="mr-2" variant="danger" onClick={()=>this.deleteReg(acc.UserName)}>
                                       Delete
                                   </Button>

                                   <UpdateRoleRegister show={this.state.updateModalShow} onHide={updateModalClose}
                                   rolname={rolname}
                                   normname={normname}/>
                               </ButtonToolbar>

                                </td>
                            </tr>)}
                    </tbody>

                </Table>
            </div>
        )
    }
}