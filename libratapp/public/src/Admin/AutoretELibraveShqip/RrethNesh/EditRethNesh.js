import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';


export class EditRrethNesh extends Component{
    constructor(props){
        super(props);
        this.submitRrethNesh=this.submitRrethNesh.bind(this);
    }

    submitRrethNesh(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'rrethnesh',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                TitulliId:event.target.TitulliId.value,
                Titulli:event.target.Titulli.value,
                Teksti:event.target.Teksti.value,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Ka ndodhur nje gabim');
        })
        {window.location.href="/rrethnesh"}
    }
    render(){
        return(
            <div className="container">
                <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update Rreth Nesh
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.submitRrethNesh}>
                                <Form.Group controlId="TitulliId">
                                        <Form.Control type="text" name="TitulliId" required hidden defaultValue={this.props.titid} placeholder="TitulliId" />
                                    </Form.Group>
                                    <Form.Group controlId="Titulli">
                                        <Form.Label>Titulli</Form.Label>
                                        <Form.Control type="text" name="Titulli" required defaultValue={this.props.tit} placeholder="Titulli" />
                                    </Form.Group>
                                    <Form.Group controlId="Teksti">
                                        <Form.Label>Teksti</Form.Label>
                                        <Form.Control as="textarea" name="Teksti" required defaultValue={this.props.tek} placeholder="Teksti" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update RrethNesh
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