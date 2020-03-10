import React, {Component} from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { connect } from 'react-redux'
import { onChangeEmail, onChangePassword, handleLogin } from '../../Store'

class Login extends Component {
  constructor(props) {
      super(props);

      this.state = {
          email: "",
          password: ""
      };
  }

  onChangeEmail = event => {
    this.setState({
      [event.target.name]: event.target.value
      });
  }

  onChangePassword = event => {
    this.setState({
      [event.target.name]: event.target.value
      });
  }

    handleSubmit = event => {
      event.preventDefault()
      this.props.handleLogin(this.state)
    }

render(){

  return (
    <div className="Login">
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.onChangeEmail}
            placeholder="Email"
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.onChangePassword}
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
}

const mapStateToProps = (state) => {
  return {
    email: state.email,
    password: state.password,
    logged: state.logged,
    message: state.message
  }
}

const mapDispatchToProps = dispatch => ({
  handleLogin: userInfo => dispatch(handleLogin(userInfo)),
  onChangeEmail: userInfo => dispatch(onChangeEmail(userInfo)),
  onChangePassword: userInfo => dispatch(onChangePassword(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
