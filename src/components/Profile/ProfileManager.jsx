import React, {Component} from 'react'
import { Row, Col } from 'reactstrap'
import './profile.css';
import VideoList from './VideoList/VideoList.jsx'


class ProfileManager extends Component{
	
	render() {
	  
		return (
			<Row>
				<Col>
					<div className="wrapper-video" >
								<VideoList></VideoList >
					</div>
					<div>      
					 \
					</div>
				</Col>
			</Row>
		)
	}
}

export default ProfileManager
