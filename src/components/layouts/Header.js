import React, { Component } from 'react'

class Header extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark mb-4">
        <div className="container">
          <div className="navbar-brand" to="/">
            Team Work
					</div>
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
                <div className="nav-link" to="/feeds">
                  {' '}
                  Feeds
								</div>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <div className="nav-link" to="/register">
                  Sign Up
					      </div>
              </li>
              <li className="nav-item">
                <div className="nav-link" to="/login">
                  Login
								</div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}


export default Header