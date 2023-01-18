import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';

export class AddEventetHuaj extends Component{
    constructor(props){
        super(props);
        this.submitEventetH=this.submitEventetH.bind(this);
    }


    validationSchema() {
        return Yup.object().shape({
          Emri: Yup.string()
            .required('Emri duhet te plotesohet.')
            .matches(
                /^[A-Za-z .]{3,15}$/,
                "Emri duhet te permbaj vetem Shkronja dhe te jete me i gjate se 2 shkronja dhe jo me i gjate se 15 shkronja."
              ),
              Koha: Yup.string()
            .required('Koha duhet te plotesohet')
            .matches(
                /^[A-Za-z .]{4,15}$/,
                "Koha duhet te permbaj vetem Shkronja dhe te jete me i gjate se 3 shkronja dhe jo me i gjate se 15 shkronja."
              ),
              Lokacioni: Yup.string()
            .required('Lokacioni duhet te plotesohet.'),
        });
      }
      submitEventetH(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'eventetehuaja',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
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
            alert('Ka ndodhur nje gabim');
        })
        {window.location.href="/eventetehuaja"}
    }

    render(){
        const initialValues = {
            Emri: '',
            Koha: '',
            Lokacioni: '',
          };

          return(
            <div className="container">
<Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Shto Eventin e Huaj
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                            <Formik
                               initialValues={initialValues}
                               validationSchema={this.validationSchema}
                               onSubmit={this.submitEventetH}
                             >
                                 {({ submitEventetH, isValid, isSubmitting, dirty }) => (
                                <Form onSubmit={this.submitEventetH}>
                                    <Form.Group controlId="Emri">
                                        <Form.Label>Emri</Form.Label>
                                        <Field type="text" name="Emri" required placeholder="Emri" className="form-control" />
                                        <ErrorMessage
                                          name="Emri"
                                          component="div"
                                          className="text-danger"
                                         />
                                    </Form.Group>
                                    <Form.Group controlId="Koha">
                                        <Form.Label>Koha</Form.Label>
                                        <Field type="text" name="Koha" required placeholder="Koha" className="form-control" />
                                        <ErrorMessage
                                          name="Koha"
                                          component="div"
                                          className="text-danger"
                                         />
                                    </Form.Group>
                                    <Form.Group controlId="Lokacioni">
                                        <Form.Label>Lokacioni</Form.Label>
                                        <Field as="textarea" name="Lokacioni" required placeholder="Lokacioni" className="form-control" />
                                        <ErrorMessage
                                         name="Lokacioni"
                                         component="div"
                                         className="text-danger"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                       <Button  disabled={isSubmitting || !dirty || !isValid} variant="primary" type="submit">
                                           Shto Eventin
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