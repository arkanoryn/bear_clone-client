import React from 'react';
import {Button, Drawer, DrawerSpacer, List, ListItem, Icon} from 'react-mdc-web/lib';

const notes = () => (
  [{id: 1, title: "Alpha mange des nouilles"},
   {id: 2, title: "John le Rouge is gone."},
   {id: 3, title: "The cat died yesterday :("},
   {id: 4, title: "I have a new dog!"},
   {id: 5, title: "Neijiro eat his first egg..."},
  ]
);

const displayNotes = (notes) => (
  notes.map( (note) =>
    <DisplayNote key={note.id} note={note} />
  )
);

const DisplayNote = ({note}) => (
  <ListItem key={note.id}>{note.title}</ListItem>
);

const NotesList = () => (
  <Drawer permanent>
    <DrawerSpacer>
      Search Input will come here
      <Button dense>
        <Icon name="create" />
      </Button>
    </DrawerSpacer>
    <List dense>
      {displayNotes(notes())}
    </List>
  </Drawer>
);

export default NotesList;
