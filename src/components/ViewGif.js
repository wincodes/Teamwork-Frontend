import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getSingleGif } from '../actions/getActions';
import { connect } from 'react-redux';
import FadeLoader from 'react-spinners/FadeLoader';
import formatTime from 'date-and-time';
import { css } from '@emotion/core';
import { deleteGif } from '../actions/deleteActions';
import { withRouter } from 'react-router-dom';
import Comment from '../components/Comment';
import { postComment } from '../actions/postActions'

const override = css`
  position: fixed;
  left: 50%;
  top: 10%;
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

    this.deletePost = this.deletePost.bind(this)
    this.submitComment = this.submitComment.bind(this)
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

  deletePost() {
    this.setState({ loading: true })
    this.props.deleteGif(this.state.gifId, this.props.history)
  }

  async submitComment(comment) {
    this.setState({ loading: true })
    const data = {
      gifId: this.state.gifId,
      comment
    }

    const res = await this.props.postComment(data, 'gif');

    if (res) {
      const resp = await this.props.getSingleGif(this.state.gifId)
      if (resp.status === 'success') {
        const gifPost = resp.data
        this.setState({ gifPost })
      }
    }

    this.setState({ loading: false })
  }

  render() {
    const { errors, gifPost } = this.state
    const { authorDetails, comments } = gifPost
    return (
      <div className="gif">
        <div className="container">
          {errors.feedback && (
            <div className="alert alert-danger" role="alert">{errors.feedback}</div>
          )}
          <FadeLoader
            className="loading"
            css={override}
            loading={this.state.loading}
          />

          {gifPost.title &&
            <div className="row">
              <div className="col-md-8 m-auto">
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
                  {gifPost.authorId === this.props.auth.user.id &&
                    <button className="btn btn-outline-danger form-control" data-toggle="modal"
                      data-target="#deleteModal" disabled={this.state.loading}>Delete Post
                    </button>
                  }
                </div>

                <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="deleteModalLabel">Are You Sure You Want to Delete this Post?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body text-danger">
                        You cannot undo this Action.
                        </div>
                      <div className="modal-footer flex-row">
                        <div className="col">
                          <button type="button" className="btn btn-primary form-control" data-dismiss="modal">Close</button>
                        </div>
                        <div className="col">
                          <div onClick={this.deletePost} className="btn btn-outline-danger form-control"
                            data-dismiss="modal">Delete Post</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mt-2 flex-column bd-highlight mb-3">
                <div className="mt-4 pb-2">
                  <Comment comments={comments} onSubmitComment={this.submitComment} loading={this.state.loading} />
                </div>
              </div>
            </div>}
        </div>
      </div>
    )
  }
}

ViewGif.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getSingleGif: PropTypes.func.isRequired,
  deleteGif: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { getSingleGif, deleteGif, postComment })(withRouter(ViewGif));