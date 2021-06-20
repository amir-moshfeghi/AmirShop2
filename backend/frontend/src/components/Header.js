import React from 'react';
import {Button, Container, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../actions/userActions";
import SearchBox from "./SearchBox";
function Header(props) {
    const dispatch = useDispatch()
    const logOutHandler =()=>{
        dispatch(logOut())
    }
    const userLogin = useSelector(state =>state.userLogin)
    const {userInfo} = userLogin
    return (
        <header>
            <Navbar bg="dark" expand="lg" variant='dark' collapseOnSelect>
                <Container>


                <LinkContainer to='/'>
                <Navbar.Brand>Amirshop</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <SearchBox />

                    <Nav className="mr-auto">
                        <LinkContainer to='/cart'>
                            <Nav.Link><i className='fas fa-shopping-cart'></i>cart</Nav.Link>

                        </LinkContainer>
                        {userInfo ? (
                            <NavDropdown id='username' title={userInfo.name}>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>
                                        profile

                                    </NavDropdown.Item>


                                </LinkContainer>
                                <NavDropdown.Item onClick={logOutHandler}>
                                    log out

                                </NavDropdown.Item>

                            </NavDropdown>
                        ) :(
                            <LinkContainer to='/login'>
                                <Nav.Link><i className='fas fa-user'></i> Login</Nav.Link>
                            </LinkContainer>
                        ) }
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;