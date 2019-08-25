import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
// Redux stuff
import { connect } from "react-redux";
import { postScream, clearErrors } from "../../redux/actions/dataActions";

import Fab from "@material-ui/core/Fab";

const styles = theme => ({
  ...theme,
  postContainer: {
    padding: '5%'
  },
  visibleSeparatorPost: {
    width: '90%',
    margin: '0% 5%',
    height: '1px',
    backgroundColor: 'rgba(230, 230, 230, 1)',
    borderWidth: '0px'
  },
  postTitle: {
    padding: '5%'
  },
  postContent: {
    padding: '5%'
  },
  sendPostContainer: {
    width: '90%',
    backgroundColor: 'white',
    position: 'absolute',
    left: '5%',
    bottom: '0%',
    paddingTop: '5%',
    paddingBottom: '5%'
  },
  submitButton: {
    float: 'right'
  },
  textFieldPost: {
    width: '100%'
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    position: "absolute",
    right: "2%",
    top: "2%"
  },
  postButton: {
    position: "fixed",
    bottom: "90px",
    right: "15px"
  },
});

class PostScream extends Component {
  state = {
    open: false,
    body: "",
    errors: {}
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, errors: {} });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.postScream({ body: this.state.body });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <Fragment>
        <Fab
          onClick={this.handleOpen}
          color="primary"
          aria-label="add"
          className={classes.postButton}
        >
          <AddIcon />
        </Fab>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          className={classes.postContainer}
          fullScreen 
        >
          <MyButton
            tip=""
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle className={classes.postTitle}>Create post</DialogTitle>
          <hr className={classes.visibleSeparatorPost} />
          <DialogContent className={classes.postContent}>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label=""
                multiline
                placeholder="What would you like to share?"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textFieldPost}
                onChange={this.handleChange}
                fullWidth
                InputProps={{disableUnderline: true}}
              />
              <div className={classes.sendPostContainer}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submitButton}
                  disabled={loading}
                >
                  Post
                  {loading && (
                    <CircularProgress
                      size={30}
                      className={classes.progressSpinner}
                    />
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { postScream, clearErrors }
)(withStyles(styles)(PostScream));
