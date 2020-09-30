import axios from 'axios'
import { taskURL } from '../config/api'
import { appURL } from '../config/api'

export const getTasks = () => {
	 return new Promise((resolve, reject) => {
		const user_id =  localStorage.getItem('uv');
		const token =  localStorage.getItem('uv-1');
		
		const token_1= token.replace(/\"/g, "");
		axios.post(appURL + 'videos-lists-user-id', { user_id : user_id },{
			headers: {
				'Content-Type':'application/json',
				'Authorization': `Bearer ${token_1}`
			  }
			})
			.then(response => {
			   resolve(response.data)
			}).catch(error => {
			   console.log(error);
				reject({
						msg: 'Not media found'
					})
			});
		})
}

export const getSingleTask = id => {
    return axios.get(taskURL + '/' + id).then(res => res.data)
}

/**
 * 
 * @param {title, description} data 
 */
export const addTask = (data) => {
    data.date = new Date()
    data.completed = false
    return axios.post(taskURL, data).then(res => res.data)
}

export const deleteTask = (id) => {
    return axios.delete(taskURL + '/' + id).then(res => res.data)
}