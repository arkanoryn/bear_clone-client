import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import NoteApp from './Note/Reducers'

const loggerMiddleware = createLogger();

let store = createStore(NoteApp,
                        applyMiddleware(loggerMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);

registerServiceWorker();
