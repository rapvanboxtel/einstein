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
import withStyles from "@material-ui/core/styles/withStyles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import NotificationsIcon from "@material-ui/icons/NotificationsNone";
import EventIcon from "@material-ui/icons/EventNote";
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/PersonOutline";
import PeopleIcon from "@material-ui/icons/PeopleOutline";
import DashboardIcon from "@material-ui/icons/DashboardOutlined";

// Import Material UI library for icons
import HomeIcon from "@material-ui/icons/Home";

const styles = {
  bottomNav: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    zIndex: "999",
    borderTop: "1px solid #DADDE1",
    height: 70
  },
  navAction: {
    minWidth: "40px",
    maxWidth: "70px"
  }
};

//Navbar component to define when the certain Navbar will display
class Navbar extends Component {
  render() {
    // Check if user is logged in
    const { classes, authenticated } = this.props;

    return (
      // If user is logged in show a Navbar
      // Otherwise don't
      <nav>
        {authenticated ? (
          <div>
            <AppBar>
              <Toolbar className="nav-container">
                <Fragment>
                  <Link to="/">
                    <MyButton tip="Home">
                      <HomeIcon />
                    </MyButton>
                  </Link>
                  <Notifications />
                </Fragment>
              </Toolbar>
            </AppBar>
            <BottomNavigation className={classes.bottomNav}>
              <BottomNavigationAction
                component={Link}
                to="/"
                className={classes.navAction}
                icon={<DashboardIcon />}
              />
              <BottomNavigationAction
                className={classes.navAction}
                icon={<PeopleIcon />}
              />
              <BottomNavigationAction
                className={classes.navAction}
                icon={<PersonIcon />}
              />
              <BottomNavigationAction
                className={classes.navAction}
                icon={<EventIcon />}
              />
              <BottomNavigationAction
                className={classes.navAction}
                icon={<NotificationsIcon />}
              />
              <BottomNavigationAction
                className={classes.navAction}
                icon={<MenuIcon />}
              />
            </BottomNavigation>
          </div>
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
export default connect(mapStateToProps)(withStyles(styles)(Navbar));
