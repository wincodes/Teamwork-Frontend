import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import devc from '../../images/devc.jpg'
import { Link } from 'react-router-dom'

class Landing extends Component {

  render() {
    const { auth } = this.props;

    const authLinks = (auth.isAuthenticated &&
      <div className="p-3 text-left">
        <p className="bg-primary p-2 text-white"><strong>Logged In User Details:</strong></p>
        <div className="d-flex flex-column">
          <div className="p-2"><strong className="pr-2">First Name: </strong>
            {auth.user.firstName.toUpperCase()}
          </div>
          <div className="p-2"><strong className="pr-2"> Last Name: </strong>
            {auth.user.lastName.toUpperCase()}
          </div>
          <div className="p-2"><strong className="pr-2">Email: </strong>
            {auth.user.email}
          </div>
          <div className="p-2"><strong className="pr-2">User Status: </strong>
            {auth.user.usertype.toUpperCase()}
          </div>
        </div>
      </div>);

    const guestLinks = (
      <div className="p-3">
        <p className="p-2"><strong>Click the button below to Login</strong></p>
        <Link to="/login" class="btn btn-primary">Login</Link>
      </div>
    )
    return (
      <div className="landing">
        <div className="container">
          <div className="row">
            <div className='col-md-8 m-auto'>
              <img src={devc} alt="..." class="rounded img-responsive" />
              <div className="p-5">
                <h3> Team Work.. A Dev-C Project</h3>
                {auth.isAuthenticated ? authLinks : guestLinks}
              </div>
            </div>
          </div>
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