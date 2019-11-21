import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getSingleArticle } from '../actions/getActions';
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

class ViewArticle extends Component {
  constructor() {
    super()
    this.state = {
      articleId: '',
      errors: {},
      article: {},
      loading: false
    }
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

  render() {
    const { errors, article } = this.state
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
                    <h6 className="pt-2 pb-5 text-muted">
                      {article.createdOn && this.dateFormat(article.createdOn)}
                    </h6>
                    <p dangerouslySetInnerHTML={{__html: article.article}} className="text-justify"></p>
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
  getSingleArticle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { getSingleArticle })(ViewArticle)