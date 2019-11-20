import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../actions/authActions'
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';
import { withRouter } from 'react-router-dom'

const override = css`
  position: fixed;
  left: 45%;
  top: 35%;
  z-index: 1;
`;

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      errors: {},
      loading: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      return {
        errors: props.errors,
        loading: false
      }
    }
    return null;
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true })

    if (this.state.email === '' || this.state.password === '') {
      this.setState({
        errors: {
          email: 'Email Field is Required',
          password: 'Password field is required'
        },
        loading: false
      })
      return
    }

    const userDetails = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.login(userDetails, this.props.history);
  }

  render() {
    const { errors } = this.state
    return (
      <div className="login">
        <div className="container">
          {errors.feedback && (
            <div className="alert alert-danger" role="alert">{errors.feedback}</div>
          )}
          <div className="row">
            <div className="col-md-8 m-auto">
              <h2 className="text-center mb-4">Log In</h2>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (<div className="text-danger">{errors.email}</div>)}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (<div className="text-danger">{errors.password}</div>)}
                </div>
                <input type="submit" disabled={this.state.loading} className="btn btn-info btn-block mt-4" />
              </form>
              <FadeLoader
                className="loading"
                css={override}
                loading={this.state.loading}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { login })(withRouter(Login))