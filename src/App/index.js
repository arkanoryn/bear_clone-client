import React, { Component } from 'react';
import 'material-components-web/dist/material-components-web.min.css';
import Layout from '../layout'
import Drawers from '../layout/drawers'
import MainPane from '../layout/main_pane'
import Editor from '../notes/editor'
/* import { BrowserRouter, Miss } from 'react-router';*/

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Drawers></Drawers>

            <MainPane>
              <Editor></Editor>
            </MainPane>
        </Layout>
      </div>
    );
  }
}

export default App;
