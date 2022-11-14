import React,{Component} from 'react';
import {Button,Card, Form} from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom';


export class DergoMesazh extends Component{

 constructor(props){
    super(props);
    this.submitMesazhin=this.submitMesazhin.bind(this);
    this.state={addModalShow:true}
 }

//  refreshList(){
//     fetch(process.env.REACT_APP_API+'contact')
//     .then(response=>response.json())
//     .then(data=>{
//         this.setState({cont:data});
//     });
// }
// componentDidMount(){
//     this.refreshList();
// }

// componentDidUpdate(){
//     this.refreshList();
// }

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

          NrTel: Yup.string()
        .required('Numri telefonit duhet te plotesohet.'),
        Mesazhi: Yup.string()
        .required('Mesazhi duhet te plotesohet.'),
    });
  }
  submitMesazhin(event){
    event.preventDefault();
    fetch(process.env.REACT_APP_API+'contact',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            Emri:event.target.Emri.value,
            Mbiemri:event.target.Mbiemri.value,
            NrTel:event.target.NrTel.value,
            Mesazhi:event.target.Mesazhi.value
        })
    })
    .then(res=>res.json())
    .then((result)=>{
        alert(result);
    },
    (error)=>{
        alert('Ka ndodhur nje gabim');
    })
    {window.location.href="/dergomesazh"}
}


render(){
    const initialValues = {
        Emri: '',
        Mbiemri: '',
        NrTel: '',
        Mesazhi:'',
        
      };
    return(
        <div className="container"  >
            <Helmet>
                <title>Kontakti</title>
                </Helmet>

            
                <Card className="mt-5">
                <Card.Body className="m-auto mt-5 block-example border border-secondary shadow p-3 mb-5 bg-white rounded">
                    <Card.Body>
                    <h6 className="text-center text-primary">Contact</h6>
                <Formik
                initialValues={initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.submitMesazhin}
                >
                    {({ submitMesazhin, isValid, isSubmitting, dirty }) => (
                    <Form onSubmit={this.submitMesazhin} className="mt-3 mx-auto" style={{ width: '15rem'}}>
                        <Form.Group controlId="Username">
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
                        <Form.Group controlId="NrTel">
                            <Form.Label>Nr. Tel</Form.Label>
                            <Field type="text" name="NrTel" required placeholder="NrTel" className="form-control" />
                            <ErrorMessage
                            name="NrTel"
                            component="div"
                            className="text-danger"
                            />
                        </Form.Group>
                        <Form.Group controlId="Mesazhi">
                            <Form.Label>Mesazhi</Form.Label>
                            <Field type="textarea" name="Mesazhi" required placeholder="Mesazhi" className="form-control" />
                            <ErrorMessage
                            name="Mesazhi"
                            component="div"
                            className="text-danger"
                            />
                        </Form.Group>
                        
                        <Form.Group className="mt-3 text-center">
                        <Button  disabled={isSubmitting || !dirty || !isValid} variant="primary" type="submit">
                            Dërgo
                                </Button>
                        </Form.Group>
                  
                    </Form>
                    )}
                    </Formik>
                    </Card.Body>
                    </Card.Body>
                    </Card>
                {/* <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered
                show={this.state.addModalShow}>
                    <Modal.Header closeButton> 
                        <Modal.Title id="contained-modal-title-vcenter">
                           Kontakti
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                            <Formik
                               initialValues={initialValues}
                               validationSchema={this.validationSchema}
                               onSubmit={this.submitMesazhin}
                               
                             >
                                 {({ submitMesazhin, isValid, isSubmitting, dirty }) => (
                                <Form onSubmit={this.submitMesazhin}  >
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
                                    <Form.Group controlId="NrTel">
                                        <Form.Label>Nr. Tel</Form.Label>
                                        <Field type="text" name="NrTel" required placeholder="NrTel" className="form-control" />
                                        <ErrorMessage
                                         name="NrTel"
                                         component="div"
                                         className="text-danger"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="Mesazhi">
                                        <Form.Label>Mesazhi</Form.Label>
                                        <Field as="textarea" name="Mesazhi" required placeholder="Mesazhi" className="form-control" />
                                        <ErrorMessage
                                         name="Mesazhi"
                                         component="div"
                                         className="text-danger"
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button disabled={isSubmitting || !dirty || !isValid} variant="primary" type="submit">
                                            Dergo
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
                </Modal> */}
            </div>
    )
    
}


}