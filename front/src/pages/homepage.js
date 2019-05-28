import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class HomePage extends React.Component {
   render() {
       const { user } = this.props
       return (
           <div>
               Hello, {user.firstName}!

               <Link to="/login">Logout</Link>

           </div>
       )
   }

}


function mapStateToProps(state) {
    const { authentication } = state
    const { user } = authentication 
    return {
      user
      }
  }
const homePage = connect(mapStateToProps)(HomePage)
// export default connect(mapStateToProps)(HomePage);
export { homePage as HomePage }
  