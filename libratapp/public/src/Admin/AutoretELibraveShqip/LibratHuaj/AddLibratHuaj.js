import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form, Image} from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';

export class AddLibratHuaj extends Component{
   
    constructor(props){
    super(props)
    this.state={kats:[], auto:[], publ:[], revi:[], even:[]};
    this.submitLibratHuaj=this.submitLibratHuaj.bind(this);
    this.fotoLibriSelect=this.fotoLibriSelect.bind(this);

    }



    Foto_H= "pro.png";
image = process.env.REACT_APP_PHOTOPATHS+this.Foto_H ;



refreshList(){
    fetch(process.env.REACT_APP_API+'kategoritelibrathuaj')
    .then(response=>response.json())
    .then(data=>{
        this.setState({kats:data});
    });
}


refreshList1(){
    fetch(process.env.REACT_APP_API+'autorethuaj')
    .then(response=>response.json())
    .then(data=>{
        this.setState({auto:data});
    });
}

refreshList2(){
    fetch(process.env.REACT_APP_API+'publicistethuaj')
    .then(response=>response.json())
    .then(data=>{
        this.setState({publ:data});
    });
}

refreshList3(){
    fetch(process.env.REACT_APP_API+'revistathuaj')
    .then(response=>response.json())
    .then(data=>{
        this.setState({revi:data});
    });
}

refreshList4(){
    fetch(process.env.REACT_APP_API+'eventetshqip')
    .then(response=>response.json())
    .then(data=>{
        this.setState({even:data});
    });
}

componentDidMount(){
    this.refreshList();
    this.refreshList1();
    this.refreshList2();
    this.refreshList3();
    this.refreshList4();
}
validationSchema() {
    return Yup.object().shape({
      Titulli: Yup.string()
        .required('Titulli duhet te plotesohet.'),
        PershkrimiS: Yup.string()
        .required('Pershkrimi duhet te plotesohet.'),
    });
  }



  submitLibratHuaj(event){
    event.preventDefault();
    fetch(process.env.REACT_APP_API+'librathuaj',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            Titulli:event.target.Titulli.value,
            NrKapitujve :event.target.NrKapitujve.value,
            Pershkrimi_Librit_Huaj :event.target.Pershkrimi_Librit_Huaj .value,
            Foto_H :this.Foto_H,//Foto_H :this.fotoisnot
            AutoretHId :event.target.AutoretHId.value,
            PublicistetHID:event.target. PublicistetHID.value,
            RevistatHID :event.target.RevistatHID .value,
            EventetHId :event.target.EventetHId .value,
            KategoriaHID :event.target.KategoriaHID.value
            
        
            
        })
    })
    .then(res=>res.json())
    .then((result)=>{
        alert(result);
    },
    (error)=>{
        alert('Ka ndodhur nje gabim');
    })
    {window.location.href="/LibratHuaj"}
}

fotoLibriSelect(event){
    event.preventDefault();
    this.Foto_H =event.target.files[0].name;
    const formData = new FormData();
    formData.append(
        "myFile",
        event.target.files[0],
        event.target.files[0].name
    );

    fetch(process.env.REACT_APP_API+'librathuaj/SaveFotoLibratHuaj',{
        method:'POST',
        body:formData
    })
    .then(res=>res.json())
    .then((result)=>{
        this.image=process.env.REACT_APP_PHOTOPATHS+result;
    },
    (error)=>{
        alert('Failed');
    })
    
}

render(){
    const initialValues = {
        Titulli: '',
        Pershkrimi_Librit_Huaj: '',
      };
    return(
        <div className="container">
            <Modal {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Shto Librin e Huaj
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                        <Formik
                           initialValues={initialValues}
                           validationSchema={this.validationSchema}
                           onSubmit={this.submitLibratHuaj}
                         >
                             {({ submitLibratHuaj, isValid, isSubmitting, dirty }) => (
                            <Form onSubmit={this.submitLibratHuaj}>
                                <Form.Group controlId="Titulli">
                                    <Form.Label>Titulli</Form.Label>
                                    <Field type="text" name="Titulli" required placeholder="Titulli" className="form-control" />
                                    <ErrorMessage
                                      name="Titulli"
                                      component="div"
                                      className="text-danger"
                                     />
                                </Form.Group>
                                <Form.Group controlId="NrKapitujve">
                                    <Form.Label>Numri Kapitujve</Form.Label>
                                    <input type="text"  name="NrKapitujve" required placeholder="NrKapitujve" className="form-control" />
                                    <ErrorMessage
                                      name="NrKapitujve"
                                      component="div"
                                      className="text-danger"
                                     />
                                </Form.Group>
                                <Form.Group controlId="Pershkrimi_Librit_Huaj ">
                                    <Form.Label>Pershkrimi Librit te Huaj</Form.Label>
                                    <Field as="textarea" name="Pershkrimi_Librit_Huaj " required placeholder="Pershkrimi Librit" className="form-control" />
                                    <ErrorMessage
                                      name="Pershkrimi_Librit_Huaj "
                                      component="div"
                                      className="text-danger"
                                     />
                                </Form.Group>
                                <Form.Group controlId="Foto_H ">
                                    <Form.Label>Foto</Form.Label><br/>
                                    <Image width="150px" height="150px" src={this.image}/>
                                    <input onChange={this.fotoLibriSelect} type="File" name="Foto_H" className="form-control"/>
                                </Form.Group>
                                
                                
                                <Form.Group controlId="AutoretHId ">
                                   <Form.Label>Autori Kryesor</Form.Label>
                                   <Form.Control as="select">
                                      {this.state.auto.map(aut=>
                                      <option key={aut.AutoretHId } value={aut.AutoretHId }>{aut.Emri} {aut.Mbiemri}</option>)}
                                   </Form.Control>
                                </Form.Group>

                            
                                <Form.Group controlId="PublicistetHID ">
                                   <Form.Label>Publicisti</Form.Label>
                                   <Form.Control as="select">
                                      {this.state.publ.map(pub=>
                                      <option key={pub.PublicistetHID } value={pub.PublicistetHID }>{pub.Emri} {pub.Mbiemri}</option>)}
                                   </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="RevistatHID ">
                                   <Form.Label>Revista</Form.Label>
                                   <Form.Control as="select">
                                      {this.state.revi.map(rev=>
                                      <option key={rev.RevistatHID } value={rev.RevistatHID }>{rev.Emri} {rev.Pershkrimi}</option>)}
                                   </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="EventetHId">
                                   <Form.Label>Eventi</Form.Label>
                                   <Form.Control as="select">
                                      {this.state.even.map(eve=>
                                      <option key={eve.EventetHId} value={eve.EventetHId}>{eve.Emri} {eve.Koha}</option>)}
                                   </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="KategoriaHID">
                                   <Form.Label>Kategoria</Form.Label>
                                   <Form.Control as="select">
                                      {this.state.kats.map(kat=>
                                      <option key={kat.KategoriaHID} value={kat.KategoriaHID}>{kat.KategoriaHID}</option>)}
                                   </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Button disabled={isSubmitting || !dirty || !isValid} variant="primary" type="submit">
                                        Shto Librin e Huaj
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