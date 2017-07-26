import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.node,
};

const Layout = ({ children }) => (
  <div
    className='mdc-typography'
    style={{
      display: 'flex',
      flexDirection:'column',
      boxSizing: 'border-box',
      minHeight: '100%',
    }}
  >
    {children}
  </div>
);
Layout.propTypes = propTypes;
export default Layout;
