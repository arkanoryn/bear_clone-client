import './index.css';
import React                            from 'react';
import ReactDOM                         from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { Provider }                     from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger }                 from 'redux-logger';
import { BrowserRouter as Router }      from 'react-router-dom';
import App                              from './App';
import registerServiceWorker            from './registerServiceWorker';
import NoteApp                          from './Reducers';
import { fetchNotes }                   from './NotesList/Actions';
import { connectToSocket } from './Session/Action';
import { connectToLobby } from './Note/Actions';

const loggerMiddleware = createLogger();

let store = createStore(NoteApp,
                        applyMiddleware(thunkMiddleware, loggerMiddleware)
);

store.dispatch(fetchNotes());
store.dispatch(connectToSocket());
store.dispatch(connectToLobby(store.getState().SessionReducer.socket));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);

registerServiceWorker();
