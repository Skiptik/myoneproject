import { Container, Navbar, Col } from "react-bootstrap";
import styles from './Navbar.module.scss';
import React from 'react';
import Search from "./Search";
import NavCustom from "./Nav";
import Brand from "./Brand";

const NavbarComponent = () => {

    return(
        <Container>
            <Navbar className={`${styles.navbar} z-4`} expand="lg">
                <Col xxl="2">
                    <Brand />
                </Col>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <NavCustom />
                    <Search search="species/list?search="/>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
}

export default NavbarComponent;
