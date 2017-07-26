import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.node,
};

const Body = ({ children }) => (
  <div
  style={{
    'padding': '16px',
    }}
  >
    {children}
  </div>
);
Body.propTypes = propTypes;
export default Body;
