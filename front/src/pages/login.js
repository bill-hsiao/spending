import React from 'react'
import { Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, logout } from '../redux/actions'

class Login extends React.Component {
    constructor(props) {
      super(props)

      this.props.dispatch(logout())

      this.state = { 
            user: {
                username: '',
                password: ''
            },
            submitted: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const {name, value} = e.target
        const { user } = this.state
        console.log(user)
        this.setState({
            user: {
                ...user,
                [name]:value
            }
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        const { user } = this.state
        if (user.username && user.password) {
            this.props.dispatch(login(user))
        }
    }
//     componentDidMount(){
//         const { myKey } = this.props.match.params
//         console.log(myKey )
// }
    render() {
        const { registering } = this.props
        const { user } = this.state
        return (
      <div>
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
              <input type="text" name="username" value={user.username} placeholder="username" onChange={this.handleChange}/>
              <input type="password" name="password" value={user.password} placeholder="password" onChange={this.handleChange}/>
              <button type="submit">Sign In</button>
              <Link to="/register">Register</Link>
              </form>
              </div>
              )
    }
}
  
function mapStateToProps(state) {
    const { loggedIn } = state.authentication
    return {
        loggedIn
    }
}

export default connect(mapStateToProps)(Login);
  