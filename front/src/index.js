import React from 'react';
import { render } from 'react-dom'
// import Root from './containers/Root'
import { Provider } from 'react-redux'

import { store } from './redux/store'
import App from './containers/App'

// render(<Root />, document.getElementById('root'))

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);