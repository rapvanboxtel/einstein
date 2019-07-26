// Import React and React Router DOM to use components and link pages
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

// Import Redux library to read/store data from the database
import { connect } from "react-redux";

// Import PropTypes to typecheck a component
import PropTypes from "prop-types";

// Import React components and utility
import MyButton from "../../util/MyButton";
import PostScream from "../scream/PostScream";
import Notifications from "./Notifications";

// Import Material UI library for styling the application
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

// Import Material UI library for icons
import HomeIcon from "@material-ui/icons/Home";

//Navbar component to define when the certain Navbar will display
class Navbar extends Component {
  render() {
    // Check if user is logged in
    const { authenticated } = this.props;
    return (
      // If user is logged in show a Navbar
      // Otherwise don't
      <nav>
        {authenticated ? (
          <AppBar>
            <Toolbar className="nav-container">
              <Fragment>
                <PostScream />
                <Link to="/">
                  <MyButton tip="Home">
                    <HomeIcon />
                  </MyButton>
                </Link>
                <Notifications />
              </Fragment>
            </Toolbar>
          </AppBar>
        ) : (
          <p />
        )}
      </nav>
    );
  }
}

// Typcheck component authenticated
Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

// Select authenticated from the store to export to other files later
const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

// Export data
export default connect(mapStateToProps)(Navbar);
