import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './App';
import NoteApp from './notes/reducers';
import registerServiceWorker from './registerServiceWorker';
import { fetchNotes } from './notes/actions';

const loggerMiddleware = createLogger();

let store = createStore(
  NoteApp,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

store.dispatch(fetchNotes()).then(() => console.log(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
