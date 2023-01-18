import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';


export class AddRevistatHuaj extends Component{
    constructor(props){
        super(props);
        this.submitRevistenH=this.submitRevistenH.bind(this);
    }
    validationSchema() {
        return Yup.object().shape({
          Emri: Yup.string()
            .required('Emri duhet te plotesohet.')
            .matches(
                /^[A-Za-z .]{3,15}$/,
                "Emri duhet te permbaj vetem Shkronja dhe te jete me i gjate se 2 shkronja dhe jo me i gjate se 15 shkronja."
              ),
            Pershkrimi: Yup.string()
            .required('Pershkrimi duhet te plotesohet')
            .matches(
                /^[A-Za-z .]{4,15}$/,
                "Pershkrimi duhet te permbaj vetem Shkronja dhe te jete me i gjate se 3 shkronja dhe jo me i gjate se 15 shkronja."
              ),
            More: Yup.string()
            .required('Hapesira per me shume duhet te plotesohet.'),
        });
      }


      submitRevistenH(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'revistatehuaja',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
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
            alert('Ka ndodhur nje gabim');
        })
        {window.location.href="/revistatehuaja"}
    }
    render(){
        const initialValues = {
            Emri: '',
            Pershkrimi: '',
            More: '',
          };
        return(
            <div className="container">
                  <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Shto Revisten e Huaj
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                            <Formik
                               initialValues={initialValues}
                               validationSchema={this.validationSchema}
                               onSubmit={this.submitRevistenH}
                             >
                                 {({ submitRevistenH, isValid, isSubmitting, dirty }) => (
                                <Form onSubmit={this.submitRevistenH}>
                                    <Form.Group controlId="Emri">
                                        <Form.Label>Emri</Form.Label>
                                        <Field type="text" name="Emri" required placeholder="Emri" className="form-control" />
                                        <ErrorMessage
                                          name="Emri"
                                          component="div"
                                          className="text-danger"
                                         />
                                    </Form.Group>
                                    <Form.Group controlId="Pershkrimi">
                                        <Form.Label>Pershkrimi</Form.Label>
                                        <Field type="text" name="Pershkrimi" required placeholder="Pershkrimi" className="form-control" />
                                        <ErrorMessage
                                          name="Pershkrimi"
                                          component="div"
                                          className="text-danger"
                                         />
                                    </Form.Group>
                                    <Form.Group controlId="More">
                                        <Form.Label>Me shume</Form.Label>
                                        <Field as="textarea" name="More" required placeholder="More" className="form-control" />
                                        <ErrorMessage
                                         name="More"
                                         component="div"
                                         className="text-danger"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                       <Button  disabled={isSubmitting || !dirty || !isValid} variant="primary" type="submit">
                                           Shto Revisten
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