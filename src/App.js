import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import Customer from "./components/customer.component";
// import Products from "./components/products.component";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from './helpers/history';
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = { currentCustomer: undefined, };

    history.listen((location) => {
      props.dispatch(clearMessage());
    });
  }

  componentDidMount() {
    const customer = this.props.customer;
    if (customer) {
      this.setState({ currentCustomer: customer });
    }
    EventBus.on("logout", () => { this.logOut(); });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({ currentCustomer: undefined, });
  }

  render() {
    const { currentCustomer } = this.state;

    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark" style={{ backgroundColor: "#23272B" }}>

            {currentCustomer ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item"><a href="/login" className="nav-link" onClick={this.logOut}> Salir</a></li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item"><Link to={"/login"} className="nav-link">Iniciar sesión</Link></li>
                <li className="nav-item"><Link to={"/register"} className="nav-link">Registrarse</Link></li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/register"]} component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/customer" component={Customer} />
              {/* <Route exact path="/products" component={Products} /> */}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { customer } = state.auth;
  return { customer, };
}

export default connect(mapStateToProps)(App);