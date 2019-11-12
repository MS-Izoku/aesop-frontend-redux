import React, { Component } from "react";
import HeaderAvatar from "../components/HeaderAvatar.js";
import NavHeaderStorySelect from "../components/NavHeaderStorySelect";
import { NavLink } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

class NavHeader extends Component {
  render() {
    return (
      <Navbar className="red-1 custom-page-header affix" expand="lg" data-spy="affix">
        <Navbar.Brand href="/" >AESOP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="main-dark-text"/>
        <Navbar.Collapse id="basic-navbar-nav" className="main-dark-text">
          <Nav className="mr-auto">
            <Nav.Link href="/stories">Story Hub</Nav.Link>
            <NavHeaderStorySelect />
          </Nav>
          <Form inline>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavHeader;
