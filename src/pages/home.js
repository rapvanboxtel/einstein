// Import React and React Router DOM to use components and link pages
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

// Import PropTypes to typecheck a component
import PropTypes from "prop-types";

// Import React components and utility
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import ScreamSkeleton from "../util/ScreamSkeleton";
import PostScream from "../components/scream/PostScream";

// Import Redux library to read/store data from the database
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

class home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;

    let recentScreamsMarkup = !loading ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <ScreamSkeleton />
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
        <PostScream />
      </Grid>
    );
  }
}

// Typcheck components
home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

// Select data from the store to export to other files later
const mapStateToProps = state => ({
  data: state.data
});

// Export data
export default connect(
  mapStateToProps,
  { getScreams }
)(home);
