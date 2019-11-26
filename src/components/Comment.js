import React, { Component } from 'react'

class Comment extends Component {
  constructor() {
    super()

    this.state = {
      comment: '',
      error: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ error: '' })
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.comment === '' || this.state.comment === null) {
      this.setState({ error: 'Comment cannot be empty' })
      return
    }
    this.setState({ comment: '' })
    //emit to the parent
    this.props.onSubmitComment(this.state.comment)

  }

  render() {
    const { error } = this.state
    const { comments } = this.props
    return (
      <div>
        <div className="comment">
        {comments.length > 0 && comments.map(comment => (
          <div key={comment.id} className="card">
            <p className="p-2 text-left">{comment.comment}
              <br />
              <small className="text-muted">
                {comment.firstname + ' ' + comment.lastname}
              </small>
            </p>
          </div>
        ))}
        </div>
        <div className="pt-4">
          <form className="form" onSubmit={this.onSubmit}>
            <div className="form-group pt-2">
              <textarea className="form-control" name="comment" rows="3" placeholder="Type a comment"
                value={this.state.comment}
                onChange={this.onChange}
              ></textarea>
              {error && (<div className="text-danger">{error}</div>)}
            </div>
            <button type="submit" disabled={this.props.loading} className="btn btn-info form-control mt-2">
              Create
          </button>
          </form>
        </div>
      </div >
    )
  }
}

export default Comment