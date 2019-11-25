import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getSingleGif } from '../actions/getActions';
import { connect } from 'react-redux';
import FadeLoader from 'react-spinners/FadeLoader';
import formatTime from 'date-and-time';
import { css } from '@emotion/core';

const override = css`
  position: fixed;
  left: 45%;
  top: 35%;
  z-index: 1;
`;

class ViewGif extends Component {
  constructor() {
    super()
    this.state = {
      gifId: '',
      errors: {},
      gifPost: {},
      loading: false
    }
  }

  async componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    }

    const { gifId } = this.props.match.params

    this.setState({ gifId })

    if (Object.keys(this.state.gifPost).length === 0) {
      this.setState({ loading: true })

      const resp = await this.props.getSingleGif(gifId)
      if (resp.status === 'success') {
        const gifPost = resp.data
        this.setState({ gifPost })
      }
    }

    this.setState({ loading: false })
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

  dateFormat(data) {
    const date = new Date(data);
    const today = new Date()

    if (formatTime.format(today, 'ddd. MMM. DD YYYY') === formatTime.format(date, 'ddd. MMM. DD YYYY')) {
      return formatTime.format(date, 'Today, hh:mm A');
    }
    return formatTime.format(date, 'ddd. MMM. DD YYYY');
  }

  render() {
    const { errors, gifPost } = this.state
    const { authorDetails } = gifPost
    return (
      <div className="gif">
        <div className="container">
          {errors.feedback && (
            <div className="alert alert-danger" role="alert">{errors.feedback}</div>
          )}
          <div className="row">
            <div className="col-md-8 m-auto">
              <FadeLoader
                className="loading"
                css={override}
                loading={this.state.loading}
              />
              {gifPost.title &&
                <div className="card" style={{ width: "70%" }}>
                  <img src={gifPost.url} className="card-img-top" alt="Gif" />
                  <div className="card-body">
                    <h5 className="card-title">{gifPost.title}</h5>
                    <div className="card-text">Created By:
                      <strong> {gifPost.createdOn &&
                        <div>
                            {
                            ' ' + authorDetails.firstName + ' ' + authorDetails.lastName + ' ' +
                            this.dateFormat(gifPost.createdOn)
                          }
                        </div>}
                      </strong>
                    </div>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ViewGif.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getSingleGif: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { getSingleGif })(ViewGif)