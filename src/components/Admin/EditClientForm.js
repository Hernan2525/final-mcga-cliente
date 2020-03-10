import React, { useState, useEffect } from 'react'
import styles from './Admin.css'

const EditClientForm = props => {
  const [ client, setClient ] = useState(props.currentClient)

  useEffect(
    () => {
      setClient(props.currentClient)
    },
    [ props ]
  )

  const handleInputChange = event => {
    const { name, value } = event.target

    setClient({ ...client, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updateClient(client.id, client)
      }}
    >
      <label>Cuit del Cliente</label>
      <input type="text" name="cuit" value={client.cuit} onChange={handleInputChange} />&nbsp;&nbsp;
      <label>Nombre del Cliente</label>
      <input type="text" name="nombre" value={client.nombre} onChange={handleInputChange} />&nbsp;&nbsp;
      <label>Teléfono</label>
      <input type="text" name="telefono" value={client.telefono} onChange={handleInputChange} />&nbsp;&nbsp;
      <button className="btn btn-primary">Actualizar Cliente</button>&nbsp;&nbsp;
      <button onClick={() => props.setEditing(false)} className="btn btn-danger">
        Cancelar
      </button>
    </form>
  )
}

export default EditClientForm
