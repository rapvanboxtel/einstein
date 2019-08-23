// Import React and React Router DOM to use components and link pages
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Import Dayjs to show when post is created
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Import PropTypes to typecheck a component
import PropTypes from "prop-types";

// Import React components and utility
import MyButton from "../../util/MyButton";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

// Import Material UI library for styling the application
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardActions from "@material-ui/core/CardActions";

// Import Material UI library for icons
import ChatIcon from "@material-ui/icons/Chat";

// Import Redux library to read/store data from the database
import { connect } from "react-redux";

const styles = {
  cardContainer: {
    width: "100%",
    borderBottomStyle: "solid",
    borderBottomColor: "#DADDE1",
    borderBottomWidth: "15px"
  },
  card: {
    borderRadius: "0px",
    boxShadow: "none"
  },
};

class Scream extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null;

    return (
      <div className={classes.cardContainer}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar
                alt="Profile image"
                src={userImage}
                className={classes.avatar}
                component={Link}
                to={`/users/${userHandle}`}
              />
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={
              <Typography
                variant="body2"
                component={Link}
                to={`/users/${userHandle}`}
                color="primary"
              >
                {userHandle}
              </Typography>
            }
            subheader={dayjs(createdAt).fromNow()}
          />

          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {body}
            </Typography>
          </CardContent>

          <CardActions disableSpacing>
            <LikeButton screamId={screamId} />
            <span>{likeCount} Likes</span>

            <ScreamDialog
              screamId={screamId}
              userHandle={userHandle}
              openDialog={this.props.openDialog}
            />
            <span>{commentCount} comments</span>

            {deleteButton}

          </CardActions>

          
        </Card>
      </div>
    );
  }
}

// Typcheck components
Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

// Select user from the store to export to other files later
const mapStateToProps = state => ({
  user: state.user
});

// Export data
export default connect(mapStateToProps)(withStyles(styles)(Scream));
