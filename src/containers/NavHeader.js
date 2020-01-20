import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import NavHeaderProfile from '../components/NavHeaderProfile'

class NavHeader extends Component {
  render() {
    return (
      <Navbar className="red-1 affix pb-0" expand="lg" data-spy="affix">
        <Navbar.Brand href="/" >AESOP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="main-dark-text"/>
        <NavHeaderProfile />
        <Navbar.Collapse id="basic-navbar-nav" className="main-dark-text">
          <Form inline>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavHeader;
