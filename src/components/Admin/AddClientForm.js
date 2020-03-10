import React, { useState } from 'react'
import './Admin.css'

const AddClientForm = props => {
	const initialFormState = { id: null, cuit: '', nombre: '', telefono: '' }
	const [ client, setClient ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setClient({ ...client, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!client.cuit || !client.nombre || !client.telefono) return

				props.addClient(client)
				setClient(initialFormState)
			}}
		>
				<label>Cuit del Cliente:</label>
				<input type="text" name="cuit" value={client.cuit} onChange={handleInputChange} />&nbsp;&nbsp;
				<label>Nombre del Cliente:</label>
				<input type="text" name="nombre" value={client.nombre} onChange={handleInputChange} />&nbsp;&nbsp;
				<label>Teléfono:</label>
				<input type="text" name="telefono" value={client.telefono} onChange={handleInputChange} />&nbsp;&nbsp;
				<button className="btn btn-success">Agregar Cliente</button>
		</form>

	)
}

export default AddClientForm
