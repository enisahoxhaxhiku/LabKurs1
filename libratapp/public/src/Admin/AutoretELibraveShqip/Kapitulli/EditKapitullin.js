import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditKapitullin extends Component{

    constructor(props){
        super(props)
        this.submitKapitullin=this.submitKapitullin.bind();
    }


    submitKapitullin(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'kapitulli',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },

            body:JSON.stringify({
                KapitulliID:event.target.KapitulliID.value,
                NrKapitulli:event.target.NrKapitulli.value,
                NrFaqeve:event.target.NrFaqeve.value
               
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Ka ndodhur nje gabim');
        })
        {window.location.href="/Kapitulli"}
    }


    render(){
        return (
            <div className="container">
                <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered>
    
                   <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update Kapitullin e Librit te huaj
                        </Modal.Title>
                    </Modal.Header>
    
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.submitKapitullin}>
                                <Form.Group controlId="KapitulliID">
                                                <Form.Control type="text" name="KapitulliID" required hidden defaultValue = {this.props.kpid} placeholder="KapitulliID"/>
                                            </Form.Group>
    
                                    <Form.Group controlId="NrKapitulli">
                                    <Form.Label>NrKapitulli</Form.Label>
                                    <Form.Control type="number" min ="1" name="NrKapitulli" required defaultValue = {this.props.kpnr} placeholder="Numri kapitullit"/>
                                    </Form.Group>
                                   
                                    <Form.Group controlId="NrFaqeve">
                                        <Form.Label>Numri faqeve</Form.Label>
                                        <Form.Control type="number" min="1" name="NrFaqeve" required defaultValue={this.props.kpnrfq} placeholder="Numri faqeve"/>
                                    </Form.Group>
                                   
                                    
    
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Kapitullin
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