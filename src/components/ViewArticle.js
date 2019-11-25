import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getSingleArticle } from '../actions/getActions';
import { connect } from 'react-redux';
import FadeLoader from 'react-spinners/FadeLoader';
import formatTime from 'date-and-time';
import { css } from '@emotion/core';
import { Link } from 'react-router-dom';
import { deleteArticle } from '../actions/deleteActions';
import { withRouter } from 'react-router-dom';

const override = css`
  position: fixed;
  left: 45%;
  top: 35%;
  z-index: 1;
`;

class ViewArticle extends Component {
  constructor() {
    super()
    this.state = {
      articleId: '',
      errors: {},
      article: {},
      loading: false
    }

    this.deleteArticle = this.deleteArticle.bind(this)
  }

  async componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    }

    const { articleId } = this.props.match.params

    this.setState({ articleId })

    if (Object.keys(this.state.article).length === 0) {
      this.setState({ loading: true })

      const resp = await this.props.getSingleArticle(articleId)
      if (resp.status === 'success') {
        const article = resp.data
        this.setState({ article })
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
    return formatTime.format(date, 'hh:mm A, ddd. MMM. DD YYYY');
  }

  deleteArticle() {
    this.setState({ loading: true })
    this.props.deleteArticle(this.state.articleId, this.props.history)
  }

  render() {
    const { errors, article } = this.state
    const { authorDetails } = article
    return (
      <div className="articles">
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
              {article.title &&
                <div className="pt-3 pb-3" style={{ width: "90%" }}>
                  <h2 className="">{article.title}</h2>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {article.createdOn && <div>
                      Posted By:
                            {
                        ' ' + authorDetails.firstName + ' ' + authorDetails.lastName + ' ' +
                        this.dateFormat(article.createdOn)
                      }
                    </div>}</h6>
                  <p dangerouslySetInnerHTML={{ __html: article.article }} className="text-justify"></p>

                  {article.authorId === this.props.auth.user.id &&
                    <div className="form-row">
                      <div className="col">
                        <Link to={`/articles/${article.id}/edit`} className="btn btn-primary form-control">Edit Article</Link>
                      </div>
                      <div className="col">
                        <button className="btn btn-outline-danger form-control" data-toggle="modal" disabled={this.state.loading} 
                          data-target="#deleteModal">Delete Article</button>
                      </div>
                    </div>}

                  <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="deleteModalLabel">Are You Sure You Want to Delete this Article?</h5>
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
                            <div onClick={this.deleteArticle} className="btn btn-outline-danger form-control" 
                              data-dismiss="modal">Delete Article</div>
                          </div>
                        </div>
                      </div>
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

ViewArticle.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getSingleArticle: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { getSingleArticle, deleteArticle })(withRouter(ViewArticle))