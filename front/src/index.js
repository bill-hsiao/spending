import React from 'react';
import { render } from 'react-dom'
// import Root from './containers/Root'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store'
import App from './containers/App'

// render(<Root />, document.getElementById('root'))

render(
    <Provider store={store}>
    <BrowserRouter>
        <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);