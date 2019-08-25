// Import React and React Router DOM to use components and link pages
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Import Dayjs to show when post is created
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Import PropTypes to typecheck a component
import PropTypes from "prop-types";

// Import Material UI library for styling the application
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/NotificationsNone";
import withStyles from "@material-ui/core/styles/withStyles";

// Import Material UI library for icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/ModeComment";

// Import Redux library to read/store data from the database
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const styles = (theme) => ({
  ...theme,
  notificationContainer: {
    width: '100%',
    height: '300px'
  },
  notification: {
    width: 'calc(100% - 32px)',
    padding: '32px 16px'
  },
  notificationSender: {
    fontWeight: 500,
    display: 'inline-block'
  },
  notificationIcon: {
    position: 'relative',
    float: 'right'
  },
  notificationContent: {
    maxWidth: '85%',
    display: 'inline-block'
  },
  visibleSeparatorNotifications: {
    width: '%',
    height: '1px',
    backgroundColor: 'rgba(230, 230, 230, 1)',
    margin: '0px',
    borderWidth: '0px'
  }
});

class Notifications extends Component {
  state = {
    anchorEl: null
  };

  handleOpen = event => {
    this.setState({ anchorEl: event.target });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onMenuOpened = () => {
    let unreadNotificationsIds = this.props.notifications
      .filter(not => !not.read)
      .map(not => not.notificationId);
    this.props.markNotificationsRead(unreadNotificationsIds);
  };

  render() {
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;
    const { classes } = this.props;

    dayjs.extend(relativeTime);

    let notificationsIcon;

    if (notifications && notifications.length > 0) {
      notifications.filter(not => not.read === false).length > 0
        ? (notificationsIcon = (
            <Badge
              badgeContent={
                notifications.filter(not => not.read === false).length
              }
              color="secondary"
            >
              <NotificationsIcon />
            </Badge>
          ))
        : (notificationsIcon = <NotificationsIcon />);
    } else {
      notificationsIcon = <NotificationsIcon />;
    }

    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map(not => {
          const verb = not.type === "like" ? "liked" : "commented on";
          const time = dayjs(not.createdAt).fromNow();
          const iconColor = not.read ? "primary" : "secondary";
          const icon =
            not.type === "like" ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <CommentIcon color={iconColor} style={{ marginRight: 10 }} />
            );

          return (
            <div>
              <Typography 
                key={not.createdAt} 
                onClick={this.handleClose} 
                className={classes.notification}
                component={Link}
                to={`/users/${not.recipient}/scream/${not.screamId}`}
              >
                <Typography
                  color="default"
                  variant="body1"
                  className={classes.notificationContent}
                >
                  <Typography
                    component={Link}
                    color="primary"
                    variant="body1"
                    to={`/users/${not.sender}`}
                    className={classes.notificationSender}
                  >
                    {not.sender} 
                  </Typography> {verb} your post {time}
                </Typography>
                <div className={classes.notificationIcon}>
                  {icon}
                </div>
              </Typography>
              <hr className={classes.visibleSeparatorNotifications} />
            </div>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You have no notifications yet
        </MenuItem>
      );

    return (
      <div classname={classes.notificationContainer}>
        {notificationsMarkup}
      </div>
    );
  }
}

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  notifications: state.user.notifications
});

export default connect(
  mapStateToProps,
  { markNotificationsRead }
)(withStyles(styles)(Notifications));
