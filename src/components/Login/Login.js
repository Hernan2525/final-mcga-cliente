import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { connect } from 'react-redux'
import { onChangeEmail, onChangePassword, handleLogin } from '../../Store'

const Login = (props) => {

var errorPopup;

const handleLogin = async () => {
  const response = await props.handleLogin(props.email, props.password)
  console.log(response)
  if(response.type === 'LOGIN_SUCCESS') {
    props.history.push('/Admin');
    console.clear();
    window.location.reload();
  }
  else
  {
  	errorPopup = "YES";
  	console.log(errorPopup)
  }
 }

  return (
    <div className="Login">
      <form onSubmit={handleLogin}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={props.email}
            onChange={props.onChangeEmail}
            placeholder="Email"
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={props.password}
            onChange={props.onChangePassword}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    email: state.email,
    password: state.password,
    logged: state.logged,
    message: state.message
  }
}

const mapDispatchToProps = {
  onChangeEmail,
  onChangePassword,
  handleLogin,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
