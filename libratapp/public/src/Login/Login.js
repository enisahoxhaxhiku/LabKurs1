
import React,{Component} from "react";
import {Helmet} from "react-helmet";
import {Button,Form,Card} from 'react-bootstrap';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';
import { Formik, Field, ErrorMessage } from 'formik';

export class Login extends Component{


    constructor(props){
        super(props);
        this.submitLogin=this.submitLogin.bind(this);
    }

    validationSchema() {
        return Yup.object().shape({
            Username: Yup.string()
            .required('Emri duhet te plotesohet.')
            .matches(
                /^[A-Za-z .]{3,15}$/,
                "Emri te permbaj vetem Shkronja dhe te jete me i gjate se 2 shkronja dhe jo me i gjate se 15 shkronja."
              ),
              Password: Yup.string()
            .required('Password duhet te plotesohet.')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                "Passwordi duhet te filloj me shkronje te madhe, Te kete karakter te veqante dhe te permbaj numra, te jete me i gjate se 8 Shkronja"
            ),
        });
      }

    submitLogin(event){
        event.preventDefault();
        fetch('http://localhost:5093/api/account/login',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type' : 'application/json',
                "Access-Control-Allow-Origin" : "*", 
                "Access-Control-Allow-Credentials" : true             
            },
            body:JSON.stringify({
                Username:event.target.Username.value,
                Password:event.target.Password.value
            })
        }).then((response)=>{
            response.json().then((result)=>{
               console.warn("result",result); 
               localStorage.setItem('token',result.token);
               localStorage.setItem('emri',result.name);
               localStorage.setItem('role',result.Role);

               {window.location.href="/librathuaj"}
            })
        })
        .catch(error => {
          console.log(error);
          
        });
    }

   
    render(){
        const initialValues = {
            Username: '',
            Password: '',
          };
        return(
            <div className="container">
                <Helmet>
                <title>Login</title>
                </Helmet>
             
                

                <Card>
                <Card.Body className="m-auto mt-5 block-example border border-secondary shadow p-3 mb-5 bg-white rounded">
                    <Card.Body>
                    <h6 className="text-center text-primary">Login</h6>
                <Formik
                initialValues={initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.submitLogin}
                >
                    {({ submitLogin, isValid, isSubmitting, dirty }) => (
                    <Form onSubmit={this.submitLogin} className="mt-3 mx-auto" style={{ width: '15rem'}}>
                        <Form.Group controlId="Username">
                            <Form.Label>Emri</Form.Label>
                            <Field type="text" name="Username" required placeholder="Emri" className="form-control" />
                            <ErrorMessage
                            name="Username"
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
                        <Button  disabled={isSubmitting || !dirty || !isValid} variant="primary" type="submit">
                            Log in
                                </Button>
                        </Form.Group>
                        <h6 className="text-center text-black mt-4">Regjistrohu: <strong><Link to="/Registers">Register</Link></strong></h6>
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