import React from "react";
import { Button, Card, Container, Form, FormControl, Row, Col } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import 'bootstrap/dist/css/bootstrap.min.css';

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE


    return (
        <Container 
        className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin?"Authorization":"Registration"}</h2>
                <Form className="d-flex flex-column">
                    <FormControl className="mt-2" placeholder="Enter your email"/>
                    <FormControl className="mt-2" placeholder="Enter your password"/>
                   <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin?
                        <Col>
                            Has no account? <NavLink to={REGISTRATION_ROUTE}>Registration</NavLink>
                        </Col>:
                        <Col>
                            Has account? <NavLink to={LOGIN_ROUTE}>Log in</NavLink>
                        </Col>}
                        <Col className="text-end">
                            <Button variant="outline-success">{isLogin?"Log in":"Registrate"}</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
}

export default Auth;