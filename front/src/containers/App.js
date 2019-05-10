import React from 'react'

import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { createBrowserHistory } from 'history'
import { 
  alertSuccess, 
  alertError, 
  alertClear 
} from '../redux/actions'
import { LoginPage } from '../pages/loginPage'

import logo from '../logo.svg'


// import { consoleLog } from './../redux/actions'

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    // this.history = createBrowserHistory()
    

  }
  // componentDidMount() {
  //   const { dispatch, history } = this.props
  //   history.listen((location, action) => {
  //           dispatch(alertClear())
  //         })

  // }
  render() {
    const { alert, history } = this.props
    return (
      <div class="jumbotron">


<Router history={history}>
                            <div>
                                <Route path="" component={LoginPage} />
                            </div>
                        </Router>
        </div>
    )
  }
}
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }
function mapStateToProps(state) {
  const { init } = state
  return {
    init
    }
}
export default connect(mapStateToProps)(App);
