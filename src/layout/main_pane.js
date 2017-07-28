import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.node
};

const MainPane = ({ children }) =>
  <div
    style={{
      padding: '16px',
      width: '50%'
    }}
  >
    {children}
  </div>;

MainPane.propTypes = propTypes;
export default MainPane;
