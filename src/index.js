import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/form-styles.css';
import App from './App';
// import store from './app/store';
import store from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

console.log('Initial state: ', store.getState())

const unsubscribe = store.subscribe(() =>
  console.log('State after dispatch: ', store.getState())
)

// store.dispatch({type: 'ADD_NODE', payload: 'NEW NODE A'})
// store.dispatch({type: 'ADD_NODE', payload: 'NEW NODE B'})
// store.dispatch({type: 'ADD_NODE', payload: 'NEW NODE C'})

console.log('New state: ', store.getState())


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
