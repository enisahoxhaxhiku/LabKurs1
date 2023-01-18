import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';


export class EditEventetHuaj extends Component {
    constructor(props){
        super(props);  
        this.submitEventetH=this.submitEventetH.bind(this);
    }

    submitEventetH(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+"eventetehuaja",{
              method:'PUT',
              headers : {
                  'Accept':'application/json',
                  'Content-Type' : 'application/json'
              },
              body:JSON.stringify({
                EventetHId:event.target.EventetHId.value,
                  Emri:event.target.Emri.value,
                  Koha:event.target.Koha.value,
                  Lokacioni:event.target.Lokacioni.value
  
              })
        })
  
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
    
            (error)=>{
            alert('Ka ndodhur nje gabim!');
            })
   
            {window.location.href="/eventetehuaja"}
  
      }


      render(){
        return(
            <div className="container">
<Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header>
                        <Modal.Title  id="contained-modal-title-vcenter">Update Eventin e Huaj</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.submitEventetH}>
                                    <Form.Group controlId="EventetHId">
                                        <Form.Control  name="EventetHId"required hidden defaultValue ={this.props.eveid} 
                                        placeholder="EventetHId"/>
                                    </Form.Group>
                                    <Form.Group controlId="Emri">
                                        <Form.Label>Emri</Form.Label>
                                        <Form.Control type = "text" name="Emri" required defaultValue = {this.props.eveemri} placeholder="Emri"/> 
                                    </Form.Group>
                                    <Form.Group controlId="Koha">
                                        <Form.Label>Koha</Form.Label>
                                        <Form.Control type = "text" name="Koha" required defaultValue = {this.props.evekoha} placeholder="Koha"/> 
                                    </Form.Group>
                                    <Form.Group controlId="Lokacioni">
                                        <Form.Label>Lokacioni</Form.Label>
                                        <Form.Control as="textarea" name="Lokacioni" required defaultValue = {this.props.evelokacioni} placeholder="Lokacioni"/> 
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Eventin
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