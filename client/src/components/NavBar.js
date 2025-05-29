import React from "react";
import { Context } from "..";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";
import {Button} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

const NavBar = observer(() => {
    const {user} = React.useContext(Context);
    return (
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
            <NavLink style={{color:'white'}} to={SHOP_ROUTE}>TechnoStore</NavLink>
          {user.isAuth?
          <Nav className="ml-auto">
            <Button variant={"outline-light"}>Admin panel</Button>
            <Button variant={"outline-light"} className="ms-4">Log out</Button>
          </Nav>
          :
          <Nav className="ml-auto">
            <Button variant="outline-light" onClick={ () => user.setIsAuth(true) }>Log in</Button>
          </Nav>}
        </Container>
      </Navbar>
    )
})

export default NavBar;