import PropTypes from 'prop-types';
import React from 'react';
import {Content} from 'react-mdc-web/lib'

const propTypes = {
  children: PropTypes.node,
};

const AppContent = ({ children }) => (
  <Content
    style={{
      display: "flex",
      boxSizing: "border-box",
      flex: 1,
    }}
  >
    {children}
  </Content>
);
AppContent.propTypes = propTypes;
export default AppContent;
