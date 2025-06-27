import React, {useContext, useState} from "react";
import {observer} from 'mobx-react-lite'
import { Button, Card, Container, Form, FormControl, Row, Col } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import 'bootstrap/dist/css/bootstrap.min.css';
import { login, registration } from "../http/userApi";
import { Context } from "../index";

const Auth = observer ( () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const click = async () => {
        try {
            let data;
            if (isLogin){
                data = await login(email,password)
            } else {
                data = await registration(email,password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
            
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <Container 
        className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin?"Authorization":"Registration"}</h2>
                <Form className="d-flex flex-column">
                    <FormControl className="mt-2" placeholder="Enter your email" value = {email} onChange={e=>{setEmail(e.target.value)}}/>
                    <FormControl className="mt-2" placeholder="Enter your password" value = {password} onChange={e=>{setPassword(e.target.value)}} type="password"/>
                   <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin?
                        <Col>
                            Has no account? <NavLink to={REGISTRATION_ROUTE}>Registration</NavLink>
                        </Col>:
                        <Col>
                            Has account? <NavLink to={LOGIN_ROUTE}>Log in</NavLink>
                        </Col>}
                        <Col className="text-end">
                            <Button variant="outline-success" onClick={click}>{isLogin?"Log in":"Registrate"}</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
})

export default Auth;