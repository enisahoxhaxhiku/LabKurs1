import React,{Component} from "react";
import {Helmet} from "react-helmet";
import * as Yup from 'yup';
import {Link} from 'react-router-dom';
import {Button,Form, Card} from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';

export class Registers extends Component{
    constructor(props){
        super(props);
        this.state = {
            account: []
        }
        this.submitRegister=this.submitRegister.bind(this);
    }

    validationSchema() {
        return Yup.object().shape({
            Username: Yup.string()
            .required('Emri duhet te plotesohet.')
            .matches(
                /^[A-Za-z .]{3,15}$/,
                "Emri te permbaj vetem Shkronja dhe te jete me i gjate se 2 shkronja dhe jo me i gjate se 15 shkronja."
              ),
            Email: Yup.string()
            .required('Email duhet te plotesohet')
            .matches(
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                "Email duhet te jete i shkruar ne rregull."
              ),
              Password: Yup.string()
            .required('Password duhet te plotesohet.')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                "Passwordi duhet te filloj me shkronje te madhe, Te kete karakter te veqante dhe te permbaj numra, te jete me i gjate se 8 Shkronja"
            ),
        });
      }

    submitRegister(event){

        event.preventDefault();
        fetch(process.env.REACT_APP_API+'account/register',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Username:event.target.Username.value,
                Email:event.target.Email.value,
                Password:event.target.Password.value
            })
        })
        .then(res => res.json())
  .then(data => alert(data.Message))
  .catch(err => {
    alert(err.Message);
  })
        
    }
    
    render(){
        const initialValues = {
            Username: '',
            Email: '',
            Password: '',
          };
        return(
            <div className="container">
                <Helmet>
                <title>Register</title>
                </Helmet>
             
                

                <Card>
                <Card.Body className="m-auto mt-5 block-example border border-secondary shadow p-3 mb-5 bg-white rounded">
                    <Card.Body>
                    <h6 className="text-center text-primary">Register</h6>
                <Formik
                initialValues={initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.submitRegister}
                >
                    {({ submitRegister, isValid, isSubmitting, dirty }) => (
                    <Form onSubmit={this.submitRegister} className="mt-3 mx-auto" style={{ width: '15rem'}}>
                        <Form.Group controlId="Username">
                            <Form.Label>Emri</Form.Label>
                            <Field type="text" name="Username" required placeholder="Emri" className="form-control" />
                            <ErrorMessage
                            name="Username"
                            component="div"
                            className="text-danger"
                            />
                        </Form.Group>
                        <Form.Group controlId="Email">
                            <Form.Label>Email</Form.Label>
                            <Field type="text" name="Email" required placeholder="Email" className="form-control" />
                            <ErrorMessage
                            name="Email"
                            component="div"
                            className="text-danger"
                            />
                        </Form.Group>
                        <Form.Group controlId="Password">
                            <Form.Label>Password</Form.Label>
                            <Field type="Password" name="Password" required placeholder="Password" className="form-control" />
                            <ErrorMessage
                            name="Password"
                            component="div"
                            className="text-danger"
                            />
                        </Form.Group>
                        <Form.Group className="mt-3 text-center">
                        <Button  disabled={isSubmitting || !dirty || !isValid} onClick={() => {window.location.href="/registers"}} variant="primary" type="submit">
                            Regjistrohu
                                </Button>
                        </Form.Group>
                        <h6 className="text-center text-black mt-4">Llogohu: <strong><Link to="/Login">Login</Link></strong></h6>
                    </Form>
                    )}
                    </Formik>
                    </Card.Body>
                    </Card.Body>
                    </Card>
                           
            </div>
        )
    }
}