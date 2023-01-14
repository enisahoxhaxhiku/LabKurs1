import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form, Image} from 'react-bootstrap';

export class EditLibratHuaj extends Component{

    constructor(props){
        super(props);
        this.state={kats:[],auto:[],publ:[],revi:[],even:[]};
        this.submitLibratHuaj=this.submitLibratHuaj.bind(this);
        this.fotoLibriSelect=this.fotoLibriSelect.bind(this);
    }

    Foto_H= "pro.png";
    image = process.env.REACT_APP_PHOTOPATHS+this.Foto_H;

    
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
    fetch(process.env.REACT_APP_API+'eventethuaj')
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

submitLibratHuaj(event){
    event.preventDefault();
    fetch(process.env.REACT_APP_API+'librathuaj',{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            LibratH_Id :event.target.LibratH_Id.value,
            Titulli:event.target.Titulli.value,
            NrKapitujve :event.target.NrKapitujve .value,
            Pershkrimi_Librit_Huaj :event.target.Pershkrimi_Librit_Huaj.value,
            Foto_H:this.Foto_H,
            AutoretHId:event.target.AutoretHId.value,
            PublicistetHID:event.target.PublicistetHID.value,
            RevistatHID:event.target.RevistatHID.value,
            EventetHId:event.target.EventetHId.value,
            KategoriaHID:event.target.KategoriaHID.value
            
            
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
    this.Foto_H=event.target.files[0].name;
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
    
    return(
        <div className="container">
            <Modal {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Librin e Huaj
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                     
                            
                            <Form onSubmit={this.submitLibratHuaj}>
                            <Form.Group controlId="LibratH_Id">
                                        <Form.Control type="text" name="LibratH_Id" required hidden defaultValue={this.props.libid} placeholder="LibratH_Id" />
                            </Form.Group>
                                <Form.Group controlId="Titulli">
                                    <Form.Label>Titulli</Form.Label>
                                    <Form.Control type="text" name="Titulli" required placeholder="Titulli" defaultValue={this.props.tit}/>    
                                   
                                </Form.Group>
                                <Form.Group controlId="NrKapitujve ">
                                    <Form.Label>Numri Kapitujve</Form.Label>
                                    <Form.Control type="text" name="NrKapitujve" required placeholder="NrKapitujve " defaultValue={this.props.nrs}/>                                      
                                   
                                </Form.Group>
                                <Form.Group controlId="Pershkrimi_Librit_Huaj ">
                                    <Form.Label>Pershkrimi i Librit te Huaj</Form.Label>
                                    <Form.Control as="textarea" name="Pershkrimi_Librit_Huaj " required placeholder="Pershkrimi i Librit te Huaj" defaultValue={this.props.persh}/>
                                   
                                </Form.Group>
                                <Form.Group controlId="Foto_H ">
                                    <Form.Label>Foto</Form.Label><br/>
                                    <Image width="150px" height="150px" src={process.env.REACT_APP_PHOTOPATHS+this.props.foto}/>
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
                                      <option key={rev.RevistatHID} value={rev.RevistatHID }>{rev.Emri} {rev.Pershkrimi}</option>)}
                                   </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="EventetHId">
                                   <Form.Label>Eventi</Form.Label>
                                   <Form.Control as="select">
                                      {this.state.even.map(eve=>
                                      <option key={eve.EventetHId} value={eve.EventetHId}>{eve.Emri} {eve.Koha}</option>)}
                                   </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="KategoriaHID ">
                                   <Form.Label>Kategoria</Form.Label>
                                   <Form.Control as="select">
                                      {this.state.kats.map(kat=>
                                      <option key={kat.KategoriaHID} value={kat.KategoriaHID}>{kat.KategoriaHID}</option>)}
                                   </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Button  variant="primary" type="submit">
                                        Update Librin e Huaj
                                    </Button>
                                </Form.Group>
                            </Form>
                               
                           
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