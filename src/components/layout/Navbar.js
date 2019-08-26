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

import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import ChatIcon from "@material-ui/icons/Chat";

const styles = {
  bottomNav: {
    position: "fixed",
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: 0,
    width: '100%',
    maxWidth: "800px",
    zIndex: "999",
    borderTop: "1px solid #DADDE1",
    height: 70
  },
  navAction: {
    minWidth: "40px",
    maxWidth: "70px"
  },
  avatar: {
    width: 30,
    height: 30
  },
  search: {
    position: "relative",
    marginLeft: 0,
    width: "98%",
    height: "28px",
    marginLeft: "2%",
    borderBottom: "1px solid white"
  },
  searchIcon: {
    width: "0.9em",
    height: "0.9em"
  },
  searchIconWrapper: {
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  searchInput: {
    marginLeft: 25,
    width: "calc(100% - 30px)",
    height: "27px",
    color: "white"
  },
  navAppbar: {
    // width: 100%;
    // max-width: 500px;
    // left: 50%;
    // transform: translateX(-50%);
  }
};

//Navbar component to define when the certain Navbar will display
class Navbar extends Component {
  render() {
    // Check if user is logged in

    const {
      classes,
      user: {
        credentials: { imageUrl, handle },
        authenticated
      }
    } = this.props;

    return (
      // If user is logged in show a Navbar
      // Otherwise don't
      <nav>
        {authenticated ? (
          <div>
            <AppBar style={{width: '100%', maxWidth: '800px', left: '50%', transform: 'translateX(-50%)'}}>
              <Toolbar>
                <Grid>
                  <Avatar
                    alt="Profile Image"
                    src={imageUrl}
                    className={classes.avatar}
                    component={Link}
                    to={`/profile/${handle}`}
                  />
                </Grid>
                <div className={classes.search}>
                  <div className={classes.searchIconWrapper}>
                    <SearchIcon className={classes.searchIcon} />
                  </div>
                  <InputBase
                    placeholder="Search"
                    inputProps={{ "aria-label": "search" }}
                    className={classes.searchInput}
                  />
                </div>
                <IconButton color="inherit">
                  <ChatIcon />
                </IconButton>
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
                component={Link}
                to={`/profile/${handle}`}
                className={classes.navAction}
                icon={<PersonIcon />}
              />
              <BottomNavigationAction
                className={classes.navAction}
                icon={<EventIcon />}
              />
              <BottomNavigationAction
                component={Link}
                className={classes.navAction}
                to="/notifications"
                icon={<NotificationsIcon />}
              />
              <BottomNavigationAction
                component={Link}
                className={classes.navAction}
                to="/notifications"
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
  user: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired
};

// Select authenticated, user from the store to export to other files later
const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  user: state.user
});

// Export data
export default connect(mapStateToProps)(withStyles(styles)(Navbar));
