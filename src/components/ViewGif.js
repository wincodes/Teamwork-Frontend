import React, { Component } from 'react'
// import PropTypes from 'prop-types'

class ViewGif extends Component {
  constructor() {
    super()
    this.state = {
      gifId: '',
      loading: false
    }
  }

  componentDidMount() {
    const { gifId } = this.props.match.params

    this.setState({ gifId })

    console.log(this.state.gifId)
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

// ViewGif.propTypes = {

// }

export default ViewGif