import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch
} from "react-router-dom";
import facade from "./apiFacade";
import MovieInfo from "./components/MovieInfo";
import MovieAll from "./components/MovieAll";
import MovieCount from "./components/MovieCount";
import Home from "./components/Home";
import {
  Button,
  InputGroup,
  FormControl,
  Form,
  Container
} from "react-bootstrap";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  login = evt => {
    evt.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };
  onChange = evt => {
    this.setState({ [evt.target.id]: evt.target.value });
  };
  render() {
    return (
      <Container>
        <Form style={{ marginBottom: 50 }} onSubmit={evt => this.login(evt)}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              onChange={this.onChange}
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={this.onChange}
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <MovieInfo />
      </Container>
    );
  }
}
class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = { dataFromServer: "Fetching!!" };
  }
  componentDidMount() {
    facade.fetchData().then(res => this.setState({ dataFromServer: res.msg }));
  }
  render() {
    return (
      <div>
        <Header />

        <Content />
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }
  logout = () => {
    facade.logout();
    this.setState({ loggedIn: false });
  }; //TODO
  login = (user, pass) => {
    facade.login(user, pass).then(res => this.setState({ loggedIn: true }));
  }; //TODO
  render() {
    return (
      <Container>
        {!this.state.loggedIn ? (
          <LogIn login={this.login} />
        ) : (
          <Router>
            <div>
              <LoggedIn />
              <Button variant="secondary" onClick={this.logout}>
                Logout
              </Button>
            </div>
          </Router>
        )}
      </Container>
    );
  }
}
export default App;

const Header = () => {
  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/MovieInfo">
          Movies
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/MovieAll">
          All Movies
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/MovieCount">
          Movie Count
        </NavLink>
      </li>
    </ul>
  );
};

const Content = () => {
  return (
    <Switch>
      <Route exact path="/">
        {" "}
        <Home />{" "}
      </Route>
      <Route path="/MovieInfo">
        {" "}
        <MovieInfo />{" "}
      </Route>

      <Route path="/MovieAll">
        {" "}
        <MovieAll />{" "}
      </Route>
      <Route path="/MovieCount">
        {" "}
        <MovieCount />{" "}
      </Route>
    </Switch>
  );
};
