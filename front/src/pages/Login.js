import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { login } from "../services/auth";
import api from "../services/api";

//import Loader from "../components/Loader";

class Login extends Component {
  state = {
    email: "",
    password: "",
    data: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post(`/auth`, {
          email,
          password
        });
        login(response.data.token);
        this.props.history.push("/admin");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T"
        });
      }
    }
  };

  render() {
    console.log(this.state.error);
    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Fulano's blog
            </Link>
            <button className="navbar-toggler" type="button">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/admin">
                    Admin
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className=" mt-5 container-fluid login-container i-am-centered">
          <div className="row pt-5">
            <div className="col-md-12 login-form-1">
              <h3>Faça seu login</h3>
              <form onSubmit={this.handleSignIn}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Seu email *"
                    onChange={e => this.setState({ email: e.target.value })}
                    name="email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Sua senha *"
                    onChange={e => this.setState({ password: e.target.value })}
                    name="password"
                  />
                </div>
                <div className="mb-3">
                  {this.state.error && this.state.error !== ""
                    ? this.state.error
                    : null}
                </div>
                <div className="form-group text-center">
                  <button type="submit" className="btnSubmit">
                    Login
                  </button>
                </div>
                <div className="form-group">
                  <a href="/" className="ForgetPwd">
                    Esqueceu a senha?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default withRouter(Login);
