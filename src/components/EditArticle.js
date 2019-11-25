import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';
import { connect } from 'react-redux';
import { editArticle } from '../actions/postActions';
import { getSingleArticle } from '../actions/getActions'
import { withRouter } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const override = css`
  position: fixed;
  left: 45%;
  top: 35%;
  z-index: 1;
`;

class CreateArticle extends Component {
  constructor() {
    super()

    this.state = {
      articleId: '',
      invalidUser: false,
      errors: {},
      title: '',
      article: '',
      loading: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleEditorInput = this.handleEditorInput.bind(this)
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
        const { data } = resp
        if(data.authorId !== this.props.auth.user.id){
          this.setState({ invalidUser: true, loading: false })
          return
        }
        this.setState({ title: data.title, article: data.article })
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

  async onSubmit(e) {
    e.preventDefault();

    if(this.state.article === ''){
      this.setState({ errors: { article: 'article cannot be empty'} })

      return
    }

    this.setState({ loading: true })

    const articleDetails = {
      articleId: this.state.articleId,
      title: this.state.title,
      article: this.state.article
    }

    await this.props.editArticle(articleDetails, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleEditorInput(value){
    this.setState({ article: value})
  }

  render() {
    const { errors, invalidUser } = this.state
    return (
      <div className="Create-Article">
        <div className="container">
          {errors.feedback && (
            <div className="alert alert-danger" role="alert">{errors.feedback}</div>
          )}
          {invalidUser && (
            <div className="alert alert-danger" role="alert">Cannot Edit Another User's Article</div>
          )}
          {!invalidUser && <div className="row">
            <div className="col-md-8 m-auto">
              <div>
                <h2 className="text-center mb-4">Create Article</h2>
              </div>
              <form className="form" onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Title"
                    name="title"
                    required
                    value={this.state.title}
                    onChange={this.onChange}
                    autoFocus
                  />
                  {errors.title && (<div className="text-danger">{errors.title}</div>)}
                </div>
                <div className="form-group">
                  <ReactQuill
                    placeholder="Type Your Article Here"
                    value={this.state.article}
                    onChange={this.handleEditorInput}
                  />
                  {errors.article && (<div className="text-danger">{errors.article}</div>)}
                </div>
                <button type="submit" disabled={this.state.loading} className="btn btn-info form-control mt-4">
                  Update
                </button>
              </form>
              <FadeLoader
                className="loading"
                css={override}
                loading={this.state.loading}
              />
            </div>
          </div>}
        </div>
      </div>
    )
  }
}

CreateArticle.propTypes = {
  errors: PropTypes.object.isRequired,
  editArticle: PropTypes.func.isRequired,
  getSingleArticle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { editArticle, getSingleArticle })(withRouter(CreateArticle))