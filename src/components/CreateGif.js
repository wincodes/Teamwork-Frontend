import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';
import '../styles/upload.css';
import { connect } from 'react-redux';
import { postGif } from '../actions/postActions';
import { withRouter } from 'react-router-dom';

const override = css`
  position: fixed;
  left: 45%;
  top: 29%;
  z-index: 1;
`;

class CreateGif extends Component {
  constructor() {
    super()

    this.state = {
      errors: {},
      title: '',
      image: '',
      loading: false,
      file: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this)
    this.removeImage = this.removeImage.bind(this)
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

    this.setState({ loading: true })

    // const formData = new FormData()
    // formData.append('title', this.state.title);
    // formData.append('image', this.state.file);
    const form = {
      title: this.state.title,
      image: this.state.file
    }

    await this.props.postGif(form, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onInputChange(e) {
    // this.setState({ image: e.target.files[0], loaded: 0})
    this.setState({ errors: {}})
    const file = e.target.files[0];
    if (file.type.match('image.gif')) {
      this.setState({ image: URL.createObjectURL(file), file: e.target.files[0] })
    } else {
      this.setState({ errors: { image: 'Image must be of Gif Type' } })
    }
  }

  removeImage() {
    this.setState({ image: '' })
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
              <div>
                <h2 className="text-center mb-4">Create Gif Post</h2>
              </div>
              <form className="form" onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Post Title"
                    name="title"
                    required
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                  {errors.title && (<div className="text-danger">{errors.title}</div>)}
                </div>
                
                <div className="form-group">
                  <div className="upload-images d-flex justify-content-center align-items-center">
                    {!this.state.image && <div className="file-input">
                      <label>Browse files</label>
                      <input
                        type="file"
                        id="file"
                        onChange={this.onInputChange}
                        required
                      />
                    </div>}
                    {this.state.image && <div
                      className="position-relative">
                      <p onClick={this.removeImage}
                        className="text-primary" style={{ cursor: 'pointer' }}
                      >Click to remove image</p>
                      <img src={this.state.image} alt="Preview" width="70%" />
                    </div>}
                  </div>
                  {errors.image && (<div className="text-danger">{errors.image}</div>)}
                </div>

                <button type="submit" disabled={this.state.loading} className="btn btn-info mt-4">
                  Create
                </button>
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

CreateGif.propTypes = {
  errors: PropTypes.object.isRequired,
  postGif: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { postGif })(withRouter(CreateGif))