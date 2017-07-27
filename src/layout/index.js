import PropTypes from 'prop-types';
import React from 'react';
import {Content} from 'react-mdc-web/lib'

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
    <Content
      style={{
        display: "flex",
        boxSizing: "border-box",
        flex: 1,
      }}
    >
      {children}
    </Content>
  </div>
);
Layout.propTypes = propTypes;
export default Layout;
