import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
import { Formik } from 'formik';




export class AddLibratEHuajKapitulli extends Component{

    constructor(props){
        super(props);
        this.submitLK=this.submitLK.bind(this);
        this.state={librath:[], libkap:[]}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'librathuaj')
        .then(response=>response.json())
        .then(data=>{
            this.setState({librath:data});
        });
    }

    refreshList1(){
        fetch(process.env.REACT_APP_API+'kapitulli')
        .then(response=>response.json())
        .then(data=>{
            this.setState({libkap:data});
        });
    }

    componentDidMount(){
        this.refreshList();
        this.refreshList1();
    }


    submitLK(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'librathuajkapitulli',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },

            body:JSON.stringify({
                
                LibratH_Id:event.target.LibratH_Id.value,
                KapitulliID:event.target.KapitulliID.value
               
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Ka ndodhur nje gabim');
        })
        {window.location.href="/LibratEHuajKapitulli"}
    }
    
render(){


    return(

        <div className="container">
        <Modal {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter" centered>
              <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                      Shto Lidhjen
                  </Modal.Title>
              </Modal.Header>

                  <Modal.Body>
                      <Row>
                      <Col sm={6}>
                      <Formik
                         onSubmit={this.submitLK}
                       >
                           
                               <Form onSubmit={this.submitLK}>
                                   <Form.Group controlId="LibratH_Id">
                                  <Form.Label>Librat e Huaj</Form.Label>
                                  <Form.Control as="select">
                                      {this.state.librath.map(librath=>
                                      <option key={librath.LibratH_Id} value={librath.LibratH_Id}>{librath.Titulli}</option>)}
                                   </Form.Control>
                                   </Form.Group>
                                   
                                   <Form.Group controlId="KapitulliID">
                                   <Form.Label>Kapitulli ID</Form.Label>
                                   <Form.Control as="select">
                                      {this.state.libkap.map(libk=>
                                      <option key={libk.KapitulliID} value={libk.KapitulliID}>{libk.KapitulliID
                                      }</option>)}
                                   </Form.Control>
                                   </Form.Group>

                                 
                                  
                              <Form.Group>
                                  <Button variant="primary" type="submit">
                                      Shto Lidhjen
                                  </Button>
                              </Form.Group>
                               </Form>
                               
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