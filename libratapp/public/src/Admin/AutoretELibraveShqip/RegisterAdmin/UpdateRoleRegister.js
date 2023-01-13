import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';


export class UpdateRoleRegister extends Component{
    constructor(props){
        super(props);
        this.state={role:[]}
        this.updateRegister=this.updateRegister.bind(this);
    }

    updateRegister(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'account',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id:event.target.Id.value,
                emri:event.target.emri.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Ka ndodhur nje gabim');
        })
        {window.location.href="/registersview"}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'account/getrole')
        .then(response=>response.json())
        .then(data=>{
            this.setState({role:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    render(){
        return(
            <div className="container">
                <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update Rolin
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.updateRegister}>
                                    <Form.Group>
                                        <Form.Label>Roli qe ka</Form.Label>
                                        <Form.Control type="text" required disabled defaultValue={this.props.rolname} />
                                    </Form.Group>

                                    <Form.Group controlId="emri">
                                    <Form.Label>Emri</Form.Label>
                                        <Form.Control type="text" name="emri" required disabled defaultValue={this.props.normname} placeholder="Emri" />
                                    </Form.Group>
                                    <Form.Group controlId="Id">
                                       <Form.Label>Ndrysho rolin</Form.Label>
                                       <Form.Control as="select" name="Id">
                                          {this.state.role.map(rol=>
                                          <option key={rol.Id} value={rol.Id}>{rol.Name}</option>)}
                                       </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Rolin
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}