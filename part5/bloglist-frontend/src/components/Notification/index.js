import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message.type === 'error' ? 'error' : 'success'}>
      {message.content}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.object
}

export default Notification
