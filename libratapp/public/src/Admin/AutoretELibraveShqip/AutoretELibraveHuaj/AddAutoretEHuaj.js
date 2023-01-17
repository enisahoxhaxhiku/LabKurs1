import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';


export class AddAutoretEHuaj extends Component{
    constructor(props){
        super(props);
        this.submitAutorH=this.submitAutorH.bind(this);
    }

    validationSchema() {
        return Yup.object().shape({
          Emri: Yup.string()
            .required('Emri duhet te plotesohet.')
            .matches(
                /^[A-Za-z .]{3,15}$/,
                "Emri te permbaj vetem Shkronja dhe te jete me i gjate se 2 shkronja dhe jo me i gjate se 15 shkronja."
              ),
            Mbiemri: Yup.string()
            .required('Mbiemri duhet te plotesohet')
            .matches(
                /^[A-Za-z .]{4,15}$/,
                "Mbiemri te permbaj vetem Shkronja dhe te jete me i gjate se 3 shkronja dhe jo me i gjate se 15 shkronja."
              ),
            Biografia: Yup.string()
            .required('Biografia duhet te plotesohet.'),
        });
      }

      submitAutorH(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'autoretehuaj',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
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
        {window.location.href="/autoretehuaj"}
    }
    render(){
        const initialValues = {
            Emri: '',
            Mbiemri: '',
            Biografia: '',
          };
        return(
            <div className="container">
                <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Shto Autorin e Huaj
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                            <Formik
                               initialValues={initialValues}
                               validationSchema={this.validationSchema}
                               onSubmit={this.submitAutorH}
                             >
                                 {({ submitAutorH, isValid, isSubmitting, dirty }) => (
                                <Form onSubmit={this.submitAutorH}>
                                    <Form.Group controlId="Emri">
                                        <Form.Label>Emri</Form.Label>
                                        <Field type="text" name="Emri" required placeholder="Emri" className="form-control" />
                                        <ErrorMessage
                                          name="Emri"
                                          component="div"
                                          className="text-danger"
                                         />
                                    </Form.Group>
                                    <Form.Group controlId="Mbiemri">
                                        <Form.Label>Mbiemri</Form.Label>
                                        <Field type="text" name="Mbiemri" required placeholder="Mbiemri" className="form-control" />
                                        <ErrorMessage
                                         name="Mbiemri"
                                         component="div"
                                         className="text-danger"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="Biografia">
                                        <Form.Label>Biografia</Form.Label>
                                        <Field as="textarea" name="Biografia" required placeholder="Biografia" className="form-control" />
                                        <ErrorMessage
                                         name="Biografia"
                                         component="div"
                                         className="text-danger"
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button disabled={isSubmitting || !dirty || !isValid} variant="primary" type="submit">
                                            Shto Autorin
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
