import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col, Button } from 'reactstrap'
import './login.css'
import FormControl from './FormControl.jsx'
import { loginUserAction } from '../../actions/userActions.js'
import { googleUserLogin } from '../../actions/userActions.js'
import { GoogleLogin } from 'react-google-login';


class Login extends Component {

    state = {
        data: {
            username: '',
            password: ''
        },
        errors: {}
    }

    validate = () => {
        const { data } = this.state
        const errors = {}

        if (data.username === '') errors.username = 'Username cannot be blank.'
        if (data.password === '') errors.password = 'Password cannot be blank.'
        
        return errors
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { data } = this.state
        const errors = this.validate()

        if (Object.keys(errors).length === 0) {
            this.props.login(data)

            this.setState({
                data: {
                    username: '',
                    password: ''
                },
                errors: {}
            })
        } else {
            this.setState({
                errors
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.id]: e.target.value
            },
            errors: {
                ...this.state.errors,
                [e.target.id]: ''
            }
        })
    }

    onSuccess = (response) => {
        console.log('response from google', response)
        var email=response.profileObj.email;
        var username=response.profileObj.givenName;
        let data={email:email, username:username}
        this.props.googlelogin(data)
      }
    onFailure = (response) => {
        console.log(response);
      } 
    render() {
        const { data, errors } = this.state
		var divStyle ={
			
		}
        return (
            <Row>
                <Col md={4}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormControl
                            label="username"
                            type="text"
                            value={data.username}
                            handleChange={this.handleChange}
                            error={errors.username}
                        />

                        <FormControl
                            label="Password"
                            type="password"
                            value={data.password}
                            handleChange={this.handleChange}
                            error={errors.password}
                        />

                        <Button color="primary">Login</Button>
                    </Form>
					<div className="gooc">
						<GoogleLogin
							clientId="565182404124-2bt4tgun9sl0kvrrpp1sqe6cmg3eobac.apps.googleusercontent.com"
							buttonText="Login"
							onSuccess={this.onSuccess}
							onFailure={this.onFailure}
							cookiePolicy={'single_host_origin'}
						/>
					</div>
                </Col>
            </Row>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (creds) => {
            dispatch( loginUserAction (creds))
        },
        googlelogin: (response) =>{
            dispatch( googleUserLogin (response))
        }
    }
}

export default connect(null, mapDispatchToProps)(Login)