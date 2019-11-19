import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Landing extends Component {

  render() {
    const { auth } = this.props;
    return (
      <div className="landing">
        <div className="container">
          {auth.isAuthenticated && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              Logged in as <strong>{auth.user.email}</strong>
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
          <h1 className="text-secondary">landing page</h1>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {})(Landing)