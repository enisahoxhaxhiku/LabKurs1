import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';

export class AddRrethNesh extends Component{
    constructor(props){
        super(props);
        this.submitRrethNesh=this.submitRrethNesh.bind(this);
    }

    validationSchema() {
        return Yup.object().shape({
          Titulli: Yup.string()
            .required('Titulli duhet te plotesohet.')
            .matches(
                /^[A-Za-z .]{5,15}$/,
                "Tittuli te permbaj vetem Shkronja dhe te jete me i gjate se 4 shkronja dhe jo me i gjate se 15 shkronja."
              ),
              Teksti: Yup.string()
            .required('Teksti duhet te plotesohet.')
            ,
        });
      }

      submitRrethNesh(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'rrethnesh',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
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
        const initialValues = {
            Titulli: '',
            Teksti: '',
          };
        return(
            <div className="container">
                <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Shto Rreth Nesh
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                            <Formik
                               initialValues={initialValues}
                               validationSchema={this.validationSchema}
                               onSubmit={this.submitRrethNesh}
                             >
                                 {({ submitRrethNesh, isValid, isSubmitting, dirty }) => (
                                <Form onSubmit={this.submitRrethNesh}>
                                    <Form.Group controlId="Titulli">
                                        <Form.Label>Titulli</Form.Label>
                                        <Field type="text" name="Titulli" required placeholder="Titulli" className="form-control" />
                                        <ErrorMessage
                                          name="Titulli"
                                          component="div"
                                          className="text-danger"
                                         />
                                    </Form.Group>

                                    <Form.Group controlId="Teksti">
                                        <Form.Label>Teksti</Form.Label>
                                        <Field as="textarea" name="Teksti" required placeholder="Teksti" className="form-control" />
                                        <ErrorMessage
                                          name="Teksti"
                                          component="div"
                                          className="text-danger"
                                         />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button disabled={isSubmitting || !dirty || !isValid} variant="primary" type="submit">
                                            Shto Rreth Nesh
                                        </Button>
                                    </Form.Group>
                                </Form>
                                )}
                            </Formik>
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