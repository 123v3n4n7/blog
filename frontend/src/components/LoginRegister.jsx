import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";
import {authAction} from "../actions";

class LoginRegister extends Component {

  state = {
    username: "",
    password: "",
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  render() {
      if(this.props.isAuthenticated){
        return <Redirect to ="/" />
      }
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Вход</legend>
          {this.props.errors.length > 0 && (
            <ul>
              {this.props.errors.map(error => (
                <li key={error.field}>{error.message}</li>
              ))}
            </ul>
          )}
          <p>
            <label htmlFor="username">Имя пользователя</label>
            <input
              type="text" id="username"
              onChange={e => this.setState({username: e.target.value})} />
          </p>
          <p>
            <label htmlFor="password">Пароль</label>
            <input
              type="password" id="password"
              onChange={e => this.setState({password: e.target.value})} />
          </p>
          <p>
            <button type="submit">Вход</button>
          </p>

          <p>
            Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
          </p>
        </fieldset>
      </form>
    )
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.authReducer.errors) {
    errors = Object.keys(state.authReducer.errors).map(field => {
      return {field, message: state.authReducer.errors[field]};
    });
  }
  return {
    errors,
    isAuthenticated: state.authReducer.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      return dispatch(authAction.login(username, password));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegister);