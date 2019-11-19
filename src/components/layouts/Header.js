import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {

  render() {
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
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/feeds" style={{cursor: 'pointer'}}>
                  {' '}
                  Feeds
								</Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/register" style={{cursor: 'pointer'}}>
                  Sign Up
					      </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login" style={{cursor: 'pointer'}}>
                  Login
								</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}


export default Header