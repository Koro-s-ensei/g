import React, { useEffect } from 'react'
import  {Component} from 'react'
import { useState} from 'react'
import { connect } from 'react-redux'
import { ListGroup, Alert } from 'reactstrap'
import { loadTasksAction } from '../../../actions/taskActions'
import './profilemodal.css';

const VideoList = props => {
    const { tasks } = props
	const { user } = props
    useEffect(() => { props.loadTasks() }, [])
	const [ modalState, setModalState ] = useState(false);
	const [ videoLinks,setvideoLinks ] = useState('');
    if (tasks.length === 0) {
        return null
    }

	const manageState = ev =>{
		setModalState(!modalState)
		const videoLinks=ev;
		setvideoLinks(videoLinks);
	}
	
	return (
			
			<div>
				
				<div className="video-wrapper">
					{tasks.map(item => (
							<div className="video-list" key={item.id} onClick={ () => manageState(item.video) } >
								<a key={item.id} data-value={item.video} data-video-src={item.video} data-video-description={item.description} >
									<video src={"http://panel.telly.network/api/"+item.video}  type="video/mp4"></video>
								</a>
							</div>
					))}
				</div>
				<div className={`modal-background modal-showing-${modalState}`}>
					<div className="modal-content">
						<span 
							className="close" onClick={() => manageState()}>&times;
						</span>
						
							<video width="100%" height="90%" controls src={`http://panel.telly.network/api/${videoLinks}`} type="video/mp4" controls autoPlay>
						</video>
					</div>
				</div>
			</div>
			
		)
}



const mapStateToProps = (state) => { //store.getState()
    return {
        tasks: state.tasks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadTasks: () => dispatch(loadTasksAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoList)