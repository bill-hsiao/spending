import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../logo.svg'

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
    }
render() {
    const { alert, history } = this.props
    return (
      <div className="App">

        <div className="App-header">
          <h1>Pocket Budget</h1>
          <img src={logo} className="App-logo" alt="logo"/>
          <form>
          <input className="form-control form-control-sm" type="text" placeholder="Username"/>

          <input className="form-control form-control-sm" type="text" placeholder="Password"/>
          </form>

        </div>
        </div>
    )
  }
}
function mapStateToProps(state) {
    // const { loggingIn } = state.authentication;
    // return {
    //     loggingIn
    // };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 