import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';


export class EditRevistatShqip extends Component{

    constructor(props){
        super(props);
        this.submitRevistenSh=this.submitRevistenSh.bind(this);
    }

    submitRevistenSh(event){
      event.preventDefault();
      fetch(process.env.REACT_APP_API+"revistatshqip",{
            method:'PUT',
            headers : {
                'Accept':'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                RevistatShID:event.target.RevistatShID.value,
                Emri:event.target.Emri.value,
                Pershkrimi:event.target.Pershkrimi.value,
                More:event.target.More.value

            })
      })

      .then(res=>res.json())
      .then((result)=>{
          alert(result);
      },
  
          (error)=>{
          alert('Ka ndodhur nje gabim!');
          })
 
          {window.location.href="/revistatshqip"}

    }

    render(){
        return(
            <div className="container">
                    <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header>
                        <Modal.Title  id="contained-modal-title-vcenter">Update Revisten Shqip</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.submitRevistenSh}>
                                    <Form.Group controlId="RevistatShID">
                                        <Form.Control  name="RevistatShID"required hidden defaultValue ={this.props.revid} 
                                        placeholder="RevistatShID"/>
                                    </Form.Group>
                                    <Form.Group controlId="Emri">
                                        <Form.Label>Emri</Form.Label>
                                        <Form.Control type = "text" name="Emri" required defaultValue = {this.props.revemri} placeholder="Emri"/> 
                                    </Form.Group>
                                    <Form.Group controlId="Pershkrimi">
                                        <Form.Label>Pershkrimi</Form.Label>
                                        <Form.Control type = "text" name="Pershkrimi" required defaultValue = {this.props.revpershkrimi} placeholder="Pershkrimi"/> 
                                    </Form.Group>
                                    <Form.Group controlId="More">
                                        <Form.Label>Me shume</Form.Label>
                                        <Form.Control as="textarea" name="More" required defaultValue = {this.props.revmore} placeholder="More"/> 
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Revisten
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