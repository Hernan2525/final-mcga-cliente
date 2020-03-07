import React from "react";
import "./Home.css";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem } from "react-bootstrap";

class Home extends React.Component {

  render() {

    return (
        <section className="Home">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Final MCGA</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
           <Nav pullRight>
             <LinkContainer to="/login">
               <NavItem>Login</NavItem>
             </LinkContainer>
           </Nav>
         </Navbar.Collapse>
        </Navbar>
        <div className="lander">
        <h2>Gestión de Clientes</h2>
        </div>
        </section>
    )

  }

}


export default Home
