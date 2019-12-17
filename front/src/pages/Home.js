import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

export default class Home extends Component {
  state = {
    data: "",
    page: 1
  };

  getData = () => {
    axios
      .get(`http://localhost:3001/api/posts?page=${this.state.page}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          data: response.data
        });
      });
  };
  useBeforeunload = () => {
    localStorage.removeItem("@blog-Token");
  };

  componentDidMount() {
    this.getData();
    this.useBeforeunload();
  }

  prevData = async () => {
    await this.setState({
      page: this.state.page - 1,
      data: ""
    });
    await this.getData();
  };

  nextData = async () => {
    await this.setState({
      page: this.state.page + 1,
      data: ""
    });
    await this.getData();
  };
  render() {
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
        <div className="mt-5">&nbsp;</div>
        {this.state.data && this.state.data !== "" ? (
          this.state.data.docs.map(e => {
            return (
              <div className="container mt-3" key={e._id}>
                <div className="card mb-4">
                  <div className="card-body">
                    <h2 className="card-title">{e.title}</h2>
                    <p className="card-text">{e.description}</p>
                    <p className="card-text">{e.content}</p>
                    {/*<a href="/" className="btn btn-primary">
                        Read More
                      </a>*/}
                  </div>
                  <div className="card-footer text-muted">
                    Postado em <b>{e.createdAt}</b> por <b>{e.user}</b>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <Loader color="black" title="Carregando..." />
        )}
        <div className="container">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <button
                  onClick={this.state.data.hasPrevPage ? this.prevData : null}
                  disabled={!this.state.data.hasPrevPage}
                  className="page-link"
                >
                  Anterior
                </button>
              </li>
              <li className="page-item">
                <button className="page-link" href="/">
                  {this.state.data.page} de {this.state.data.totalPages}
                </button>
              </li>

              <li className="page-item">
                <button
                  onClick={this.state.data.hasNextPage ? this.nextData : null}
                  className="page-link"
                  disabled={!this.state.data.hasNextPage}
                >
                  Próxima
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </Fragment>
    );
  }
}
