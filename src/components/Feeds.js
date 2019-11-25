import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getFeeds } from '../actions/getActions'
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';
import formatTime from 'date-and-time';
import { Link } from 'react-router-dom'


const override = css`
  position: fixed;
  left: 45%;
  top: 35%;
  z-index: 1;
`;

class Feeds extends Component {
  constructor() {
    super()

    this.state = {
      feeds: [],
      errors: {},
      loading: false
    }

  }

  async componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    }

    if (this.state.feeds.length === 0) {
      this.setState({ loading: true })

      const resp = await this.props.getFeeds()
      if (resp.status === 'success') {
        const feeds = resp.data
        this.setState({ feeds })
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
    return formatTime.format(date, 'ddd. MMM. DD, YYYY');
  }


  render() {
    const { errors, feeds } = this.state
    return (
      <div className="feeds">
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
              {feeds.map(feed => (
                <div key={feed.id} className="p-3">
                  {feed.article &&
                    <div className="card" style={{ width: "90%" }}>
                      <div className="card-body">
                        <h5 className="card-title">{feed.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {feed.createdOn && <div>
                            Posted By:
                            {
                              ' ' + feed.firstname + ' ' + feed.lastname + ' ' +
                              this.dateFormat(feed.createdOn)
                            }
                          </div>}</h6>
                        <p dangerouslySetInnerHTML={{ __html: feed.article.substring(0, 100) + '<p>....</p>' }}
                          className="card-text text-justify"></p>
                        <Link to={`/articles/${feed.id}`} className="btn btn-primary form-control card-link">View Article</Link>
                      </div>
                    </div>}
                  {feed.url &&
                    <div className="card" style={{ width: "90%" }}>
                      <img src={feed.url} className="card-img-top" alt="Article Gif" />
                      <div className="card-body">
                        <p className="card-text">
                          {feed.title}
                        </p>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {feed.createdOn && <div>
                            Posted By:
                            {
                              ' ' + feed.firstname + ' ' + feed.lastname + ' ' +
                              this.dateFormat(feed.createdOn)
                            }
                          </div>}</h6>
                        <Link to={`/gifs/${feed.id}`} className="btn btn-primary card-link form-control">View Image  </Link>
                      </div>
                    </div>}
                </div>
              ))

              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Feeds.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getFeeds: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { getFeeds })(withRouter(Feeds))