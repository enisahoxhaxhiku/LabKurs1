import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form, Image} from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';


export class AddFaqja extends Component{

    constructor(props){
        super(props);
        this.submitFaqen=this.submitFaqen.bind(this);
    }


    validationSchema() {
        return Yup.object().shape({
            TitulliKapitullit: Yup.string()
            .required('Titulli duhet te plotesohet.'),
            PershkrimiF: Yup.string()
            .required('Pershkrimi faqes duhet te plotesohet.'),
        
        });
      
           
       
      }
      submitFaqen(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'faqja',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },

            body:JSON.stringify({
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
      const initialValues={
        TitulliKapitullit : '',
        NrFaqes : '',
        PershkrimiF : '',
        Linku : '',

      };

      return(
          <div className="container">
              <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Shto Faqen
                        </Modal.Title>
                    </Modal.Header>

                        <Modal.Body>
                            <Row>
                            <Col sm={6}>
                            <Formik
                               initialValues={initialValues}
                               validationSchema={this.validationSchema}
                               onSubmit={this.submitFaqen}
                             >
                                 {({ submitFaqen, isValid, isSubmitting, dirty }) => (
                                     <Form onSubmit={this.submitFaqen}>
                                         <Form.Group controlId="TitulliKapitullit">
                                        <Form.Label>Titulli</Form.Label>
                                        <Field type="text" name="TitulliKapitullit" required placeholder="Titulli" className="form-control" />
                                        <ErrorMessage
                                          name="TitulliKapitullit"
                                          component="div"
                                          className="text-danger"
                                         />
                                         </Form.Group>
                                         
                                         <Form.Group controlId="NrFaqes">
                                         <Form.Label>Numri faqes</Form.Label>
                                         <Field type="number" name="NrFaqes" required placeholder="NrFaqes" className="form-control" />
                                         <ErrorMessage
                                          name="NrFaqes"
                                          component="div"
                                          className="text-danger"
                                         />
                                         </Form.Group>

                                         <Form.Group controlId="PershkrimiF">
                                        <Form.Label>Pershkrimi</Form.Label>
                                        <Field as="textarea" name="PershkrimiF" required placeholder="PershkrimiF" className="form-control" />
                                        <ErrorMessage
                                          name="PershkrimiF"
                                          component="div"
                                          className="text-danger"
                                         />
                                         </Form.Group>
                                         <Form.Group controlId="Linku">
                                        <Form.Label>Linku</Form.Label>
                                        <input type="url" name="Linku" required placeholder="Linku" className="form-control"/>
                                        <ErrorMessage
                                          name="Linku"
                                          component="div"
                                          className="text-danger"
                                         />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button disabled={isSubmitting || !dirty || !isValid} variant="primary" type="submit">
                                            Shto Faqen
                                        </Button>
                                    </Form.Group>
                                     </Form>
                                     )}
                                     </Formik>
                            </Col>
                            </Row>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger"  onClick={this.props.onHide}>Close</Button>
                        </Modal.Footer>

                    </Modal>
          </div>
      )
  }
}