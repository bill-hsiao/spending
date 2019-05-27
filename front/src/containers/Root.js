import React from 'react';
import { Provider } from 'react-redux'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
// import { Router, Route } from 'react-router-dom'

import { store } from '../redux/store'
import App from './App'
// const store = configureStore()


export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
          <App />
      </Provider>
    )
  }
}
// {/* <Provider store={store}>
        // <Router>
          // <Route path="/" component={App} />
    // /    </Router>
      // </Provider> */}