import React from 'react'
import PropTypes from 'prop-types'
import 'material-components-web/dist/material-components-web.min.css';
import {ListItem} from 'react-mdc-web/lib';

const Note = ({ onClick, title, body }) => (
  <ListItem
  onClick={onClick}
  >
  {title}
  {body}
  </ListItem>
)

Note.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
}

export default Note;
