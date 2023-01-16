import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';


export class EditKategoriteELibraveShqip extends Component{
    constructor(props){
        super(props);
        this.submitKategoriteSh=this.submitKategoriteSh.bind(this);
    }

    submitKategoritF(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'kategoriteelibraveshqip',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                KategoriaShId:event.target.KategoriaShId.value,
                Kategoria:event.target.Kategoria.value,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Ka ndodhur nje gabim');
        })
        {window.location.href="/kategoriteelibraveshqip"}
    }
    render(){
        return(
            <div className="container">
                <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update Kategorine e Librit Shqip
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.submitKategoriteSh}>
                                <Form.Group controlId="KategoriaShId">
                                        <Form.Control type="text" name="KategoriaShId" required hidden defaultValue={this.props.catid} placeholder="KategoriaShId" />
                                    </Form.Group>
                                    <Form.Group controlId="Kategoria">
                                        <Form.Label>Kategoria</Form.Label>
                                        <Form.Control type="text" name="Kategoria" required defaultValue={this.props.categ} placeholder="Kategoria" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Kategorine
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