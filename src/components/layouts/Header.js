import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { withRouter } from 'react-router-dom';

class Header extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        {user.usertype === 'admin' && (
          <li className="nav-item">
            <Link className="nav-link" to="/register" style={{ cursor: 'pointer' }}>
              Create Employee
						</Link>
          </li>
        )}
        <li className="nav-item dropdown">
          <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" 
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
          style={{ cursor: 'pointer' }}
          >
            Create Post
          </div>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to="/create-gif">Gif Post</Link>
            <Link className="dropdown-item" to="/create-article">Article</Link>
          </div>
        </li>
        <li className="nav-item">
          <div onClick={this.onLogoutClick.bind(this)} className="nav-link"
            style={{ cursor: 'pointer' }}
          >
            Log Out
					</div>
        </li>
      </ul>
    );

    const defultLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/login" style={{ cursor: 'pointer' }}>
            Login
					</Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Team Work
					</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated && (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/feeds" style={{ cursor: 'pointer' }}>
                    {' '}
                    Feeds
						      </Link>
                </li>
              </ul>
            )}
            {isAuthenticated ? authLinks : defultLinks}
          </div>
        </div>
      </nav>
    )
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})


export default connect(mapStateToProps, { logoutUser })(withRouter(Header));