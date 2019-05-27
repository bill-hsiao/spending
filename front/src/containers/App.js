import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { history } from '../bin/history'
import { PrivateRoute } from '../components/privateRoute'
import { HomePage } from '../pages/homepage'
import Register from '../pages/register'
import Login from '../pages/login'

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    const { dispatch } = this.props;
    history.listen((location, action) => {
        // clear alert on location change
        history.go()
        console.log(history)
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
        <h1>SPA sLogin Boilerplate</h1>
        
        <Router history={history}>
        <div>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          </div>
          </Router>

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


// import { Route, Redirect } from 'react-router'

// <Route exact path="/" render={() => (
//   loggedIn ? (
//     <Redirect to="/dashboard"/>
//   ) : (
//     <PublicHomePage/>
//   )
// )}/>