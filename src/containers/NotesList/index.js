import React, { Component } from 'react';
import {Button, Drawer, DrawerSpacer, List, ListItem, Icon} from 'react-mdc-web/lib';

class NotesList extends Component {
  render() {
    return (
      <Drawer permanent>
        <DrawerSpacer>
          Search Input will come here
          <Button dense>
            <Icon name="create" />
          </Button>
        </DrawerSpacer>
        <List dense>
          <ListItem>Berlin, Germany</ListItem>
          <ListItem>London, UK</ListItem>
          <ListItem>Strasbourg, France</ListItem>
          <ListItem>Buenos Aires, Argentina</ListItem>
        </List>
      </Drawer>
    );
  }
}

export default NotesList;
