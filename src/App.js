// Import React and React Router DOM to use components and link pages
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import styling from App
import "./App.css";

// Import Material UI library for styling the application
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Import jwt-decode library to decode a token for authenticating users
import jwtDecode from "jwt-decode";

// Import Redux library to read/store data from the database
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

// Import Axios to perform GET and POST requests from the database
import axios from "axios";

// Import React components and utility
import Navbar from "./components/layout/Navbar";
import themeObject from "./util/theme";
import AuthRoute from "./util/AuthRoute";

// Import created pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";
import profile from "./pages/profile";

// Create Material UI theme
const theme = createMuiTheme(themeObject);

// Connect with database
axios.defaults.baseURL =
  "https://europe-west1-einstein-e0df9.cloudfunctions.net/api";

// Create token that gets the authentication token if available
const token = localStorage.FBIdToken;

if (token) {
  // Decode the token using the jwt-decode library
  const decodedToken = jwtDecode(token);
  // If token is expired then logout the user and redirect to login.
  // Otherwise give the user an authenticated status and get the data of the user.
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

// App Component that routes all four pages
// You can acces all four pages if not logged in
// When logged in you can't acces /login and /signup (because you are already logged in)
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>

          <Router>
            <Navbar />
            <div className="container-login">
              <Switch>
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
              </Switch>
            </div>
            <div className="container-app">
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/users/:handle" component={user} />
                <Route
                  exact
                  path="/users/:handle/scream/:screamId"
                  component={user}
                />
                <Route exact path="/user/:handle" component={profile} />
              </Switch>
            </div>
          </Router>

        </Provider>
      </MuiThemeProvider>
    );
  }
}

// Export data
export default App;
