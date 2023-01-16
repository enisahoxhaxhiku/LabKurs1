import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditFaqja extends Component{

constructor(props){
    super(props)
    this.submitFaqen=this.submitFaqen.bind();
}

submitFaqen(event){
    event.preventDefault();
    fetch(process.env.REACT_APP_API+'faqja',{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            FaqjaID:event.target.FaqjaID.value,
            TitulliKapitullit:event.target.TitulliKapitullit.value,
            NrFaqes:event.target.NrFaqes.value,
            PershkrimiF:event.target.PershkrimiF.value,
            Linku:event.target.Linku.value

        })
    })

    .then(res=>res.json())
    .then((result)=>{
    
        alert(result);
    },
    (error)=>{
        alert('Ka ndodhur nje gabim');
    })
    {window.location.href="/faqja"}
}


render(){
    return (
        <div className="container">
            <Modal {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter" centered>

               <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Faqen e Librit te Huaj
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.submitFaqen}>
                            <Form.Group controlId="FaqjaID">
                                            <Form.Control type="text" name="FaqjaID" required hidden defaultValue = {this.props.fqid} placeholder="FaqjaID"/>
                                        </Form.Group>

                                <Form.Group controlId="TitulliKapitullit">
                                <Form.Label>Titulli</Form.Label>
                                <Form.Control type="text" name="TitulliKapitullit" required defaultValue = {this.props.fqtitulli} placeholder="Titulli Kapitullit"/>
                                </Form.Group>
                               
                                <Form.Group controlId="NrFaqes">
                                    <Form.Label>Numri Faqes</Form.Label>
                                    <Form.Control type="number" min="1" name="NrFaqes" required defaultValue={this.props.fqnr} placeholder="Numri faqes"/>
                                </Form.Group>
                               
                                <Form.Group controlId="PershkrimiF">
                                <Form.Label>Pershkrimi</Form.Label>
                                    <Form.Control as="textarea" name="PershkrimiF" required defaultValue={this.props.fqpershkrimi} placeholder="Pershkrimi"/>
                                </Form.Group>
                                <Form.Group controlId="Linku">
                                <Form.Label>Linku</Form.Label>
                                    <Form.Control type="text" name="Linku" required defaultValue={this.props.fqlinku} placeholder="Linku"/>
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Update Faqen
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