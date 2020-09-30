import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import './userprofile.css';

const UserProfile = props => {

    const { user } = props
	console.log(user);
    const user_info = user.userdata
	
    return (
        <div className="user-profile">
			<div className="img-box">
			{!user_info.profile_pic
				
					? <img src="https://images.unsplash.com/photo-1600647393963-94ae66689368?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=401&q=80" />
					:<img src="https://images.unsplash.com/photo-1601293058843-f34e8dd9ccfd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"/>
			}
			</div>
			<div className="profile-box">
				<h4> {user_info.username}</h4>
				
				<h5>Bio : {user_info.bio}</h5>
			</div>
		</div>
    )
}

/*
    function mapStateToProps(state) {
        return {
            user: state.user
        }
    }
*/

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(UserProfile)