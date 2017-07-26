import React from 'react'
import PropTypes from 'prop-types'

const Link = ({active, children, onClick}) => {
  if (active) {
    return <span>{children}</span>
  }

  return (
    <a href="#"
      onClick={e => {e.preventDefault() onClick()}}
    >
      {children}
    </a>
  )
}

Link.propTypes = {
  active: propTypes.bool.isRequired,
  children: propTypes.node.isRequired,
  onClick: propTypes.func.isRequired,
}

export default Link
