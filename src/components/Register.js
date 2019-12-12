import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';
import { connect } from 'react-redux';
import { register } from '../actions/authActions';

const override = css`
  position: fixed;
  left: 45%;
  top: 35%;
  z-index: 1;
`;

const initialUserState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  jobRole: '',
  department: '',
  address: '',
  gender: '',
}

class Register extends Component {
  constructor() {
    super()
    this.state = {
      ...initialUserState,
      errors: {},
      loading: false,
      employeeCreated: false
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

  // componentDidMount() {
  //   if (!this.props.auth.isAuthenticated || this.props.auth.user.usertype !== 'admin') {
  //     this.props.history.push('/')
  //   }
  // }

  async onSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: true,
      employeeCreated: false
    })

    const userdetails = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      jobRole: this.state.jobRole,
      department: this.state.department,
      address: this.state.address,
      gender: this.state.gender
    };

    const response = await this.props.register(userdetails, this.props.history)

    if (response.status === 'success') {
      this.setState({
        employeeCreated: true,
        errors: {},
        loading: false,
        ...initialUserState
      })
    }

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { errors, employeeCreated } = this.state
    return (
      <div className="register">
        <div className="container">
          {errors.feedback && (
            <div className="alert alert-danger" role="alert">{errors.feedback}</div>
          )}
          {employeeCreated && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              Employee Created Successfully
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
          <div className="row">
            <div className="col-md-8 m-auto">
              <h2 className="text-center mb-4">Employee Registration</h2>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="First Name"
                    name="firstName"
                    required
                    value={this.state.firstName}
                    onChange={this.onChange}
                  />
                  {errors.firstName && (<div className="text-danger">{errors.firstName}</div>)}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Last Name"
                    name="lastName"
                    required
                    value={this.state.lastName}
                    onChange={this.onChange}
                  />
                  {errors.lastName && (<div className="text-danger">{errors.lastName}</div>)}
                </div>
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
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Gender"
                    name="gender"
                    required
                    value={this.state.gender}
                    onChange={this.onChange}
                  />
                  {errors.gender && (<div className="text-danger">{errors.gender}</div>)}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Job Role"
                    name="jobRole"
                    required
                    value={this.state.jobRole}
                    onChange={this.onChange}
                  />
                  {errors.jobRole && (<div className="text-danger">{errors.jobRole}</div>)}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Department"
                    name="department"
                    required
                    value={this.state.department}
                    onChange={this.onChange}
                  />
                  {errors.department && (<div className="text-danger">{errors.department}</div>)}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Address"
                    name="address"
                    required
                    value={this.state.address}
                    onChange={this.onChange}
                  />
                  {errors.address && (<div className="text-danger">{errors.address}</div>)}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    required
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

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  employee: state.employee
})

export default connect(mapStateToProps, { register })(Register);