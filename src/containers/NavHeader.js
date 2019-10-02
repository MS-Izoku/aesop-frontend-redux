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
      <Navbar bg="info" expand="lg">
        <Navbar.Brand href="/">AESOP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/stories">Story Hub</Nav.Link>
            {/* <Nav.Link href="/characters">Character Hub</Nav.Link> */}
            <NavHeaderStorySelect />
          </Nav>
          <Form inline>
            {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button> */}
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavHeader;
