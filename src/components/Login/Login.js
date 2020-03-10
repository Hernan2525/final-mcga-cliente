import React from 'react'
import { connect } from 'react-redux'
import { onChangeEmail, onChangePassword, handleLogin } from '../../Store'
import './Login.css'

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
    <div class="container">
      <div class="row">
        <div class="col-md-3">
      </div>
      <div class="col-md-6">
        <div class="panel panel-primary">
          <div class="panel-heading">
          <h3 class="panel-title">Login</h3>
        </div>
        <div class="panel-body">
        <form>
          <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input type="email" class="form-control" width="48"
          name="email" onChange={props.onChangeEmail}
          defaultValue={props.email} placeholder="Email"/>
          </div>
          <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" name="password"
          onChange={props.onChangePassword} value={props.password} placeholder="Contraseña"/>
          </div>
          <button type="button" class="btn btn-primary" onClick={handleLogin}>Iniciar Sesión</button>
          </form>
          </div>
        </div>
      </div>
    <div class="col-md-3">
    </div>
  </div>
</div>

  )
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
