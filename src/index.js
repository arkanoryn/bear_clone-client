import React                            from 'react';
import ReactDOM                         from 'react-dom';
import thunkMiddleware                  from 'redux-thunk';
import { Provider }                     from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger }                 from 'redux-logger';
import { BrowserRouter as Router }      from 'react-router-dom';
import App                              from './App';
import './index.css';
import registerServiceWorker            from './registerServiceWorker';
import NoteApp                          from './reducers';
import {fetchNotes } from './modules/noteslist/actions.js'

const loggerMiddleware = createLogger();

const store = createStore(
  NoteApp,
  applyMiddleware(thunkMiddleware, loggerMiddleware),
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  ,
  document.getElementById('root'),
);

registerServiceWorker();
