import React, { useState, Fragment } from 'react'
import AddClientForm from './AddClientForm'
import EditClientForm from './EditClientForm'
import ClientTable from './ClientTable'
import './Admin.css'
import axios from 'axios'
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";

const App = () => {

	const clientsData = [];

	window.onload = function (){
		fetch('http://localhost:4000/getclients')
      .then(res => {
          console.log(res);
          return res.json()
       })
      .then(clients => {
          console.log(clients);
          setClients([...clients])
       });
	}



	const initialFormState = { id: null, cuit: '', nombre: '', telefono: '' }

	// Setting state
	const [ clients, setClients ] = useState(clientsData)
	const [ currentClient, setCurrentClient ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	// CRUD operations
	const addClient = client => {
		client.id = clients.length + 1
		axios.post('http://localhost:4000/addclient', {
			id: client.id,
			cuit: client.cuit,
			nombre: client.nombre,
			telefono: client.telefono
		})
		setClients([ ...clients, client ])
	}

	const deleteClient = id => {
		setEditing(false)

		axios.post('http://localhost:4000/remclient', {
			id: id
		})

		setClients(clients.filter(client => client.id !== id))
	}

	const updateClient = (id, updatedClient) => {
		setEditing(false)

		axios.post('http://localhost:4000/modclient', {
			id: id,
			cuit: updatedClient.cuit,
			nombre: updatedClient.nombre,
			telefono: updatedClient.telefono
		})

		setClients(clients.map(client => (client.id === id ? updatedClient : client)))
	}

	const editRow = client => {
		setEditing(true)

		setCurrentClient({ id: client.id, cuit: client.cuit, nombre: client.nombre, telefono: client.telefono })
	}

	const closeSession = async () => {
      localStorage.clear();
      window.location.reload();
    }

	return (
    <section className="Admin">
    <Navbar fluid collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link className="h4" to="/Admin">Final MCGA</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
       <Nav pullRight>
           <NavItem><button className="btn btn-secondary" onClick={closeSession}>Cerrar Sesión</button></NavItem>
       </Nav>
     </Navbar.Collapse>
    </Navbar>
		<div>
			<h3 className="text-info">Gestionar Clientes</h3>
			<br/>
			<div>
				<div>
					{editing ? (
						<Fragment>
							<h4 className="text-info">Editar Cliente</h4>
							<EditClientForm
								editing={editing}
								setEditing={setEditing}
								currentClient={currentClient}
								updateClient={updateClient}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h4 className="text-info">Agregar Cliente</h4>
							<AddClientForm addClient={addClient} />
						</Fragment>
					)}
				</div>
				<br/>
				<div>
					<h4 className="text-info">Clientes</h4>
					<ClientTable clients={clients} editRow={editRow} deleteClient={deleteClient} />
				</div>
			</div>
		</div>
    </section>
	)
}

export default App
