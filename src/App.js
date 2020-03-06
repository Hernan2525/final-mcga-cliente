import React from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";

function App(props) {
  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">MCGA</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
         <Nav pullRight>
           <LinkContainer to="/signup">
             <NavItem>Registrarse</NavItem>
           </LinkContainer>
           <LinkContainer to="/login">
             <NavItem>Iniciar Sesión</NavItem>
           </LinkContainer>
         </Nav>
       </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;
