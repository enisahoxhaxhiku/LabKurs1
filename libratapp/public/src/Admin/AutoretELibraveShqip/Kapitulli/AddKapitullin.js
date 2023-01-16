import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';


export class AddKapitullin extends Component{

    constructor(props){
        super(props);
        this.submitKapitullin=this.submitKapitullin.bind(this);
    }


    validationSchema() {
        return Yup.object().shape({
            NrKapitulli: Yup.number()
            .required('Numri kapitullit duhet te plotesohet'),
            NrFaqeve: Yup.number()
            .required('Numri faqeve duhet te plotesohet'),
        
        });
      
           
       
      }
    submitKapitullin(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'kapitulli',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },

            body:JSON.stringify({
                
                NrKapitulli:event.target.NrKapitulli.value,
                NrFaqeve:event.target.NrFaqeve.value
               
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Ka ndodhur nje gabim');
        })
        {window.location.href="/Kapitulli"}
    }
  render(){
      const initialValues={
        NrKapitulli : '',
        NrFaqeve : '',
          

      };

      return(
          <div className="container">
              <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Shto Kapitullin
                        </Modal.Title>
                    </Modal.Header>

                        <Modal.Body>
                            <Row>
                            <Col sm={6}>
                            <Formik
                               initialValues={initialValues}
                               validationSchema={this.validationSchema}
                               onSubmit={this.submitKapitullin}
                             >
                                 {({ submitKapitullin, isValid, isSubmitting, dirty }) => (
                                     <Form onSubmit={this.submitKapitullin}>
                                         <Form.Group controlId="NrKapitulli">
                                        <Form.Label>Numri i kapitullit</Form.Label>
                                        <Field min="1" type="number" name="NrKapitulli" required placeholder="NrKapitulli" className="form-control" />
                                        <ErrorMessage
                                          name="NrKapitulli"
                                          component="div"
                                          className="text-danger"
                                         />
                                         </Form.Group>
                                         
                                         <Form.Group controlId="NrFaqeve">
                                         <Form.Label>Numri i episodave</Form.Label>
                                         <Field min="1" type="number" name="NrFaqeve" required placeholder="NrFaqeve" className="form-control" />
                                         <ErrorMessage
                                          name="NrFaqeve"
                                          component="div"
                                          className="text-danger"
                                         />
                                         </Form.Group>

                                       
                                        
                                    <Form.Group>
                                        <Button disabled={isSubmitting || !dirty || !isValid} variant="primary" type="submit">
                                            Shto Kapitullin
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