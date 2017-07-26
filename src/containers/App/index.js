import React, { Component } from 'react';
import LeftMenu from '../LeftMenu'
import NotesList from '../NotesList'
import Body from '../Body'
import 'material-components-web/dist/material-components-web.min.css';
import Layout from '../Layout'
import Content from '../Content'
/* import { BrowserRouter, Miss } from 'react-router';*/

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Content>
            <LeftMenu />
            <NotesList />

            <Body>
              Home
            </Body>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
