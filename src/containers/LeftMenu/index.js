import React, { Component } from 'react';
import 'material-components-web/dist/material-components-web.min.css';
import {Drawer, DrawerSpacer, Navigation, Icon} from 'react-mdc-web/lib';

class LeftMenu extends Component {
  render() {
    return (
      <Drawer permanent>
        <DrawerSpacer>
          Menu
        </DrawerSpacer>
        <Navigation>
          <a href='/home' selected><Icon name='directions_bus'/>Bus</a>
          <a href='/home'><Icon name='directions_railway'/>Railway</a>
          <a href='/home'><Icon name='directions_bike'/>Bike</a>
        </Navigation>
      </Drawer>
    );
  }
}

export default LeftMenu;
