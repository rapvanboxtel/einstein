// Import React and React Router DOM to use components and link pages
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Import PropTypes to typecheck a component
import PropTypes from "prop-types";

// Import the BackgroundImg
import BackgroundImg from "../images/login-register-backgroundimg.jpg";

// Import Material UI library for styling the application
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Import Redux library to read/store data from the database
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

// Import theme used by Material UI library
const styles = theme => ({
  ...theme
});

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm className={classes.formItem}>
          <img
            src={BackgroundImg}
            alt="login-backgroundimg"
            className={classes.backgroundImage}
          />
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <br />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <br />
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <body2 className={classes.smallText}>
              Don't have an account ? <Link to="/signup">Sign up</Link>
            </body2>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

// Typcheck components
login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

// Select user, ui from the store to export to other files later
const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

// Select loginUser from the store to export to other files later
const mapActionsToProps = {
  loginUser
};

// Export data
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
