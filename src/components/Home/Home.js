import React from "react";
import "./Home.css";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { Table } from "react-bootstrap";

class Home extends React.Component {

  constructor() {
    super();
    this.state = {clients: []};
  }

  componentDidMount() {
    fetch('http://localhost:4000/getclients')
      .then(res => {
          console.log(res);
          return res.json()
       })
      .then(clients => {
          console.log(clients);
          this.setState({ clients })
       });
  }

  render() {

    return (
        <section className="Home">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link className="h4" to="/">Final MCGA</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
           <Nav pullRight>
             <LinkContainer to="/login">
               <NavItem><button className="btn btn-secondary">Iniciar Sesión</button></NavItem>
             </LinkContainer>
           </Nav>
         </Navbar.Collapse>
        </Navbar>
        <h3 className="text-info">Gestion de Clientes</h3>
        <div>
        <Table striped bordered hover>
            <thead>
              <tr className="titulo">
                <th>Id</th>
                <th>Cuit</th>
                <th>Nombre</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
            {this.state.clients.map(client => (
              <tr key={client.cuit}>
                <td>{client.id}</td>
                <td>{client.cuit}</td>
                <td>{client.nombre}</td>
                <td>{client.telefono}</td>
              </tr>
              ))}
              </tbody>
          </Table>
        </div>
        </section>
    )

  }

}


export default Home
