import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form, Image} from 'react-bootstrap';


export class EditLibratShqip extends Component{
    constructor(props){
        super(props);
        this.state={kats:[], auto:[], publ:[], revi:[], even:[]};
        this.submitLibratShqip=this.submitLibratShqip.bind(this);
        this.fotoLibriSelect=this.fotoLibriSelect.bind(this);
    }

    Foto_Sh = "anonymous.png";
    image = process.env.REACT_APP_PHOTOPATH+this.Foto_Sh;

    refreshList(){
        fetch(process.env.REACT_APP_API+'kategoritelibratshqip')
        .then(response=>response.json())
        .then(data=>{
            this.setState({kats:data});
        });
    }

    refreshList1(){
        fetch(process.env.REACT_APP_API+'autoretshqip')
        .then(response=>response.json())
        .then(data=>{
            this.setState({auto:data});
        });
    }

    refreshList2(){
        fetch(process.env.REACT_APP_API+'publicistetshqip')
        .then(response=>response.json())
        .then(data=>{
            this.setState({PushSubscriptionOptions:data});
        });
    }

    refreshList3(){
        fetch(process.env.REACT_APP_API+'revistatshqip')
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

    submitLibratShqip(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'libratshqip',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                //'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify({
                LibratShId:event.target.LibratShId.value,
                Titulli:event.target.Titulli.value,
                Foto_Sh:this.Foto_Sh,
                Pershkrimi_Librit_Shqip:event.target.Pershkrimi_Librit_Shqip.value,
                ISBN_Librit_Shqip :event.target.ISBN_Librit_Shqip .value,
                AutoriID :event.target.AutoriID .value,
                KategoriaID:event.target.KategoriaID.value,
                PublicistiID :event.target.PublicistiID .value,
                RevistaID :event.target.RevistaID .value,
                EventiID :event.target.EventiID .value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Ka ndodhur nje gabim');
        })
        {window.location.href="/LibratShqip"}
    }


    fotoLibriSelect(event){
        event.preventDefault();
        this.Foto_Sh=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'libratshqip/SaveFotoLibratShqip',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.image=process.env.REACT_APP_PHOTOPATH+result;
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
                            Update Librin
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.submitLibratShqip}>
                                <Form.Group controlId="LibratShId ">
                                        <Form.Control type="text" name="LibratShId" required hidden defaultValue={this.props.libid} placeholder="LibratShId" />
                                    </Form.Group>
                                    <Form.Group controlId="Titulli">
                                        <Form.Label>Titulli</Form.Label>
                                        <Form.Control type="text" name="Titulli" required placeholder="Titulli" defaultValue={this.props.tit}/>
                                    </Form.Group>
                                    <Form.Group controlId="Foto_Sh">
                                        <Form.Label>Foto</Form.Label><br/>
                                        <Image width="150px" height="150px" src={process.env.REACT_APP_PHOTOPATH+this.props.foto} />
                                        <input onChange={this.fotoLibriSelect} type="File" name="Foto" className="form-control"/>
                                    </Form.Group>
                                    <Form.Group controlId="Pershkrimi_Librit_Shqip">
                                        <Form.Label>Pershkrimi Librit</Form.Label>
                                        <Form.Control as="textarea" name="Pershkrimi_Librit_Shqip" required placeholder="Pershkrimi Librit" defaultValue={this.props.persh}/>
                                    </Form.Group>
                                    <Form.Group controlId="ISBN_Librit_Shqip">
                                        <Form.Label>ISBN Librit</Form.Label>
                                        <input type="number" name="ISBN_Librit_Shqip" required placeholder="Isbn Librit" className="form-control" defaultValue={this.props.link}/>
                                    </Form.Group>
                                    <Form.Group controlId="AutoriID">
                                       <Form.Label>Autori Kryesor</Form.Label>
                                       <Form.Control as="select">
                                          {this.state.auto.map(aut=>
                                          <option key={aut.AutoretShId} value={aut.AutoretShId}>{aut.Emri} {aut.Mbiemri}</option>)}
                                       </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="KategoriaID">
                                       <Form.Label>Kategoria</Form.Label>
                                       <Form.Control as="select">
                                          {this.state.kats.map(kat=>
                                          <option key={kat.KategoriaShId} value={kat.KategoriaShId}>{kat.Kategoria}</option>)}
                                       </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="PublicistiID ">
                                       <Form.Label>Publicisti</Form.Label>
                                       <Form.Control as="select">
                                          {this.state.publ.map(pub=>
                                          <option key={pub.PublicistetID} value={pub.PublicistetID}>{pub.Emri} {pub.Mbiemri}</option>)}
                                       </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="RevistaID">
                                       <Form.Label>Revista</Form.Label>
                                       <Form.Control as="select">
                                          {this.state.revi.map(rev=>
                                          <option key={rev.RevistatShID} value={rev.RevistatShID}>{rev.Emri} {rev.Pershkrimi}</option>)}
                                       </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="EventiID">
                                       <Form.Label>Eventi</Form.Label>
                                       <Form.Control as="select">
                                          {this.state.even.map(eve=>
                                          <option key={eve.EventetId} value={eve.EventetId}>{eve.Emri} {eve.Koha}</option>)}
                                       </Form.Control>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Librin Shqip
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