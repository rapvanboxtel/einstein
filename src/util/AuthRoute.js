// Import React and React Router DOM to use components and link pages
import React from "react";
import { Route, Redirect } from "react-router-dom";

// Import Redux to connect React component to Redux store
import { connect } from "react-redux";

// Import PropTypes to typecheck a component
import PropTypes from "prop-types";

// Get data from user and check if user is authenticated
const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  // If user is authenticated and goes to /login or /signin it redirects the user back to /home
  <Route
    {...rest}
    render={props =>
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

// Select authenticated from the store to export to other files later
const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

// Typcheck component user
AuthRoute.propTypes = {
  user: PropTypes.object
};

// Export data
export default connect(mapStateToProps)(AuthRoute);
