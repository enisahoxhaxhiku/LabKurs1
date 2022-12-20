import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';


export class EditPublicistetShqip extends Component{

    constructor(props){
        super(props);
        this.submitPublicistetP=this.submitPublicistetP.bind(this);
    }

    submitPublicistetP(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'publicistetelibraveshqip',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                PublicistetID:event.target.PublicistetID.value,
                Emri:event.target.Emri.value,
                Mbiemri:event.target.Mbiemri.value,
                Biografia:event.target.Biografia.value

            })
        })

        .then(res=>res.json())
        .then((result)=>{
        
            alert(result);
        },
        (error)=>{
            alert('Ka ndodhur nje gabim');
        })
        {window.location.href="/publicistetelibraveshqip"}
    }

    render(){
        return (
            <div className="container">

                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update Publicisitn e Librit Shqip
                        </Modal.Title>
                    </Modal.Header>

                        <Modal.Body>
                            <Row>
                                <Col sm={6}>
                                    <Form onSubmit={this.submitPublicistetP}>
                                    <Form.Group controlId="PublicistetID">
                                            <Form.Control type="text" name="PublicistetID" required hidden defaultValue = {this.props.pubID} placeholder="PublicistetID"/>
                                        </Form.Group>

                                        <Form.Group controlId="Emri">
                                        <Form.Label>Emri</Form.Label>
                                        <Form.Control type="text" name="Emri" required defaultValue={this.props.pubEmri} placeholder="Emri" />
                                    </Form.Group>

                                     <Form.Group controlId="Mbiemri">
                                        <Form.Label>Mbiemri</Form.Label>
                                        <Form.Control type="text" name="Mbiemri" required defaultValue={this.props.pubMbiemri} placeholder="Mbiemri" />
                                    </Form.Group>
 
                                    <Form.Group controlId="Biografia">
                                        <Form.Label>Biografia</Form.Label>
                                        <Form.Control as="textarea" name="Biografia" required defaultValue={this.props.pubBiografia} placeholder="Biografia" />
                                    </Form.Group>

                                        <Form.Group>
                                            <Button variant="primary" type="submit">
                                                Update Publicistin
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
