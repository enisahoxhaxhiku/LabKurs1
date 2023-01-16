import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
import { Formik } from 'formik';



export class AddKapitulliFaqja extends Component{

    constructor(props){
        super(props);
        this.submitKF=this.submitKF.bind(this);
        this.state={faqe:[], libkap:[]}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'faqja')
        .then(response=>response.json())
        .then(data=>{
            this.setState({faqe:data});
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

   
        submitKF(event){
            event.preventDefault();
            fetch(process.env.REACT_APP_API+'kapitullifaqja',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
    
                body:JSON.stringify({
                    
                    KapitulliID:event.target.KapitulliID.value,
                    FaqjaID:event.target.FaqjaID.value
                   
                })
            })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
            },
            (error)=>{
                alert('Ka ndodhur nje gabim');
            })
            {window.location.href="/KapitullFaqja"}
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
                               onSubmit={this.submitKF}
                             >
                                 
                                     <Form onSubmit={this.submitKF}>
                                         <Form.Group controlId="KapitulliID">
                                        <Form.Label>Kapitulli ID</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.libkap.map(lk=>
                                            <option key={lk.KapitulliID} value={lk.KapitulliID}>{lk.KapitulliID}</option>)}
                                        </Form.Control>
                                         </Form.Group>
                                         
                                         <Form.Group controlId="FaqjaID">
                                         <Form.Label>Faqja</Form.Label>
                                         <Form.Control as="select">
                                            {this.state.fqk.map(fq=>
                                            <option key={fq.FaqjaID} value={fq.FaqjaID}>{fq.TitulliKapitullit}</option>)}
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
