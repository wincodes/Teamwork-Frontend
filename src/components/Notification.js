import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Notification extends Component {
  constructor() {
    super()

    this.state = {
      notification: {}
    }

    this.show = React.createRef();

    this.clearNotification = this.clearNotification.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.notification.message !== prevState.notification.message){
      this.show.current.classList.add('show')
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.notification !== state.notification.message) {
      return {
        notification: props.notification
      }
    }
    return null;
  }

  clearNotification() {
    this.show.current.classList.remove('show')
    this.setState({ notification: '' })
  }

  render() {
    const { message, type } = this.state.notification
    return (
      <div>
        {message && <div className={`alert ${type === 'success' ? 'alert-success' : 'alert-danger'} 
        alert-dismissible fade`} role="alert" ref={this.show}>
          <strong>{this.props.notification.message}</strong>
          <button type="button" onClick={this.clearNotification} className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
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