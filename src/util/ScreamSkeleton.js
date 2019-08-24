import React, { Fragment } from 'react';
import NoImg from '../images/no-img.png';
import PropTypes from 'prop-types';
// MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  ...theme,
  card: {
    boxShadow: 'none',
    width: '100%',
    borderBottomStyle: 'solid',
    borderBottomColor: '#DADDE1',
    borderBottomWidth: '15px'
  },
  info: {
    padding: '16px',
    display: 'inline-block',
    width: 'calc(100% - 32px)'
  },
  userinfo: {
    width: '80%',
    display: 'inline-block'
  },
  img: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    float: 'left'
  },
  handle: {
    width: '17%',
    height: 13,
    margin: '6px 72.5% 5px 5.5%',
    backgroundColor: theme.palette.primary.main,
    float: 'left'
  },
  date: {
    height: 11,
    width: 95,
    backgroundColor: 'rgba(0,0,0, 0.3)',
    marginLeft: '5.5%',
    float: 'left'
  },
  content: {
    padding: '8px 16px 24px 16px'
  },
  fullLine: {
    height: 11,
    width: '96%',
    backgroundColor: 'rgba(0,0,0, 0.4)',
    marginBottom: 10
  },
  halfLine: {
    height: 11,
    width: '56%',
    backgroundColor: 'rgba(0,0,0, 0.4)'
  }
});

const ScreamSkeleton = (props) => {
  const { classes } = props;

  const content = Array.from({ length: 4 }).map((index) => (
    <Card className={classes.card} key={index}>

        <div className={classes.info}>
          <CardMedia className={classes.img} image={NoImg} />
          <div className={classes.userinfo}>
            <div className={classes.handle} />
            <div className={classes.date} />
          </div>
        </div>
        <div className={classes.content}>
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <div className={classes.halfLine} />
        </div>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

ScreamSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScreamSkeleton);
