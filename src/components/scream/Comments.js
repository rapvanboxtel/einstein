import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  ...theme,
  comment: {
    width: 'calc(100% - 50px)'
  },
  commentImage: {
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: '50%'
  },
  commentData: {
    marginLeft: 10
  }
});

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    return (
      <Grid container className={classes.commentsContainer}>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
                <Grid container >
                  <Grid item>
                    <img
                      src={userImage}
                      alt="comment"
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item className={classes.comment}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="body2"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary"
                      >
                        {userHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {dayjs(createdAt).fromNow()}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant="body2" component="p">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);
