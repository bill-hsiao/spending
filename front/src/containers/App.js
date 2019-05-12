import React from 'react'

import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { history } from '../bin/history'
import { 
  alertSuccess, 
  alertError, 
  alertClear 
} from '../redux/actions'
import Landing from '../pages/landing'
import Register from '../pages/register'
import Login from '../pages/login'

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    const { dispatch } = this.props;
    history.listen((location, action) => {
        // clear alert on location change
    });

  }
  // componentDidMount() {
  //   const { dispatch, history } = this.props
  //   history.listen((location, action) => {
  //           dispatch(alertClear())
  //         })

  // }
  render() {
    const { history } = this.props;
    return (
    <div className="jumbotron">
        <div className="App">
        <h1>Pocket Budget</h1>
  


        <Router history={history}>
          <div>
          <Route path="/" component={Landing}/>
          <Route path="/login" component={Login} />

          <Route path="/register" component={Register} />



            </div>
        </Router>
        <Landing/>

        </div>
        </div>
    )
  }
}

function mapStateToProps(state) {
  const { init } = state
  return {
    init
    }
}
export default connect(mapStateToProps)(App);
