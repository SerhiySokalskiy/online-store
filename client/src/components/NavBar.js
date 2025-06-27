import React from "react";
import { Context } from "..";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import {Button} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import {useNavigate} from 'react-router-dom';

const NavBar = observer(() => {
    const {user} = React.useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
      user.setUser({})
      user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
            <NavLink style={{color:'white'}} to={SHOP_ROUTE}>TechnoStore</NavLink>
          {user.isAuth?
          <Nav className="ml-auto">
            <Button variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)}>Admin panel</Button>
            <Button variant={"outline-light"} className="ms-4" onClick={()=>logOut()}>Log out</Button>
          </Nav>
          :
          <Nav className="ml-auto">
            <Button variant="outline-light" onClick={ () => navigate(LOGIN_ROUTE) }>Log in</Button>
          </Nav>}
        </Container>
      </Navbar>
    )
})

export default NavBar;