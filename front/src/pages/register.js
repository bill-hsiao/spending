import React from 'react'
import { Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../redux/actions'

class Register extends React.Component {
    constructor(props) {
      super(props)
      this.state = { 
            user: {
                firstName: '', 
                lastName: '',
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
        if (user.firstName && user.lastName && user.username && user.password) {
            this.props.dispatch(signUp(user))
        }
    }
    


    render() {
        const { registering } = this.props
        const { user } = this.state
      return (
      <div>
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit}>
              <input type="text" name="firstName" value={user.firstName} placeholder="firstName" onChange={this.handleChange}/>
              <input type="text" name="lastName" value={user.lastName} placeholder="lastName" onChange={this.handleChange}/>
              <input type="text" name="username" value={user.username} placeholder="username" onChange={this.handleChange}/>
              <input type="password" name="password" value={user.password} placeholder="password" onChange={this.handleChange}/>
              <button type="submit">Register</button>
              <Link to="/Login">Cancel</Link>
              </form>
              </div>
      )
    }
  }
  
  function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    }
}
  export default connect(mapStateToProps)(Register);
  