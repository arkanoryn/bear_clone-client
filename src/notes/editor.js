import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Display1, Cell, Grid, Textfield} from 'react-mdc-web/lib';
import { updateTitle, updateBody } from './actions'

const mapStateToProps = state => {
  return {
    note: state.NoteApp.note
  }
}

const mapDispachToProps = (dispatch) => {
  return {
    onUpdateTitle: title => {dispatch (updateTitle(title));},
    onUpdateBody: body => {dispatch (updateBody(body));}
  }
}

const DisplayEditor = ({note, onUpdateTitle, onUpdateBody}) => (
  <div>
    {note.id === -1 ? "Create a note" :
    <Grid>
         <Cell col={12}>
           <Display1>
             <Textfield value={note.title}
                        onChange={({target : {value : newTitle}}) => onUpdateTitle(newTitle)}
                        floatingLabel="Title"

             />
           </Display1>

         </Cell>
         <Cell col={12}>
           <Textfield value={note.body}
                      onChange={({target : {value : newBody}}) => onUpdateBody(newBody)}
                      floatingLabel="Body"
                      multiline
                      rows="15"
                      cols="60"
           />
         </Cell>
    </Grid>
      }
  </div>
);

DisplayEditor.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  }),
  onUpdateTitle: PropTypes.func.isRequired,
  onUpdateBody: PropTypes.func.isRequired
}

export default connect(
    mapStateToProps,
    mapDispachToProps
  )(DisplayEditor);
