import React,{Component} from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";

export class PageNotFound extends Component{
    render(){
        return(
            <div className="container mt-4">
                <Helmet>
                <title>Page Not Found</title>
                </Helmet>
               <h1 className="text-primary d-flex justify-content-center">404</h1>
               <h2 className="text-primary d-flex justify-content-center">Page Not Found</h2>
               <Link className="nav-link d-flex justify-content-center" to="/">
               <Button className="mt-4" variant="primary">
                    Kthehu Ne Faqe   
                </Button>
                </Link>
            </div>
        )
    }
}