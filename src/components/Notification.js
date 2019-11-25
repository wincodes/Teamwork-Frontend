import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Notification extends Component {
  constructor() {
    super()

    this.state = {
      notification: {}
    }

    this.clearNotification = this.clearNotification.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.notification) {
      return {
        notification: props.notification
      }
    }
    return null;
  }

  clearNotification() {
    this.setState({ notification: '' })
  }

  render() {
    const { message, type } = this.state.notification
    return (
      <div>
        {message && <div className={`alert ${type === 'success' ? 'alert-success' : 'alert-danger'} 
        alert-dismissible fade show`} role="alert">
          <strong>{this.props.notification.message}</strong>
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true" onClick={this.clearNotification}>&times;</span>
          </button>
        </div>}
      </div>
    )
  }
}

Notification.propTypes = {
  auth: PropTypes.object.isRequired,
  notification: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  notification: state.notification
})

export default connect(mapStateToProps, {})(Notification)