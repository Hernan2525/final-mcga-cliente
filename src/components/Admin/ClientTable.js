import React from 'react'
import './Admin.css'
import { Table } from "react-bootstrap";

const clientTable = props => (
  <Table striped bordered hover>
      <thead>
        <tr className="titulo">
          <th>Id</th>
          <th>Cuit</th>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
      {props.clients.length > 0 ? (
        props.clients.map(client => (
        <tr>
          <td>{client.id}</td>
          <td>{client.cuit}</td>
          <td>{client.nombre}</td>
          <td>{client.telefono}</td>
          <td>
            <button onClick={() => {props.editRow(client)}} className="btn btn-primary">Editar</button>	&nbsp;
            <button onClick={() => props.deleteClient(client.id)} className="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={5}>No hay clientes cargados</td>
      </tr>
    )}
        </tbody>
    </Table>
)

export default clientTable
